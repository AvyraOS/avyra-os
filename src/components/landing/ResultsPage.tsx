"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Counting Score Component
interface CountingScoreProps {
  targetScore: number;
  className?: string;
  style?: React.CSSProperties;
}

const CountingScore: React.FC<CountingScoreProps> = ({ targetScore, className, style }) => {
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    const duration = 1500; // 1.5 seconds
    const startTime = Date.now() + 800; // Start after 0.8s delay

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed < 0) return; // Wait for delay
      
      if (elapsed >= duration) {
        setCurrentScore(targetScore);
        clearInterval(timer);
      } else {
        const progress = elapsed / duration;
        const easeOut = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        setCurrentScore(Math.floor(targetScore * easeOut));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [targetScore]);

  return (
    <div className={className} style={style}>
      {currentScore}%
    </div>
  );
};

// Segment type
type Segment = 'foundation-builder' | 'system-optimizer' | 'sovereign-founder';

interface ResultsPageProps {
  formData: {
    score: string;
    segment: string;
    name?: string;
    email?: string;
  };
}

export default function ResultsPage({ formData }: ResultsPageProps) {
  const score = parseInt(formData.score) || 0;
  // Convert capitalized segment to lowercase for internal use
  const segment = (formData.segment?.toLowerCase() || 'foundation-builder') as Segment;

  // Helper function to get the appropriate radar SVG based on score
  const getRadarSvg = (score: number): string => {
    if (score >= 75) return '87percent.svg';
    if (score >= 60) return '72percent.svg';
    if (score >= 43) return '52percent.svg';
    return '41percent.svg';
  };

  // Function to get prioritized agents based on tool selections
  // const getPrioritizedAgents = (currentStack: string[]) => {
  //   const agentPriorities: string[] = [];
    
  //   // CRM & sales → prioritize AI Sales Director
  //   if (currentStack.includes('hubspot-salesforce-pipedrive')) {
  //     agentPriorities.push('AI Sales Director');
  //   }
    
  //   // Support → prioritize AI Success Captain
  //   if (currentStack.includes('intercom-zendesk-helpscout')) {
  //     agentPriorities.push('AI Success Captain');
  //   }
    
  //   // Docs/Projects/Files/Automation → AI Ops Commander
  //   if (currentStack.some(tool => [
  //     'notion-airtable-clickup',
  //     'asana-monday-trello', 
  //     'google-drive-dropbox-onedrive',
  //     'zapier-make'
  //   ].includes(tool))) {
  //     agentPriorities.push('AI Ops Commander');
  //   }
    
  //   // Content/Email marketing/Ads → AI Content Creator (assuming this maps to Matrix agent)
  //   if (currentStack.includes('gmail-outlook')) {
  //     agentPriorities.push('AI Content Creator');
  //   }
    
  //   // Storefront/Payments → pair Sales Director + Ops Commander
  //   if (currentStack.some(tool => ['shopify-woocommerce', 'stripe-payments'].includes(tool))) {
  //     if (!agentPriorities.includes('AI Sales Director')) {
  //       agentPriorities.push('AI Sales Director');
  //     }
  //     if (!agentPriorities.includes('AI Ops Commander')) {
  //       agentPriorities.push('AI Ops Commander');
  //     }
  //   }
    
  //   // Default agents if none specified
  //   if (agentPriorities.length === 0) {
  //     agentPriorities.push('AI Sales Director', 'AI Content Creator', 'AI Ops Commander');
  //   }
    
  //   return agentPriorities;
  // };

  // Segment is now passed directly from LeadCaptureGate based on calculated score

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -50 }
  };

  const pageTransition = {
    type: "tween" as const,
    ease: "anticipate" as const,
    duration: 0.8
  };

  // Segment content
  const getSegmentContent = () => {
    switch (segment) {
      case 'foundation-builder':
        return {
          title: `Your Freedom Score: ${score}%`,
          subtitle: "Here's what it means — and what to do next.",
          insights: [
            {
              label: "Time Leak",
              text: "Most hours go to operations, leaving little room for growth."
            },
            {
              label: "System Gap",
              text: "Missing documented processes = recurring bottlenecks."
            },
            {
              label: "Next Move",
              text: "Start with the Founder Freedom Blueprint to build your foundation."
            }
          ],
          buttons: [
            { text: "Continue", primary: true, href: `/demo?segment=foundation-builder` }
          ]
        };
      
      case 'system-optimizer':
        return {
          title: `Your Freedom Score: ${score}%`,
          subtitle: "Here's what it means — and what to do next.",
          insights: [
            {
              label: "Time Leak",
              text: "Still handling too many tasks that could be automated or delegated."
            },
            {
              label: "System Gap",
              text: "Systems exist but aren't optimized for scale."
            },
            {
              label: "Next Move",
              text: "Join the Founder's Circle to refine and scale faster."
            }
          ],
          buttons: [
            { text: "Continue", primary: true, href: `/demo?segment=system-optimizer` }
          ]
        };
      
      case 'sovereign-founder':
        return {
          title: `Your Freedom Score: ${score}%`,
          subtitle: "Here's what it means — and what to do next.",
          insights: [
            {
              label: "Time Leak",
              text: "Minimal leaks—you've built strong systems."
            },
            {
              label: "System Gap",
              text: "Ready for strategic execution and team leverage."
            },
            {
              label: "Next Move",
              text: "Book a call with Chase to operate like a true CEO."
            }
          ],
          buttons: [
            { text: "Continue", primary: true, href: `/demo?segment=sovereign-founder` }
          ]
        };
    }
  };

  const content = getSegmentContent();

  return (
    <div className="text-white h-screen w-screen overflow-hidden relative flex flex-col items-center justify-center">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: 'url(/images/bg-squares-results.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.8
        }}
      />
      
      {/* Content Wrapper */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
      
      {/* Exit Button */}
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
      
      {/* Main Content Container */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        
        <motion.div
          className="flex flex-col items-center text-center w-full relative z-10"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          
          {/* Circular Score Indicator */}
          <motion.div 
            className="relative mb-6 md:mb-6 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          >
            {/* Radar SVG Background - Responsive */}
            <div className="relative flex items-center justify-center">
              <Image 
                src={`/images/${getRadarSvg(score)}`}
                alt={`${score}% Freedom Score`}
                width={263}
                height={263}
                className="w-[193px] h-[193px] md:w-[263px] md:h-[263px]"
              />
              
              {/* Score Circle Overlay - Responsive */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Gradient Glow Behind Score Circle */}
                <div 
                  className="absolute w-[120px] h-[120px] md:w-[160px] md:h-[160px] bg-[#e3b492]/40 rounded-full blur-[45px] -rotate-90"
                  data-layer="score-glow"
                />
                
                <div 
                  className="w-[131px] h-[131px] md:w-[171px] md:h-[171px] bg-black relative rounded-full shadow-[-0.734px_-0.734px_1.468px_0px_#d3ab8a,0.734px_0.734px_1.468px_0px_rgba(15,20,26,0.5)] md:shadow-[-1px_-1px_2px_0px_#d3ab8a,1px_1px_2px_0px_rgba(15,20,26,0.5)] flex items-center justify-center z-10"
                  data-name="score indicator"
                >
                  {/* Inner shadow overlay */}
                  <div className="absolute inset-0 pointer-events-none shadow-[0px_-14.677px_19.887px_0px_inset_rgba(253,212,198,0.2),0.734px_-0.734px_1.468px_0px_inset_rgba(15,20,26,0.2),-0.734px_0.734px_1.468px_0px_inset_rgba(15,20,26,0.2),0.734px_0.734px_1.468px_0px_inset_rgba(61,82,104,0.9),-0.734px_-0.734px_2.202px_0px_inset_rgba(15,20,26,0.9)] md:shadow-[0px_-20px_27.1px_0px_inset_rgba(253,212,198,0.2),1px_-1px_2px_0px_inset_rgba(15,20,26,0.2),-1px_1px_2px_0px_inset_rgba(15,20,26,0.2),1px_1px_2px_0px_inset_rgba(64,64,64,0.9),-1px_-1px_3px_0px_inset_rgba(15,20,26,0.9)] rounded-full" />
                  
                  {/* Score Text with Counting Animation */}
                  <CountingScore 
                    targetScore={score}
                    className="text-[31px] md:text-[42px] font-bold font-['Inter'] text-center text-white relative z-10"
                    style={{
                      textShadow: '0 2px 8px rgba(0,0,0,0.5), 0 0 12px rgba(255,225,198,0.3)'
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Main Headline */}
          <h1 
            className="text-[26px] md:text-[34px] font-medium font-['Inter'] capitalize mb-6 md:mb-12 max-w-[343px] md:max-w-[525px] mx-auto leading-[36px] md:leading-[52.8px] text-center px-0 md:px-0"
            style={{
              background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #04070D 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent"
            }}
          >
            {content.title}
          </h1>
          
          {/* Three Insights */}
          <div className="mb-8 md:mb-16 w-full max-w-[600px] px-6 md:px-0">
            <div className="flex flex-col gap-6 md:gap-8">
              {content.insights.map((insight, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.15 }}
                >
                  <h3 className="text-white text-[14px] md:text-[16px] font-semibold font-['Inter'] uppercase tracking-[0.5px]">
                    {insight.label}
                  </h3>
                  <p className="text-[#d5dbe6] text-[16px] md:text-[18px] font-normal font-['Inter'] leading-[1.6]">
                    {insight.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          
          
          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col gap-6 items-center justify-center px-[24px] md:px-0 w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {content.buttons.map((button, index) => (
              button.primary ? (
                // Primary button with gold CTA styling - full width on mobile
                <div key={index} className="relative group w-full md:w-auto">
                  {/* Button Glow Background - grows on hover */}
                  <Image
                    src="/images/button-glow.png"
                    alt=""
                    width={314}
                    height={120}
                    className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 w-[314px] h-[120px] object-contain opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
                  />
                  
                  <div 
                    className="p-[2px] rounded-lg w-full md:w-[524px] mx-auto h-[50px] flex items-center justify-center overflow-hidden relative z-10"
                    style={{
                      background: 'radial-gradient(50% 20.7% at 50% 100%, #FFFFFF 0%, rgba(255, 255, 255, 0.00) 100%)'
                    }}
                  >
                    <Link 
                      href={button.href}
                      className="w-full h-full bg-gradient-to-b from-[#FFFFFF] to-[#F3F3F3] rounded-[8px] flex items-center justify-center gap-1.5 px-8 py-3 relative z-10"
                    >
                      <span className="text-[#000000] text-[16px] font-semibold font-inter tracking-[-0.16px] leading-[20px]">
                        {button.text}
                      </span>
                      <div className="w-[22px] h-[22px]">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                          <path d="M4.58333 11H17.4167M17.4167 11L11.9167 5.5M17.4167 11L11.9167 16.5" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>
              ) : (
                // Secondary button - simple text link
                <Link
                  key={index}
                  href={button.href}
                  className="text-[#d0d0d0] text-[14px] font-normal font-['Inter'] tracking-[-0.28px] leading-[20px] hover:text-[#f2c6a6] transition-colors duration-300"
                >
                  {button.text}
                </Link>
              )
            ))}
          </motion.div>
          
        </motion.div>
      </div>
      
      {/* Custom Styles */}
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
        
        /* Responsive styles */
        @media screen and (max-width: 990px) {
          .dreamflow-logo-results {
            width: 100px;
            height: auto;
          }
        }
        
        @media screen and (max-width: 500px) {
          .dreamflow-logo-results {
            width: 80px;
            height: auto;
          }
        }
      `}</style>
      </div>
    </div>
  );
} 