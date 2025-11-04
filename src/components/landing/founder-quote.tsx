"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobileDevice, getScrollTriggerConfig } from '../../../lib/mobile-utils';

const FounderQuote = () => {
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

    gsap.set([".founder-pill", ".founder-heading", ".founder-card"], initialState);

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
    tl.to(".founder-pill", animationProps)
      .to(".founder-heading", animationProps, isMobile ? "-=0.4" : "-=1.5")
      .to(".founder-card", {
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
      id="founder-quote"
    >
      {/* Container to center content */}
      <div className="relative w-full max-w-[1224px] mx-auto">

        {/* Section Tag */}
        <div className="founder-pill mb-8 md:mb-12 flex items-center justify-center w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[24px] bg-[#1b1c20]">
            {/* Gradient dot */}
            <div className="w-[6.9px] h-[6.9px] rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#3B3B3B] shadow-[0px_1.15px_18.4px_0px_inset_rgba(255,255,255,0.12),0px_1.15px_1.15px_0px_inset_rgba(255,255,255,0.09)]"></div>
            <span
              className="font-inter font-medium text-[14px] leading-[22px] tracking-[-0.14px] pill-text-gradient uppercase"
            >
              Founder Freedom System
            </span>
          </div>
        </div>

        {/* Main Heading - centered */}
        <div className="founder-heading w-full max-w-[490px] mx-auto mb-12 md:mb-16">
          <h2 className="text-center font-inter font-medium text-[32px] md:text-[40px] lg:text-[44px] leading-[1.2] tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#d5dbe6] via-[#878b94] to-[#04070d]">
              Build a $1M+ Business on 80% <span className="font-instrument-serif italic">Autopilot.</span>
            </span>
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          
          {/* Card 1: Step-by-Step Guidance - Top Left, spans 5 columns */}
          <div className="founder-card md:col-span-5 bg-[#0c0c0c] border border-[#1c1c1f] rounded-[20px] overflow-hidden min-h-[400px] md:min-h-[566px] relative">
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
              <h3 className="font-inter font-medium text-[32px] md:text-[40px] leading-[1.25] mb-4 md:mb-5">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#d5dbe6] via-[#878b94] to-[#04070d]">
                  Step-by-Step <span className="font-instrument-serif italic">Guidance</span>
                </span>
              </h3>
              <p className="font-inter text-[16px] md:text-[18px] leading-[1.4] text-[#c4c4c4] max-w-[440px]">
                1:1 strategy sessions and group mentorship directly with <span className="font-instrument-serif italic">Chase Ando.</span>
              </p>
            </div>
          </div>

          {/* Card 2: Curated Community - Top Right, spans 7 columns */}
          <div className="founder-card md:col-span-7 bg-[#0c0c0c] border border-[#1c1c1f] rounded-[20px] overflow-hidden min-h-[400px] md:min-h-[566px] relative">
            <div className="absolute inset-0 flex flex-col justify-start p-8 md:p-10">
              <h3 className="font-inter font-medium text-[32px] md:text-[40px] leading-[1.25] mb-4 md:mb-5">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#d5dbe6] via-[#878b94] to-[#04070d]">
                  Curated Community
                </span>
              </h3>
              <p className="font-inter text-[16px] md:text-[18px] leading-[1.4] text-[#c4c4c4] max-w-[440px]">
                Join an <span className="font-instrument-serif italic">elite circle</span> of founders through private retreats and global experiences.
              </p>
            </div>
          </div>

          {/* Card 3: Avyra Command HUD - Middle, spans full width */}
          <div className="founder-card md:col-span-12 bg-[#0c0c0c] border border-[#1c1c1f] rounded-[20px] overflow-hidden min-h-[400px] md:min-h-[588px] relative">
            <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-10">
              <h3 className="font-inter font-medium text-[32px] md:text-[40px] leading-[1.25] mb-4 md:mb-5">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#d5dbe6] via-[#878b94] to-[#04070d]">
                  Avyra Command <span className="font-instrument-serif italic">HUD</span>
                </span>
              </h3>
              <p className="font-inter text-[16px] md:text-[18px] leading-[1.4] text-[#c4c4c4] max-w-[386px]">
                Access Avyra Core your <span className="font-instrument-serif italic">executive</span> dashboard for clarity and control.
              </p>
            </div>
          </div>

          {/* Card 4: Plug & Play Systems - Bottom Left, spans 4 columns */}
          <div className="founder-card md:col-span-4 bg-[#0c0c0c] border border-[#1c1c1f] rounded-[20px] overflow-hidden min-h-[400px] md:min-h-[646px] relative">
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
              <h3 className="font-inter font-medium text-[32px] md:text-[40px] leading-[1.25] mb-4 md:mb-5">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#d5dbe6] via-[#878b94] to-[#04070d]">
                  Plug & Play <span className="font-instrument-serif italic">Systems</span>
                </span>
              </h3>
              <p className="font-inter text-[16px] md:text-[18px] leading-[1.4] text-[#c4c4c4]">
                <span className="font-instrument-serif italic">Proven</span> templates and Playbooks used by the top 1% of founders.
              </p>
            </div>
          </div>

          {/* Card 5: Freedom Blueprint - Bottom Right, spans 8 columns */}
          <div className="founder-card md:col-span-8 bg-[#0c0c0c] border border-[#1c1c1f] rounded-[20px] overflow-hidden min-h-[400px] md:min-h-[646px] relative">
            <div className="absolute inset-0 flex flex-col justify-start p-8 md:p-10">
              <h3 className="font-inter font-medium text-[32px] md:text-[40px] leading-[1.25] mb-4 md:mb-5">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#d5dbe6] via-[#878b94] to-[#04070d]">
                  Freedom <span className="font-instrument-serif italic">Blueprint</span>
                </span>
              </h3>
              <p className="font-inter text-[16px] md:text-[18px] leading-[1.4] text-[#c4c4c4] max-w-[440px]">
                Your roadmap to design a freedom-first business and bring your vision to life.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FounderQuote;
