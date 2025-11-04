"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobileDevice, getScrollTriggerConfig } from '../../../lib/mobile-utils';
import Image from 'next/image';

const Ecosystem = () => {
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

    gsap.set([".ecosystem-pill", ".ecosystem-heading", ".ecosystem-card"], initialState);

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
    tl.to(".ecosystem-pill", animationProps)
      .to(".ecosystem-heading", animationProps, isMobile ? "-=0.4" : "-=1.5")
      .to(".ecosystem-card", {
        ...animationProps,
        stagger: isMobile ? 0.1 : 0.15
      }, isMobile ? "-=0.2" : "-=1.5");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#080808] overflow-hidden py-24 px-4 md:px-8"
      id="ecosystem"
      style={{
        backgroundImage: "url('/images/ecosystem-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Container to center content */}
      <div className="relative w-full max-w-[1224px] mx-auto">

        {/* Section Tag */}
        <div className="ecosystem-pill mb-6 flex items-center justify-center w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-[24px] bg-[#1b1c20]">
            {/* Gradient dot */}
            <div className="w-[6.9px] h-[6.9px] rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#3B3B3B] shadow-[0px_1.15px_18.4px_0px_inset_rgba(255,255,255,0.12),0px_1.15px_1.15px_0px_inset_rgba(255,255,255,0.09)]"></div>
            <span
              className="font-inter font-medium text-[14px] leading-[22px] tracking-[-0.14px] pill-text-gradient uppercase"
            >
              Avyra Ecosystem
            </span>
          </div>
        </div>

        {/* Main Heading - centered */}
        <div className="ecosystem-heading w-full max-w-[490px] mx-auto mb-12">
          <h2 className="text-center font-inter font-medium text-[32px] md:text-[40px] lg:text-[44px] leading-[1.2] tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#d5dbe6] via-[#878b94] to-[#04070d]">
              Measure what matters. Multiply your <span className="font-instrument-serif italic">freedom.</span>
            </span>
          </h2>
        </div>

        {/* Three Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Time Freedom */}
          <div 
            className="ecosystem-card relative bg-[#080808] border border-[#1c1c1f] rounded-[20px] overflow-hidden h-[372px]"
            style={{
              backgroundImage: "url('/images/eco-card-bg.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Content Container - Bottom Area */}
            <div className="absolute bottom-0 left-0 right-0 px-8 pb-8">
              {/* Logo with Gradient Glow */}
              <div className="relative mb-8">
                {/* Gold Gradient Glow */}
                <div 
                  className="absolute w-[150px] h-[150px] rounded-full blur-[60px] pointer-events-none"
                  style={{
                    left: '30px',
                    top: '10%',
                    transform: 'translateX(-50%)',
                    background: 'radial-gradient(circle, rgba(245, 198, 162, 0.6) 0%, rgba(245, 198, 162, 0) 70%)'
                  }}
                />
                <Image
                  src="/images/ai-eco.svg"
                  alt=""
                  width={86}
                  height={83}
                  className="relative w-[86px] h-[83px]"
                />
              </div>
              
              {/* Text Content */}
              <div className="flex flex-col gap-[18px]">
                <h3 className="font-inter font-medium text-[40px] leading-[50px] tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#d5dbe6] via-[#878b94] to-[#04070d]">
                    Time <span className="font-instrument-serif italic">Freedom</span>
                  </span>
                </h3>
                <p className="font-inter text-[18px] leading-[1.4] text-[#c4c4c4]">
                  Automate 80%+ of repetitive work and reclaim your time
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Creative Freedom */}
          <div 
            className="ecosystem-card relative bg-[#080808] border border-[#1c1c1f] rounded-[20px] overflow-hidden h-[372px]"
            style={{
              backgroundImage: "url('/images/eco-card-bg.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Content Container - Bottom Area */}
            <div className="absolute bottom-0 left-0 right-0 px-8 pb-8">
              {/* Logo with Gradient Glow */}
              <div className="relative mb-8">
                {/* Turquoise Gradient Glow */}
                <div 
                  className="absolute w-[150px] h-[150px] rounded-full blur-[60px] pointer-events-none"
                  style={{
                    left: '30px',
                    top: '10%',
                    transform: 'translateX(-50%)',
                    background: 'radial-gradient(circle, rgba(24, 224, 224, 0.6) 0%, rgba(24, 224, 224, 0) 70%)'
                  }}
                />
                <Image
                  src="/images/studio-eco.svg"
                  alt=""
                  width={86}
                  height={83}
                  className="relative w-[86px] h-[83px]"
                />
              </div>
              
              {/* Text Content */}
              <div className="flex flex-col gap-[18px]">
                <h3 className="font-inter font-medium text-[40px] leading-[50px] tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#d5dbe6] via-[#878b94] to-[#04070d]">
                    Creative <span className="font-instrument-serif italic">Freedom</span>
                  </span>
                </h3>
                <p className="font-inter text-[18px] leading-[1.4] text-[#c4c4c4]">
                  Build brands, products, and experiences that move people.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Clarity & Control */}
          <div 
            className="ecosystem-card relative bg-[#080808] border border-[#1c1c1f] rounded-[20px] overflow-hidden h-[372px]"
            style={{
              backgroundImage: "url('/images/eco-card-bg.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Content Container - Bottom Area */}
            <div className="absolute bottom-0 left-0 right-0 px-8 pb-8">
              {/* Logo with Gradient Glow */}
              <div className="relative mb-8">
                {/* White Gradient Glow */}
                <div 
                  className="absolute w-[150px] h-[150px] rounded-full blur-[60px] pointer-events-none"
                  style={{
                    left: '30px',
                    top: '10%',
                    transform: 'translateX(-50%)',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 70%)'
                  }}
                />
                <Image
                  src="/images/os-eco.svg"
                  alt=""
                  width={86}
                  height={83}
                  className="relative w-[86px] h-[83px]"
                />
              </div>
              
              {/* Text Content */}
              <div className="flex flex-col gap-[18px]">
                <h3 className="font-inter font-medium text-[40px] leading-[50px] tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#d5dbe6] via-[#878b94] to-[#04070d]">
                    Clarity & <span className="font-instrument-serif italic">Control</span>
                  </span>
                </h3>
                <p className="font-inter text-[18px] leading-[1.4] text-[#c4c4c4]">
                  See every system, task, and metric in one clean dashboard.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Ecosystem;

