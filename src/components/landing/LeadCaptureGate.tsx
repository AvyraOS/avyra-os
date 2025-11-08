'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function LeadCaptureGate() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  
  const searchParams = useSearchParams();
  
  // Function to capitalize first letter of each word
  const capitalizeName = (value: string): string => {
    return value
      .split(' ')
      .map(word => {
        if (word.length === 0) return word;
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  };
  
  // Parse form data from URL parameters
  const formData = {
    // 10 Yes/No Questions
    q1_operations: searchParams.get('q1_operations') || '',
    q2_documented_systems: searchParams.get('q2_documented_systems') || '',
    q3_revenue_depends_time: searchParams.get('q3_revenue_depends_time') || '',
    q4_team_delivers_without_you: searchParams.get('q4_team_delivers_without_you') || '',
    q5_leave_two_weeks: searchParams.get('q5_leave_two_weeks') || '',
    q6_review_metrics: searchParams.get('q6_review_metrics') || '',
    q7_workflows_automated: searchParams.get('q7_workflows_automated') || '',
    q8_block_time_strategy: searchParams.get('q8_block_time_strategy') || '',
    q9_quarterly_goals: searchParams.get('q9_quarterly_goals') || '',
    q10_brand_consistent: searchParams.get('q10_brand_consistent') || '',
    
    // 5 Qualifying Questions
    current_stage: searchParams.get('current_stage') || '',
    next_90_day_goal: searchParams.get('next_90_day_goal') || '',
    biggest_obstacle: searchParams.get('biggest_obstacle') || '',
    preferred_path: searchParams.get('preferred_path') || '',
    anything_else: searchParams.get('anything_else') || ''
  };

  // Calculate Freedom Score (0-100%)
  const calculateScore = () => {
    let score = 0;
    const totalQuestions = 10;
    
    // Questions where "no" = good (add points)
    const noIsGoodQuestions = ['q1_operations', 'q3_revenue_depends_time'];
    
    // Questions where "yes" = good (add points)
    const yesIsGoodQuestions = [
      'q2_documented_systems',
      'q4_team_delivers_without_you',
      'q5_leave_two_weeks',
      'q6_review_metrics',
      'q7_workflows_automated',
      'q8_block_time_strategy',
      'q9_quarterly_goals',
      'q10_brand_consistent'
    ];
    
    // Count positive answers
    noIsGoodQuestions.forEach(q => {
      if (formData[q as keyof typeof formData] === 'no') score++;
    });
    
    yesIsGoodQuestions.forEach(q => {
      if (formData[q as keyof typeof formData] === 'yes') score++;
    });
    
    // Convert to percentage
    return Math.round((score / totalQuestions) * 100);
  };
  
  const freedomScore = calculateScore();
  
  // Determine segment based on score
  const getSegment = (score: number): string => {
    if (score >= 75) return 'Sovereign-Founder';
    if (score >= 40) return 'System-Optimizer';
    return 'Foundation-Builder';
  };
  
  const segment = getSegment(freedomScore);

  // Redirect to intake if no form data
  useEffect(() => {
    // Check if at least some yes/no questions are answered
    const hasAnswers = formData.q1_operations || formData.q2_documented_systems || formData.q3_revenue_depends_time;
    if (!hasAnswers) {
      window.location.href = '/intake';
    }
  }, [formData.q1_operations, formData.q2_documented_systems, formData.q3_revenue_depends_time]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAttemptedSubmit(true);
    
    if (!name.trim() || !email.trim()) {
      return;
    }

    if (!email.includes('@')) {
      return;
    }

    setIsSubmitting(true);

    try {
      // NOW submit to Asana with complete data including contact info
      const completeData = {
        ...formData,
        name: name.trim(),
        email: email.trim()
      };

      const response = await fetch('/api/submit-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(completeData)
      });

      if (response.ok) {
        // Redirect to results with score and segment
        const queryParams = new URLSearchParams({
          score: String(freedomScore),
          segment: segment,
          name: name.trim(),
          email: email.trim()
        });
        
        window.location.href = `/results?${queryParams.toString()}`;
      } else {
        // Log error but don't show to user - just keep button enabled
        const errorData = await response.json();
        console.error('Submit error:', errorData);
      }
    } catch (error) {
      // Log error but don't show to user - just keep button enabled
      console.error('Network error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-white min-h-screen w-screen overflow-x-hidden relative flex flex-col items-center justify-center bg-[#080808] py-8 md:py-0">
      
      {/* Background Image */}
      <div className="absolute top-0 left-0 right-0 z-0">
        <Image
          src="/images/freedom-score-bg.png"
          alt=""
          width={1920}
          height={600}
          className="w-full h-auto object-cover"
          priority
        />
      </div>
      
      {/* Back Button */}
      <div className="absolute top-[4%] left-[4%] z-[2000]">
        <Link 
          href={`/intake?${new URLSearchParams({
            q1_operations: formData.q1_operations,
            q2_documented_systems: formData.q2_documented_systems,
            q3_revenue_depends_time: formData.q3_revenue_depends_time,
            q4_team_delivers_without_you: formData.q4_team_delivers_without_you,
            q5_leave_two_weeks: formData.q5_leave_two_weeks,
            q6_review_metrics: formData.q6_review_metrics,
            q7_workflows_automated: formData.q7_workflows_automated,
            q8_block_time_strategy: formData.q8_block_time_strategy,
            q9_quarterly_goals: formData.q9_quarterly_goals,
            q10_brand_consistent: formData.q10_brand_consistent,
            current_stage: formData.current_stage,
            next_90_day_goal: formData.next_90_day_goal,
            biggest_obstacle: formData.biggest_obstacle,
            preferred_path: formData.preferred_path,
            anything_else: formData.anything_else
          }).toString()}`}
          className="bg-transparent border border-[#242424] rounded-full p-1.5 md:p-3 text-white cursor-pointer hover:bg-white/5 transition-colors flex justify-center items-center"
        >
          <svg 
            width="14" 
            height="14" 
            className="md:w-5 md:h-5"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </Link>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-left">
        
        {/* Logo */}
        <Image 
          src="/images/avyra-brandmark.svg" 
          alt="Avyra" 
          width={103} 
          height={98} 
          className="mb-6 md:mb-8 w-16 h-16 md:w-[103px] md:h-[98px]"
        />
        
        {/* Main heading */}
        <motion.h1 
          className="text-[32px] md:text-[56px] font-medium mb-4 md:mb-6 leading-tight capitalize"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #04070D 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            fontFamily: "Inter"
          }}
        >
         Your Freedom Score Is Ready!
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          className="text-[18px] md:text-[28px] text-[#d0d0d0] mb-8 md:mb-12 font-normal tracking-[-0.32px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontFamily: "Inter" }}
        >
          Get your personalized results.
        </motion.p>
        
        {/* Benefits Grid */}
        <motion.div 
          className="mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Desktop: 2 columns, Mobile: 1 column (stacked) */}
          <div className="flex flex-col md:flex-row md:justify-between w-full max-w-[802px] gap-6 md:gap-0">
            {/* Left Column (Mobile: All items stack) */}
            <div className="flex flex-col gap-4 md:gap-6 items-start">
              <div className="flex gap-2 items-center">
                <Image 
                  src="/icons/white-checkmark.svg" 
                  alt="Checkmark" 
                  width={20} 
                  height={20}
                  className="md:w-6 md:h-6"
                />
                <span className="text-[#d0d0d0] text-[16px] md:text-[20px] font-normal tracking-[-0.32px]" style={{ fontFamily: "Inter" }}>
                  Your Freedom Score
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <Image 
                  src="/icons/white-checkmark.svg" 
                  alt="Checkmark" 
                  width={20} 
                  height={20}
                  className="md:w-6 md:h-6"
                />
                <span className="text-[#d0d0d0] text-[16px] md:text-[20px] font-normal tracking-[-0.32px]" style={{ fontFamily: "Inter" }}>
                  Custom AI Agent Recommendations
                </span>
              </div>
              
              {/* Mobile: Show all 4 items in single column */}
              <div className="flex gap-2 items-center md:hidden">
                <Image 
                  src="/icons/white-checkmark.svg" 
                  alt="Checkmark" 
                  width={20} 
                  height={20}
                />
                <span className="text-[#d0d0d0] text-[16px] font-normal tracking-[-0.32px]" style={{ fontFamily: "Inter" }}>
                  Exact time savings calculation
                </span>
              </div>
              <div className="flex gap-2 items-center md:hidden">
                <Image 
                  src="/icons/white-checkmark.svg" 
                  alt="Checkmark" 
                  width={20} 
                  height={20}
                />
                <span className="text-[#d0d0d0] text-[16px] font-normal tracking-[-0.32px]" style={{ fontFamily: "Inter" }}>
                  ROI projections for your business
                </span>
              </div>
            </div>
            
            {/* Right Column (Desktop only) */}
            <div className="hidden md:flex flex-col gap-6 items-start">
              <div className="flex gap-2 items-center">
                <Image 
                  src="/icons/white-checkmark.svg" 
                  alt="Checkmark" 
                  width={24} 
                  height={24}
                />
                <span className="text-[#d0d0d0] text-[20px] font-normal tracking-[-0.32px]" style={{ fontFamily: "Inter" }}>
                  Exact time savings calculation
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <Image 
                  src="/icons/white-checkmark.svg" 
                  alt="Checkmark" 
                  width={24} 
                  height={24}
                />
                <span className="text-[#d0d0d0] text-[20px] font-normal tracking-[-0.32px]" style={{ fontFamily: "Inter" }}>
                  ROI projections for your business
                </span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Form */}
        <motion.form 
          onSubmit={handleSubmit}
          noValidate
          className="lead-capture-form space-y-3 md:space-y-4 w-full max-w-[804px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1b1c20] border border-[#121212] rounded-[10px] px-6 py-4 text-white text-sm font-medium font-inter tracking-[-0.16px] placeholder:text-gray-400 focus:outline-none focus:border-[#3a3a3a] transition-all"
              autoComplete="email"
              autoFocus
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[34px] h-[34px] bg-[rgba(217,217,217,0.05)] rounded-[7.286px] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 4.5H15C15.4125 4.5 15.75 4.8375 15.75 5.25V12.75C15.75 13.1625 15.4125 13.5 15 13.5H3C2.5875 13.5 2.25 13.1625 2.25 12.75V5.25C2.25 4.8375 2.5875 4.5 3 4.5Z" fill="white"/>
                <path d="M15.75 5.25L9 9.75L2.25 5.25" stroke="#1b1c20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          {/* Name Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(capitalizeName(e.target.value))}
              className="w-full bg-[#1b1c20] border border-[#121212] rounded-[10px] px-6 py-4 text-white text-sm font-medium font-inter tracking-[-0.16px] placeholder:text-gray-400 focus:outline-none focus:border-[#3a3a3a] transition-all"
              autoComplete="name"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[34px] h-[34px] bg-[rgba(217,217,217,0.05)] rounded-[7.286px] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 9C10.6569 9 12 7.65685 12 6C12 4.34315 10.6569 3 9 3C7.34315 3 6 4.34315 6 6C6 7.65685 7.34315 9 9 9Z" fill="white"/>
                <path d="M9 10.5C6.51472 10.5 4.5 12.5147 4.5 15H13.5C13.5 12.5147 11.4853 10.5 9 10.5Z" fill="white"/>
              </svg>
            </div>
          </div>
          
          {/* CTA Button - Always White Like Hero */}
          <div 
            className="p-[2px] rounded-lg h-[50px] overflow-hidden"
            style={{
              background: "radial-gradient(50% 20.7% at 50% 100%, #FFFFFF 0%, rgba(255, 255, 255, 0.00) 100%)"
            }}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative z-50 w-full h-[46px] inline-flex items-center justify-center bg-gradient-to-b from-[#FFFFFF] to-[#F3F3F3] text-[#000000] px-8 rounded-lg text-base font-semibold font-inter transition-all duration-300 hover:opacity-90 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>{isSubmitting ? 'Generating Results...' : 'Get My Automation Plan'}</span>
              {!isSubmitting && (
                <svg
                  className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
          
        </motion.form>
        
        {/* Privacy note with conditional validation message */}
        <motion.div 
          className="mt-4 md:mt-6 text-[10px] md:text-[12px] tracking-[-0.32px] w-full max-w-[804px] flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ fontFamily: "Inter" }}
        >
          <p className="text-left">
            <span className="text-white">Avyra respects your privacy. </span>
            <span className="text-[#d5dbe6]">Unsubscribe anytime.</span>
          </p>
          {attemptedSubmit && (!email.trim() || !name.trim()) && (
            <p className="text-[#9ca3af] text-right">
              Please fill in all fields to continue.
            </p>
          )}
        </motion.div>
        
      </div>
      
      {/* Autofill and focus override styles */}
      <style jsx global>{`
        .lead-capture-form input {
          outline: none !important;
          box-shadow: none !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
        }
        
        .lead-capture-form input:focus {
          outline: none !important;
          box-shadow: none !important;
          ring: 0 !important;
        }
        
        .lead-capture-form input:-webkit-autofill,
        .lead-capture-form input:-webkit-autofill:hover,
        .lead-capture-form input:-webkit-autofill:focus,
        .lead-capture-form input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px #1b1c20 inset !important;
          -webkit-text-fill-color: white !important;
          background-color: #1b1c20 !important;
          transition: background-color 5000s ease-in-out 0s !important;
        }
        
        .lead-capture-form input:-webkit-autofill::first-line {
          color: white !important;
          font-family: Inter, sans-serif !important;
        }
      `}</style>
    </div>
  );
} 