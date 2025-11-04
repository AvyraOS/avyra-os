"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobileDevice, getScrollTriggerConfig } from '../../../lib/mobile-utils';
import Image from 'next/image';

const FoundersCircle = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    // Check if mobile device
    const isMobile = isMobileDevice();
    const scrollConfig = getScrollTriggerConfig(isMobile);

    // Set initial state - mobile-friendly
    const initialState = isMobile ? {
      opacity: 0,
      scale: 0.98
    } : {
      opacity: 0,
      y: 40,
      scale: 0.95
    };

    gsap.set(".founders-circle-card", initialState);

    // Create mobile-friendly animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: scrollConfig.start,
        end: isMobile ? undefined : "top 15%",
        scrub: isMobile ? false : 2.5,
        anticipatePin: isMobile ? 0 : 1,
        toggleActions: isMobile ? scrollConfig.toggleActions : undefined,
      }
    });

    // Create mobile-friendly animations
    const animationProps = isMobile ? {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out"
    } : {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 2,
      ease: "power1.out"
    };

    // Apply animations
    tl.to(".founders-circle-card", animationProps);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#080808] overflow-hidden py-24 px-4 md:px-8"
      id="founders-circle"
    >
      {/* Container to center content */}
      <div className="relative w-full max-w-[944px] mx-auto">

        {/* Double Layered Card */}
        <div className="founders-circle-card relative">
          
          {/* Outer Border Card - Gradient Border */}
          <div 
            className="relative border border-[#171920] rounded-[20px] p-[2px]"
            style={{
              backgroundImage: "radial-gradient(ellipse 428px 305.74px at 0% 0%, rgba(255,255,255,1) 0%, rgba(204,204,204,0.5) 40%, rgba(153,153,153,0) 100%)"
            }}
          >
            
            {/* Inner Card - Main Content */}
            <div className="relative bg-[#080808] rounded-[18px] overflow-hidden min-h-[294px]">
              
              {/* Top Left White Glow - Hanging off inside edge */}
              <div className="absolute left-0 top-0 w-[600px] h-[500px] pointer-events-none opacity-20">
                <div 
                  className="absolute inset-0"
                  style={{
                    background: "radial-gradient(ellipse 400px 300px at 0% 0%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.6) 25%, rgba(255, 255, 255, 0) 60%)"
                  }}
                ></div>
              </div>

              {/* Content Container */}
              <div className="relative p-8 md:p-12 flex flex-col">
                
                {/* Left Content */}
                <div className="max-w-[373px]">
                  
                  {/* Tag */}
                  <div className="mb-6">
                    <span className="font-inter font-medium text-[14px] leading-[22px] tracking-[2.5px] text-[rgba(255,255,255,0.84)] uppercase">
                      FOUNDERS CIRCLE
                    </span>
                  </div>

                  {/* Heading */}
                  <h2 className="font-inter font-normal text-[28px] md:text-[32px] leading-[1.4] tracking-[-0.96px] text-white mb-4">
                    Get access to the top 1%
                  </h2>

                  {/* Description */}
                  <p className="font-inter text-[16px] leading-[25.6px] tracking-[-0.32px] text-[#d5dbe6] mb-8">
                    Join a private circle of visionary founders building freedom-first businesses together.
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-6 md:gap-9 mb-8 md:mb-0">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/icons/waitlist-people.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                      <span className="font-inter font-medium text-[16px] leading-[24px] tracking-[-0.18px] text-[rgba(255,255,255,0.84)]">
                        1,500 Waitlist
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/icons/waitlist-timer.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                      <span className="font-inter font-medium text-[16px] leading-[24px] tracking-[-0.18px] text-[rgba(255,255,255,0.84)]">
                        80% Faster
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA Button - Stacks on mobile, absolute on desktop */}
                <div className="mt-auto md:absolute md:bottom-12 md:right-12">
                  <div 
                    className="p-[2px] rounded-lg h-[50px] overflow-hidden"
                    style={{
                      background: "radial-gradient(50% 20.7% at 50% 100%, #FFFFFF 0%, rgba(255, 255, 255, 0.00) 100%)"
                    }}
                  >
                    <button className="bg-gradient-to-b from-[#FFFFFF] to-[#F3F3F3] text-[#000000] px-8 rounded-lg text-base font-medium font-inter transition-all duration-300 hover:opacity-90 h-[46px] flex items-center justify-center group cursor-pointer w-full md:w-auto">
                      <span>Join the Community</span>
                      <svg
                        className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FoundersCircle;

