"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
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
        <div className="founder-pill mb-6 flex items-center justify-center w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-[24px] bg-[#1b1c20]">
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
        <div className="founder-heading w-full max-w-[490px] mx-auto mb-12">
          <h2 className="bg-clip-text text-center font-inter font-medium text-transparent text-[32px] md:text-[40px] lg:text-[44px] leading-[1.2] tracking-tight"
            style={{
              backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 416 53\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(41.184 0 0 4.558 208 26.5)\"><stop stop-color=\"rgba(213,219,230,1)\" offset=\"0.28387\"/><stop stop-color=\"rgba(161,166,176,1)\" offset=\"0.46291\"/><stop stop-color=\"rgba(135,140,149,1)\" offset=\"0.55242\"/><stop stop-color=\"rgba(109,113,122,1)\" offset=\"0.64194\"/><stop stop-color=\"rgba(82,87,94,1)\" offset=\"0.73145\"/><stop stop-color=\"rgba(56,60,67,1)\" offset=\"0.82097\"/><stop stop-color=\"rgba(30,34,40,1)\" offset=\"0.91048\"/><stop stop-color=\"rgba(17,20,27,1)\" offset=\"0.95524\"/><stop stop-color=\"rgba(4,7,13,1)\" offset=\"1\"/></radialGradient></defs></svg>')"
            }}>
            Build a $1M+ Business on 80% <span className="font-instrument-serif italic">Autopilot.</span>
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[14px]">
          
          {/* Card 1: Step-by-Step Guidance - Top Left, spans 5 columns */}
          <div className="founder-card md:col-span-5 bg-[#0c0c0c] border border-[#1c1c1f] rounded-[20px] overflow-hidden min-h-[400px] md:min-h-[566px] relative">
            {/* Full Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/images/card-image-one.png"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 z-10">
              <h3 className="bg-clip-text font-inter font-medium text-transparent text-[32px] md:text-[40px] leading-[1.25] mb-4 md:mb-5"
                style={{
                  backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 416 53\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(41.184 0 0 4.558 208 26.5)\"><stop stop-color=\"rgba(213,219,230,1)\" offset=\"0.28387\"/><stop stop-color=\"rgba(161,166,176,1)\" offset=\"0.46291\"/><stop stop-color=\"rgba(135,140,149,1)\" offset=\"0.55242\"/><stop stop-color=\"rgba(109,113,122,1)\" offset=\"0.64194\"/><stop stop-color=\"rgba(82,87,94,1)\" offset=\"0.73145\"/><stop stop-color=\"rgba(56,60,67,1)\" offset=\"0.82097\"/><stop stop-color=\"rgba(30,34,40,1)\" offset=\"0.91048\"/><stop stop-color=\"rgba(17,20,27,1)\" offset=\"0.95524\"/><stop stop-color=\"rgba(4,7,13,1)\" offset=\"1\"/></radialGradient></defs></svg>')"
                }}>
                Step-by-Step <span className="font-instrument-serif italic">Guidance</span>
              </h3>
              <p className="font-inter text-[16px] md:text-[18px] leading-[1.4] text-[#c4c4c4] max-w-[440px]">
                1:1 strategy sessions and group mentorship directly with <span className="font-instrument-serif italic">Chase Ando.</span>
              </p>
            </div>
          </div>

          {/* Card 2: Curated Community - Top Right, spans 7 columns */}
          <div className="founder-card md:col-span-7 bg-[#0c0c0c] border border-[#1c1c1f] rounded-[20px] overflow-hidden min-h-[400px] md:min-h-[566px] relative">
            {/* Background Image on Bottom - Full Width Edge to Edge */}
            <div 
              className="absolute bottom-0 left-0 w-full pointer-events-none"
              style={{
                height: '75%',
                backgroundImage: "url('/images/card-image-two.svg')",
                backgroundSize: '100% auto',
                backgroundPosition: 'bottom center',
                backgroundRepeat: 'no-repeat'
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-start p-8 md:p-10 z-10">
              <h3 className="bg-clip-text font-inter font-medium text-transparent text-[32px] md:text-[40px] leading-[1.25] mb-4 md:mb-5"
                style={{
                  backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 416 53\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(41.184 0 0 4.558 208 26.5)\"><stop stop-color=\"rgba(213,219,230,1)\" offset=\"0.28387\"/><stop stop-color=\"rgba(161,166,176,1)\" offset=\"0.46291\"/><stop stop-color=\"rgba(135,140,149,1)\" offset=\"0.55242\"/><stop stop-color=\"rgba(109,113,122,1)\" offset=\"0.64194\"/><stop stop-color=\"rgba(82,87,94,1)\" offset=\"0.73145\"/><stop stop-color=\"rgba(56,60,67,1)\" offset=\"0.82097\"/><stop stop-color=\"rgba(30,34,40,1)\" offset=\"0.91048\"/><stop stop-color=\"rgba(17,20,27,1)\" offset=\"0.95524\"/><stop stop-color=\"rgba(4,7,13,1)\" offset=\"1\"/></radialGradient></defs></svg>')"
                }}>
                Curated Community
              </h3>
              <p className="font-inter text-[16px] md:text-[18px] leading-[1.4] text-[#c4c4c4] max-w-[440px]">
                Join an <span className="font-instrument-serif italic">elite circle</span> of founders through private retreats and global experiences.
              </p>
            </div>
          </div>

          {/* Card 3: Avyra Command HUD - Middle, spans full width */}
          <div className="founder-card md:col-span-12 bg-[#0c0c0c] border border-[#1c1c1f] rounded-[20px] overflow-hidden md:min-h-[588px] relative">
            {/* Desktop Layout - Absolute Positioning */}
            <div className="hidden md:block">
              {/* Background Image on Right Middle - Desktop */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[60%] h-[70%] pointer-events-none">
                <Image
                  src="/images/card-image-three.png"
                  alt=""
                  fill
                  className="object-contain object-right"
                />
              </div>
              {/* Content - Desktop */}
              <div className="absolute inset-0 flex flex-col justify-center items-start p-10">
                <h3 className="bg-clip-text font-inter font-medium text-transparent text-[40px] leading-[1.25] mb-5"
                  style={{
                    backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 416 53\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(41.184 0 0 4.558 208 26.5)\"><stop stop-color=\"rgba(213,219,230,1)\" offset=\"0.28387\"/><stop stop-color=\"rgba(161,166,176,1)\" offset=\"0.46291\"/><stop stop-color=\"rgba(135,140,149,1)\" offset=\"0.55242\"/><stop stop-color=\"rgba(109,113,122,1)\" offset=\"0.64194\"/><stop stop-color=\"rgba(82,87,94,1)\" offset=\"0.73145\"/><stop stop-color=\"rgba(56,60,67,1)\" offset=\"0.82097\"/><stop stop-color=\"rgba(30,34,40,1)\" offset=\"0.91048\"/><stop stop-color=\"rgba(17,20,27,1)\" offset=\"0.95524\"/><stop stop-color=\"rgba(4,7,13,1)\" offset=\"1\"/></radialGradient></defs></svg>')"
                  }}>
                  Avyra Command <span className="font-instrument-serif italic">HUD</span>
                </h3>
                <p className="font-inter text-[18px] leading-[1.4] text-[#c4c4c4] max-w-[386px]">
                  Access Avyra Core your <span className="font-instrument-serif italic">executive</span> dashboard for clarity and control.
                </p>
              </div>
            </div>

            {/* Mobile Layout - Flex Column */}
            <div className="md:hidden flex flex-col">
              {/* Content at top - Mobile */}
              <div className="relative z-10 p-8">
                <h3 className="bg-clip-text font-inter font-medium text-transparent text-[32px] leading-[1.25] mb-4"
                  style={{
                    backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 416 53\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(41.184 0 0 4.558 208 26.5)\"><stop stop-color=\"rgba(213,219,230,1)\" offset=\"0.28387\"/><stop stop-color=\"rgba(161,166,176,1)\" offset=\"0.46291\"/><stop stop-color=\"rgba(135,140,149,1)\" offset=\"0.55242\"/><stop stop-color=\"rgba(109,113,122,1)\" offset=\"0.64194\"/><stop stop-color=\"rgba(82,87,94,1)\" offset=\"0.73145\"/><stop stop-color=\"rgba(56,60,67,1)\" offset=\"0.82097\"/><stop stop-color=\"rgba(30,34,40,1)\" offset=\"0.91048\"/><stop stop-color=\"rgba(17,20,27,1)\" offset=\"0.95524\"/><stop stop-color=\"rgba(4,7,13,1)\" offset=\"1\"/></radialGradient></defs></svg>')"
                  }}>
                  Avyra Command <span className="font-instrument-serif italic">HUD</span>
                </h3>
                <p className="font-inter text-[16px] leading-[1.4] text-[#c4c4c4]">
                  Access Avyra Core your <span className="font-instrument-serif italic">executive</span> dashboard for clarity and control.
                </p>
              </div>
              {/* Background Image on Bottom - Mobile, Full Width Edge to Edge */}
              <div className="relative w-full pointer-events-none">
                <Image
                  src="/images/card-image-three-mobile.png"
                  alt=""
                  width={400}
                  height={300}
                  className="w-full h-auto"
                  style={{ display: 'block' }}
                />
              </div>
            </div>
          </div>

          {/* Card 4: Plug & Play Systems - Bottom Left, spans 4 columns */}
          <div className="founder-card md:col-span-4 bg-[#0c0c0c] border border-[#1c1c1f] rounded-[20px] overflow-hidden min-h-[400px] md:min-h-[646px] relative flex flex-col">
            {/* Content at top */}
            <div className="relative z-10 p-8 md:p-10">
              <h3 className="bg-clip-text font-inter font-medium text-transparent text-[32px] md:text-[40px] leading-[1.25] mb-4 md:mb-5"
                style={{
                  backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 416 53\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(41.184 0 0 4.558 208 26.5)\"><stop stop-color=\"rgba(213,219,230,1)\" offset=\"0.28387\"/><stop stop-color=\"rgba(161,166,176,1)\" offset=\"0.46291\"/><stop stop-color=\"rgba(135,140,149,1)\" offset=\"0.55242\"/><stop stop-color=\"rgba(109,113,122,1)\" offset=\"0.64194\"/><stop stop-color=\"rgba(82,87,94,1)\" offset=\"0.73145\"/><stop stop-color=\"rgba(56,60,67,1)\" offset=\"0.82097\"/><stop stop-color=\"rgba(30,34,40,1)\" offset=\"0.91048\"/><stop stop-color=\"rgba(17,20,27,1)\" offset=\"0.95524\"/><stop stop-color=\"rgba(4,7,13,1)\" offset=\"1\"/></radialGradient></defs></svg>')"
                }}>
                Plug & Play <span className="font-instrument-serif italic">Systems</span>
              </h3>
              <p className="font-inter text-[16px] md:text-[18px] leading-[1.4] text-[#c4c4c4]">
                <span className="font-instrument-serif italic">Proven</span> templates and Playbooks used by the top 1% of founders.
              </p>
            </div>
            {/* Background Image on Bottom - Full Width Edge to Edge */}
            <div className="relative w-full mt-auto pointer-events-none">
              <Image
                src="/images/card-image-four.png"
                alt=""
                width={400}
                height={500}
                className="w-full h-auto"
                style={{ display: 'block' }}
              />
            </div>
          </div>

          {/* Card 5: Freedom Blueprint - Bottom Right, spans 8 columns */}
          <div className="founder-card md:col-span-8 bg-[#0c0c0c] border border-[#1c1c1f] rounded-[20px] overflow-hidden min-h-[400px] md:min-h-[646px] relative">
            {/* Background Image on Bottom - Full Width Edge to Edge */}
            <div 
              className="absolute bottom-0 left-0 w-full pointer-events-none"
              style={{
                height: '75%',
                backgroundImage: "url('/images/card-image-five.svg')",
                backgroundSize: '100% auto',
                backgroundPosition: 'bottom center',
                backgroundRepeat: 'no-repeat'
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-start p-8 md:p-10 z-10">
              <h3 className="bg-clip-text font-inter font-medium text-transparent text-[32px] md:text-[40px] leading-[1.25] mb-4 md:mb-5"
                style={{
                  backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 416 53\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(41.184 0 0 4.558 208 26.5)\"><stop stop-color=\"rgba(213,219,230,1)\" offset=\"0.28387\"/><stop stop-color=\"rgba(161,166,176,1)\" offset=\"0.46291\"/><stop stop-color=\"rgba(135,140,149,1)\" offset=\"0.55242\"/><stop stop-color=\"rgba(109,113,122,1)\" offset=\"0.64194\"/><stop stop-color=\"rgba(82,87,94,1)\" offset=\"0.73145\"/><stop stop-color=\"rgba(56,60,67,1)\" offset=\"0.82097\"/><stop stop-color=\"rgba(30,34,40,1)\" offset=\"0.91048\"/><stop stop-color=\"rgba(17,20,27,1)\" offset=\"0.95524\"/><stop stop-color=\"rgba(4,7,13,1)\" offset=\"1\"/></radialGradient></defs></svg>')"
                }}>
                Freedom <span className="font-instrument-serif italic">Blueprint</span>
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
