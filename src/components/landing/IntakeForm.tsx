"use client";

import { useState, useEffect, KeyboardEvent, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Form Field Types
type FormData = {
  // 10 Yes/No Questions
  q1_operations: string; // yes/no
  q2_documented_systems: string; // yes/no
  q3_revenue_depends_time: string; // yes/no
  q4_team_delivers_without_you: string; // yes/no
  q5_leave_two_weeks: string; // yes/no
  q6_review_metrics: string; // yes/no
  q7_workflows_automated: string; // yes/no
  q8_block_time_strategy: string; // yes/no
  q9_quarterly_goals: string; // yes/no
  q10_brand_consistent: string; // yes/no
  
  // 5 Qualifying Questions
  current_stage: string; // Solo, Small Team, Scaling, Established
  next_90_day_goal: string; // Automate, Streamline, Launch, Scale, Work Less
  biggest_obstacle: string; // Manual Tasks, No Systems, Team Dependence, Product Not Converting, Weak Marketing
  preferred_path: string; // DIY Learning, Coaching, Software, Done-For-You
  anything_else: string; // Open text
};

export default function IntakeForm() {
  const searchParams = useSearchParams();
  
  // Get pre-populated data from URL parameters
  const getInitialValues = () => {
    return {
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
      current_stage: searchParams.get('current_stage') || '',
      next_90_day_goal: searchParams.get('next_90_day_goal') || '',
      biggest_obstacle: searchParams.get('biggest_obstacle') || '',
      preferred_path: searchParams.get('preferred_path') || '',
      anything_else: searchParams.get('anything_else') || ''
    };
  };
  
  const [step, setStep] = useState(1); // Always start at welcome
  const [maxSteps] = useState(16); // Fixed: welcome + 10 yes/no + 5 qualifying
  const [justNavigated, setJustNavigated] = useState(false); // Track if we just navigated
  const [showForwardButton, setShowForwardButton] = useState(false); // Control forward button visibility
  const welcomeRef = useRef<HTMLDivElement>(null);
  const previousValuesRef = useRef<{[key: string]: string}>({}); // Track previous values
  
  // Initialize form before any useEffects that depend on it
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: getInitialValues()
  });

  // Watch all form values for auto-advance and navigation
  const formValues = watch();
  
  // Focus welcome screen on initial load (only if we're actually on welcome screen)
  useEffect(() => {
    if (step === 1 && welcomeRef.current) {
      welcomeRef.current.focus();
    }
    // Mark as just navigated whenever step changes
    setJustNavigated(true);
    setShowForwardButton(false); // Hide forward button during navigation
    const timer = setTimeout(() => setJustNavigated(false), 100);
    return () => clearTimeout(timer);
  }, [step]);

  // Control forward button visibility with delay to avoid race condition with auto-advance
  useEffect(() => {
    const fieldName = getCurrentFieldName();
    const hasAnswer = fieldName ? formValues[fieldName] : false;
    
    if (hasAnswer && !justNavigated) {
      // Delay showing forward button until after auto-advance would complete (300ms + animation time)
      const timer = setTimeout(() => {
        setShowForwardButton(true);
      }, 500); // 500ms delay (auto-advance is 300ms)
      
      return () => clearTimeout(timer);
    } else {
      setShowForwardButton(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, formValues, justNavigated]);
  
  // Handle Enter key press to navigate to next step
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // For welcome screen, just go to next step (no validation needed)
      if (step === 1) {
        nextStep();
        return;
      }
      
      // For question screens, validate before proceeding
      if (step < maxSteps) {
        validateAndProceed();
      } else if (step === maxSteps) {
        handleSubmit(onSubmit)();
      }
    }
  };

  // Validate current step and proceed if valid
  const validateAndProceed = () => {
    const fieldName = getCurrentFieldName();
    
    if (!fieldName) {
      nextStep();
      return;
    }
    
    // "anything_else" field is optional - allow proceeding without text
    if (fieldName === 'anything_else') {
      nextStep();
      return;
    }
    
    // Check if current field has a value
    const currentValue = watch(fieldName);
    if (!currentValue || (typeof currentValue === 'string' && !currentValue.trim())) {
        return; // Validation error will show via react-hook-form
    }
    
    // If validation passes, proceed to next step
    nextStep();
  };

  const nextStep = () => {
    if (step === maxSteps) {
      handleSubmit(onSubmit)();
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  // Helper function to get the field name for current step
  const getCurrentFieldName = (): keyof FormData | null => {
    if (step === 1) return null; // Welcome screen
    if (step === 2) return 'q1_operations';
    if (step === 3) return 'q2_documented_systems';
    if (step === 4) return 'q3_revenue_depends_time';
    if (step === 5) return 'q4_team_delivers_without_you';
    if (step === 6) return 'q5_leave_two_weeks';
    if (step === 7) return 'q6_review_metrics';
    if (step === 8) return 'q7_workflows_automated';
    if (step === 9) return 'q8_block_time_strategy';
    if (step === 10) return 'q9_quarterly_goals';
    if (step === 11) return 'q10_brand_consistent';
    if (step === 12) return 'current_stage';
    if (step === 13) return 'next_90_day_goal';
    if (step === 14) return 'biggest_obstacle';
    if (step === 15) return 'preferred_path';
    if (step === 16) return 'anything_else';
    return null;
  };

  // Helper to determine question type
  const getCurrentQuestionType = () => {
    if (step === 1) return 'welcome';
    if (step >= 2 && step <= 11) return 'yesno';
    if (step >= 12 && step <= 15) return 'multiple';
    if (step === 16) return 'text';
    return 'unknown';
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Redirect to lead capture with all form data
      const queryParams = new URLSearchParams({
        q1_operations: data.q1_operations,
        q2_documented_systems: data.q2_documented_systems,
        q3_revenue_depends_time: data.q3_revenue_depends_time,
        q4_team_delivers_without_you: data.q4_team_delivers_without_you,
        q5_leave_two_weeks: data.q5_leave_two_weeks,
        q6_review_metrics: data.q6_review_metrics,
        q7_workflows_automated: data.q7_workflows_automated,
        q8_block_time_strategy: data.q8_block_time_strategy,
        q9_quarterly_goals: data.q9_quarterly_goals,
        q10_brand_consistent: data.q10_brand_consistent,
        current_stage: data.current_stage,
        next_90_day_goal: data.next_90_day_goal,
        biggest_obstacle: data.biggest_obstacle,
        preferred_path: data.preferred_path,
        anything_else: data.anything_else
      });
      
      window.location.href = `/lead-capture?${queryParams.toString()}`;
    } catch {
      console.log('Navigation completed');
    }
  };

  // Auto-advance for Yes/No questions (steps 2-11) - only on NEW selections
  useEffect(() => {
    // Don't auto-advance if we just navigated to this step
    if (justNavigated) return;
    
    // Only auto-advance for Yes/No questions
    const questionType = getCurrentQuestionType();
    if (questionType !== 'yesno') return;
    
    const fieldName = getCurrentFieldName();
    if (!fieldName) return;
    
    const currentValue = formValues[fieldName];
    const previousValue = previousValuesRef.current[fieldName];
    
    // Only auto-advance if the value CHANGED (new selection)
    if (currentValue && currentValue !== previousValue) {
      previousValuesRef.current[fieldName] = currentValue;
      
      const timer = setTimeout(() => {
        if (step < maxSteps) {
          setStep(step + 1);
        }
      }, 300); // 300ms delay for smooth UX
      
      return () => clearTimeout(timer);
    }
    
    // Update previous value if it exists
    if (currentValue) {
      previousValuesRef.current[fieldName] = currentValue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, formValues, maxSteps, justNavigated]); // getCurrentFieldName and getCurrentQuestionType depend on step, which is already tracked

  // Get question text based on step
  const getQuestionText = () => {
    const questions = [
      '', // Step 1: Welcome
      'Do you spend most of your week on operations?',
      'Do you have documented systems / SOPs?',
      'Does revenue depend on your time?',
      'Can your team deliver without you?',
      'Could you leave for two weeks and stay profitable?',
      'Do you review key metrics weekly?',
      'Are workflows automated with AI or software?',
      'Do you block time for strategy and creation?',
      'Are quarterly goals clear and executed?',
      'Is your brand and marketing consistent?',
      'Current Stage?',
      'Next 90-Day Goal?',
      'Biggest Obstacle?',
      'Preferred Path?',
      'Anything else?'
    ];
    return questions[step - 1] || '';
  };

  // Get options based on step
  const getQuestionOptions = () => {
    if (step >= 2 && step <= 11) {
      return [
        { id: 'yes', label: 'Yes' },
        { id: 'no', label: 'No' }
      ];
    }
    if (step === 12) {
      return [
        { id: 'solo', label: 'Solo' },
        { id: 'small-team', label: 'Small Team' },
        { id: 'scaling', label: 'Scaling' },
        { id: 'established', label: 'Established' }
      ];
    }
    if (step === 13) {
      return [
        { id: 'automate', label: 'Automate' },
        { id: 'streamline', label: 'Streamline' },
        { id: 'launch', label: 'Launch' },
        { id: 'scale', label: 'Scale' },
        { id: 'work-less', label: 'Work Less' }
      ];
    }
    if (step === 14) {
      return [
        { id: 'manual-tasks', label: 'Manual Tasks' },
        { id: 'no-systems', label: 'No Systems' },
        { id: 'team-dependence', label: 'Team Dependence' },
        { id: 'product-not-converting', label: 'Product Not Converting' },
        { id: 'weak-marketing', label: 'Weak Marketing' }
      ];
    }
    if (step === 15) {
      return [
        { id: 'diy-learning', label: 'DIY Learning' },
        { id: 'coaching', label: 'Coaching' },
        { id: 'software', label: 'Software' },
        { id: 'done-for-you', label: 'Done-For-You' }
      ];
    }
    return [];
  };

  // Animation variants for framer-motion - enhanced for smoother transitions
  const pageVariants = {
    initial: { 
      opacity: 0, 
      x: 50,
      scale: 0.95
    },
    in: { 
      opacity: 1, 
      x: 0,
      scale: 1
    },
    out: { 
      opacity: 0, 
      x: -50,
      scale: 0.95
    }
  };

  const pageTransition = {
    type: "tween" as const,
    ease: "easeInOut" as const,
    duration: 0.4
  };

  return (
    <div className="text-white h-screen w-screen overflow-hidden overflow-y-hidden relative flex flex-col items-center justify-center bg-[#080808]">
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[5px] bg-white/20 z-[2000]">
        <div 
          className="h-full transition-all duration-300 ease-out relative progress-bar-white" 
          style={{
            width: `${Math.max(((step - 1) / (maxSteps - 1)) * 100, 0)}%`,
            background: 'linear-gradient(90deg, #E0E0E0 0%, #FFFFFF 25%, #F5F5F5 50%, #D3D3D3 75%, #E8E8E8 100%)',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(230, 230, 230, 0.3)'
          }}
        >
          {/* Glowing tip */}
          <div 
            className="absolute top-0 right-0 w-[3px] h-full glow-tip"
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 0%, #F0F0F0 50%, #E0E0E0 100%)',
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.8), 0 0 15px rgba(255, 255, 255, 0.6)',
              filter: 'blur(0.5px)'
            }}
          />
        </div>
      </div>
      
      {/* Exit Button - Moved to top right */}
      <Link href="/" className="absolute top-[4%] right-[4%] bg-transparent border border-[#242424] rounded-full p-1.5 md:p-3 text-white text-xs md:text-lg cursor-pointer z-[2000] hover:bg-white/5 transition-colors">
        <span className="flex items-center justify-center">
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
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </span>
      </Link>
      
      {/* Navigation Buttons - Only for question screens (step > 1) */}
      {step > 1 && (
        <div className="absolute top-[4%] left-[4%] z-[2000] flex gap-2">
          {/* Back Button */}
          <button 
            type="button" 
            onClick={prevStep}
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
          </button>
          
          {/* Forward Button - only show if not on last step AND current question has an answer (with delay) */}
          {step < maxSteps && showForwardButton && (
            <button 
              type="button" 
              onClick={validateAndProceed}
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
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          )}
        </div>
      )}
      
      {/* Form Container - centered on screen */}
      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto z-[1000] p-5">
        {/* Logo - only show on welcome screen */}
        {getCurrentQuestionType() === 'welcome' && (
          <Image 
            src="/images/avyra-brandmark.svg" 
            alt="Avyra" 
            width={120} 
            height={40} 
            className="mb-5 avyra-logo-intake"
          />
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="w-full relative z-[1000] flex flex-col items-center">
          {/* Welcome Step - centered */}
          {getCurrentQuestionType() === 'welcome' && (
            <motion.div
              className="flex flex-col items-center text-center justify-center w-full outline-none"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              id="welcome-section"
              onKeyDown={handleKeyDown}
              tabIndex={0}
              ref={welcomeRef}
            >
              <h1 
                id="welcome-header" 
                className="text-[42px] md:text-[64px] lg:text-[80px] font-medium leading-[100%] tracking-[-2px] mb-6"
                style={{
                  background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #04070D 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  textAlign: "center",
                  fontFamily: "Inter"
                }}
              >
               Discover your freedom in 5 minutes
              </h1>
              <p className="text-[#B2B2B2] text-xl md:text-2xl font-medium mb-8 md:mb-10 w-[90%] sm:w-[70%] md:w-[90%] max-w-3xl mx-auto lg:mx-0">
              No email needed until results are ready
              </p>
              
              <div className="flex gap-3 welcome-buttons items-center justify-center">
                <button 
                  type="button" 
                  onClick={nextStep} 
                  className="relative z-[1000] py-3 md:py-4 px-10 md:px-[51px] text-lg md:text-xl bg-white text-black border-none rounded-[46.55px] cursor-pointer hover:bg-opacity-90 hover:shadow-lg transition-all duration-300 welcome-btn flex items-center justify-center font-medium group"
                >
                 Start my assessment
                  <Image 
                    src="/icons/black-arrow.svg" 
                    alt="Arrow" 
                    width={13}
                    height={13}
                    className="ml-3 transform transition-transform duration-300 group-hover:translate-x-2"
                  />
                </button>
                
                <span className="text-sm ml-[10px] text-[#aaa] enter-message flex items-center">
                  Press enter <span className="mx-1 text-lg">↵</span>
                </span>
              </div>
              
              {/* <div className="flex items-center justify-center text-sm mt-6 text-white time-message">
                <span className="mr-[5px] flex items-center clock-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
                2 minutes. No sales call. Real results.
              </div> */}
            </motion.div>
          )}
          
          {/* All Question Types (Steps 2-16) - Single AnimatePresence for smooth transitions */}
          <AnimatePresence mode="wait">
            {getCurrentQuestionType() === 'yesno' && (
              <motion.div
                key={`question-${step}`}
                className="flex flex-col items-start text-left w-full"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                onKeyDown={handleKeyDown}
                tabIndex={0}
              >
              <h2 className="text-[1.5rem] leading-[32px] md:text-[32px] lg:text-[36px] md:leading-normal mb-2 font-normal question">
                {getQuestionText()}
              </h2>
               <p className="text-[12px] md:text-xl text-[#aaa] mb-6 subheader">(Select one)</p>
              
              <div className="flex flex-col w-full gap-3">
                {getQuestionOptions().map((option) => {
                  const fieldName = getCurrentFieldName();
                  const currentValue = fieldName ? watch(fieldName) : '';
                  
                  return (
                  <label key={option.id} className="cursor-pointer">
                    <input
                      type="radio"
                      value={option.id}
                        {...register(fieldName as keyof FormData, { required: 'Please select an option' })}
                      className="hidden hidden-radio"
                    />
                      <div className={`flex items-center border border-[#242424] rounded-[32px] py-2 md:py-3 px-4 md:px-6 w-full bg-transparent transition-all duration-300 hover:bg-white/5 custom-radio ${currentValue === option.id ? 'bg-white/[0.03] shadow-[0px_-2px_19px_5px_rgba(255,255,255,0.06)_inset] backdrop-blur-[33.75px] checked' : ''}`}>
                      <span className="flex-1 text-white text-base md:text-lg custom-radio-label">{option.label}</span>
                    </div>
                  </label>
                  );
                })}
              </div>
              </motion.div>
            )}
            
            {getCurrentQuestionType() === 'multiple' && (
              <motion.div
                key={`question-${step}`}
                className="flex flex-col items-start text-left w-full"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                onKeyDown={handleKeyDown}
                tabIndex={0}
              >
              <h2 className="text-[1.5rem] leading-[32px] md:text-[32px] lg:text-[36px] md:leading-normal mb-2 font-normal question">
                {getQuestionText()}
              </h2>
               <p className="text-[12px] md:text-xl text-[#aaa] mb-6 subheader">(Select one)</p>
              
              <div className="flex flex-col w-full gap-3">
                {getQuestionOptions().map((option) => {
                  const fieldName = getCurrentFieldName();
                  const currentValue = fieldName ? watch(fieldName) : '';
                  
                  return (
                  <label key={option.id} className="cursor-pointer">
                    <input
                      type="radio"
                      value={option.id}
                        {...register(fieldName as keyof FormData, { required: 'Please select an option' })}
                      className="hidden hidden-radio"
                    />
                      <div className={`flex items-center border border-[#242424] rounded-[32px] py-2 md:py-3 px-4 md:px-6 w-full bg-transparent transition-all duration-300 hover:bg-white/5 custom-radio ${currentValue === option.id ? 'bg-white/[0.03] shadow-[0px_-2px_19px_5px_rgba(255,255,255,0.06)_inset] backdrop-blur-[33.75px] checked' : ''}`}>
                      <span className="flex-1 text-white text-base md:text-lg custom-radio-label">{option.label}</span>
                    </div>
                  </label>
                  );
                })}
              </div>
              
              <div className="flex gap-3 items-center mt-6">
                <button 
                  type="button" 
                  onClick={validateAndProceed} 
                  className="py-3 px-[42px] text-lg bg-white text-black border-none rounded-[50px] cursor-pointer hover:bg-white/90 transition-all duration-300"
                >
                  OK
                </button>
                
                <span className="text-sm ml-[10px] text-[#aaa] enter-message flex items-center">
                  Press enter <span className="mx-1 text-lg">↵</span>
                </span>
              </div>
              
              {(() => {
                const fieldName = getCurrentFieldName();
                return fieldName && errors[fieldName] && (
                  <p className="text-[#ff4c4c] text-base mt-[10px] error-message">
                    {String(errors[fieldName]?.message || '')}
                  </p>
                );
              })()}
            </motion.div>
            )}
            
            {getCurrentQuestionType() === 'text' && (
            <motion.div
              key={`question-${step}`}
              className="flex flex-col items-start text-left w-full"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              <h2 className="text-[1.5rem] leading-[32px] md:text-[32px] lg:text-[36px] md:leading-normal mb-2 font-normal question">
                {getQuestionText()}
              </h2>
              <p className="text-[12px] md:text-xl text-[#aaa] mb-6 subheader">(Optional)</p>
              
              <div className="bg-[rgba(255,255,255,0.05)] px-4 py-3 rounded-[12px] w-full">
                  <textarea
                  {...register('anything_else', { 
                    maxLength: { value: 500, message: 'Please keep it under 500 characters' }
                    })}
                  placeholder="Share any additional context that might help us understand your situation better..."
                    className="w-full bg-transparent text-white text-[14px] font-medium tracking-[-0.16px] focus:outline-none placeholder:text-gray-400 resize-none"
                  rows={4}
                  maxLength={500}
                  />
                  <div className="text-right text-sm text-white/60 mt-2">
                  {watch('anything_else')?.length || 0}/500 characters
                  </div>
                </div>
              
              <div className="flex gap-3 items-center mt-6">
                <button 
                  type="button" 
                  onClick={validateAndProceed} 
                  className="py-3 px-[42px] text-lg bg-white text-black border-none rounded-[50px] cursor-pointer hover:bg-white/90 transition-all duration-300"
                >
                  OK
                </button>
                
                <span className="text-sm ml-[10px] text-[#aaa] enter-message flex items-center">
                  Press enter <span className="mx-1 text-lg">↵</span>
                </span>
              </div>
              
              {errors.anything_else && (
                <p className="text-[#ff4c4c] text-base mt-[10px] error-message">{errors.anything_else.message}</p>
              )}
            </motion.div>
            )}
          </AnimatePresence>
          
          {/* All old question sections removed - using dynamic rendering above */}
          
          {/* Final step removed - form auto-submits after last question */}
        </form>
      </div>
      
      
      
      {/* Custom Styles for Elements Not Easily Done with Tailwind */}
      <style jsx global>{`
        /* Make sure body and html don't scroll */
        html, body {
          overflow: hidden;
          height: 100%;
          width: 100%;
        }
        
        /* Remove focus outline */
        *:focus {
          outline: none !important;
        }
        
        /* Checkbox style adjustments */
        .checkmark {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 10px;
        }
        
        .check-icon {
          filter: brightness(0) invert(1);
        }
        
        /* Fix for checkbox clicking in forms */
        label.cursor-pointer {
          display: block;
          width: 100%;
        }
        
        /* Custom radio button style */
        .custom-radio::before {
          content: '';
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 1px solid #242424;
          border-radius: 50%;
          margin-right: 12px;
          transition: border-color 0.3s ease;
        }
        
        .custom-radio.checked::before {
          background-color: rgba(251, 251, 251, 0.4);
        }
        
        /* Remove placeholder when valid */
        .input-field:valid::placeholder {
          color: transparent;
        }
        
        /* Ensure all form steps are centered */
        .form-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        
        /* Add responsive styles */
        @media screen and (max-width: 990px) {
          #welcome-header {
            font-size: 3rem;
            height: auto;
            margin-bottom: 24px;
            white-space: normal;
          }
        }
        
        @media screen and (max-width: 500px) {
          .avyra-logo-intake {
            width: 64px;
            height: auto;
          }
          
          #welcome-header {
            font-size: 54px;
            margin: 0px;
            margin-bottom: 20px;
            box-sizing: border-box;
            width: inherit;
            padding: 0px 12px;
          }
          
          .welcome-buttons {
            display: flex;
            margin-left: 0px;
            gap: 12px;
            align-items: center;
            flex-direction: column;
          }
          
          .enter-message {
            display: none;
          }
          
          .question {
            font-size: 1.75rem;
          }
          
          .subheader {
            font-size: 12px;
          }
        }
            
        /* Progress bar animations */
        .progress-bar-white {
          position: relative;
          overflow: hidden;
        }
        
        .progress-bar-white::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%);
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
        
        .glow-tip {
          animation: pulse-glow 1.5s ease-in-out infinite alternate;
        }
        
        @keyframes pulse-glow {
          0% {
            opacity: 0.8;
            transform: scaleX(1);
          }
          100% {
            opacity: 1;
            transform: scaleX(1.2);
          }
        }
            `}</style>
    </div>
  );
} 