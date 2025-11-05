"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobileDevice, getScrollTriggerConfig } from '../../../lib/mobile-utils';
import Image from 'next/image';

const TrustedByVisionaries = () => {
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

    gsap.set([".testimonial-pill", ".testimonial-heading", ".testimonial-subtitle", ".testimonial-card"], initialState);

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
    tl.to(".testimonial-pill", animationProps)
      .to(".testimonial-heading", animationProps, isMobile ? "-=0.4" : "-=1.5")
      .to(".testimonial-subtitle", animationProps, isMobile ? "-=0.2" : "-=1.5")
      .to(".testimonial-card", {
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
      id="trusted-by-visionaries"
    >
      {/* Container to center content */}
      <div className="relative w-full max-w-[1224px] mx-auto">

        {/* Section Tag */}
        <div className="testimonial-pill mb-6 flex items-center justify-center w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-[24px] bg-[#1b1c20]">
            {/* Gradient dot */}
            <div className="w-[6.9px] h-[6.9px] rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#3B3B3B] shadow-[0px_1.15px_18.4px_0px_inset_rgba(255,255,255,0.12),0px_1.15px_1.15px_0px_inset_rgba(255,255,255,0.09)]"></div>
            <span
              className="font-inter font-medium text-[14px] leading-[22px] tracking-[-0.14px] pill-text-gradient uppercase"
            >
              trusted by Visionaries
            </span>
          </div>
        </div>

        {/* Main Heading - centered */}
        <div className="testimonial-heading w-full max-w-[527px] mx-auto mb-6">
          <h2 className="bg-clip-text text-center font-inter font-medium text-transparent text-[32px] md:text-[40px] lg:text-[44px] leading-[1.2] tracking-tight"
            style={{
              backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 416 53\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(41.184 0 0 4.558 208 26.5)\"><stop stop-color=\"rgba(213,219,230,1)\" offset=\"0.28387\"/><stop stop-color=\"rgba(161,166,176,1)\" offset=\"0.46291\"/><stop stop-color=\"rgba(135,140,149,1)\" offset=\"0.55242\"/><stop stop-color=\"rgba(109,113,122,1)\" offset=\"0.64194\"/><stop stop-color=\"rgba(82,87,94,1)\" offset=\"0.73145\"/><stop stop-color=\"rgba(56,60,67,1)\" offset=\"0.82097\"/><stop stop-color=\"rgba(30,34,40,1)\" offset=\"0.91048\"/><stop stop-color=\"rgba(17,20,27,1)\" offset=\"0.95524\"/><stop stop-color=\"rgba(4,7,13,1)\" offset=\"1\"/></radialGradient></defs></svg>')"
            }}>
            Real founders. Real <span className="font-instrument-serif italic">results.</span>
          </h2>
        </div>

        {/* Subtitle */}
        <div className="testimonial-subtitle w-full max-w-[356px] mx-auto mb-12">
          <p className="text-center font-inter text-[16px] leading-[25.6px] tracking-[-0.32px] text-[#d5dbe6]">
            Founders using Avyra save 20+ hours a week and grow 3x faster ~ with less stress.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="flex flex-col gap-6">
          
          {/* Testimonial Card 1 - James Kussov */}
          <div className="testimonial-card relative bg-[rgba(8,8,8,0.2)] rounded-[20px] border border-[rgba(216,231,242,0.07)] shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] overflow-hidden">
            {/* Background Light Effect */}
            <div 
              className="absolute right-0 top-0 w-full h-full min-h-[348px] opacity-10 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle at 93.8% 8.1%, rgba(184,199,217,0.5) 0%, rgba(184,199,217,0) 100%)"
              }}
            />

            {/* Content Grid - Desktop: Text Left, Image Right */}
            <div className="relative flex flex-col md:flex-row items-center md:items-stretch min-h-[348px]">
              
              {/* Text Content - Left Side on Desktop, Top on Mobile */}
              <div className="flex-1 p-8 md:p-16 flex flex-col justify-center order-2 md:order-1 relative">
                
                {/* Name and Role Tags with Quote Icon on same line */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="bg-[rgba(27,28,32,0.2)] px-5 py-1 rounded-[24px]">
                      <span className="font-inter font-medium text-[14px] leading-[22px] tracking-[-0.14px] text-[#c6c6c6]">
                        James Kussov
                      </span>
                    </div>
                    <div className="bg-[#1b1c20] px-5 py-1 rounded-[24px] flex items-center gap-2">
                      <div className="w-[6.9px] h-[6.9px] rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#3B3B3B]"></div>
                      <span className="font-inter font-medium text-[14px] leading-[22px] tracking-[-0.14px] pill-text-gradient">
                        SaaS Founder
                      </span>
                    </div>
                  </div>
                  
                  {/* Quote Icon - on same line as pills, pushed to right, hidden on mobile */}
                  <div className="hidden md:block w-[43px] h-[43px] flex-shrink-0">
                    <Image
                      src="/images/left-quote.svg"
                      alt=""
                      width={43}
                      height={43}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                {/* Quote Text */}
                <h3 className="bg-clip-text font-inter font-medium text-transparent text-[24px] md:text-[32px] leading-[1.4] tracking-[-0.96px] mb-6"
                  style={{
                    backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 416 53\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(41.184 0 0 4.558 208 26.5)\"><stop stop-color=\"rgba(213,219,230,1)\" offset=\"0.28387\"/><stop stop-color=\"rgba(161,166,176,1)\" offset=\"0.46291\"/><stop stop-color=\"rgba(135,140,149,1)\" offset=\"0.55242\"/><stop stop-color=\"rgba(109,113,122,1)\" offset=\"0.64194\"/><stop stop-color=\"rgba(82,87,94,1)\" offset=\"0.73145\"/><stop stop-color=\"rgba(56,60,67,1)\" offset=\"0.82097\"/><stop stop-color=\"rgba(30,34,40,1)\" offset=\"0.91048\"/><stop stop-color=\"rgba(17,20,27,1)\" offset=\"0.95524\"/><stop stop-color=\"rgba(4,7,13,1)\" offset=\"1\"/></radialGradient></defs></svg>')"
                  }}>
                  &quot;Avyra gave me clarity I didn&apos;t know I needed.&quot;
                </h3>

                {/* Description */}
                <p className="font-inter text-[16px] leading-[25.6px] tracking-[-0.32px] text-[#d5dbe6] max-w-[668px]">
                  Before Avyra, my operations were scattered. Within weeks, their systems gave me full visibility and structure. Now, growth feels effortless and I finally feel in control of my business.
                </p>
              </div>

              {/* Image Content - Right Side on Desktop, Bottom on Mobile */}
              <div className="relative w-full md:w-[372px] h-[292px] md:h-[348px] flex-shrink-0 order-1 md:order-2">
                <div className="relative w-full h-full rounded-t-[20px] md:rounded-l-none md:rounded-r-[20px] overflow-hidden p-[28px] flex items-center justify-center">
                  {/* Testimonial Image */}
                  <div className="relative w-full h-full rounded-[16px] overflow-hidden">
                    <Image
                      src="/images/vision-two.png"
                      alt="James Kussov"
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/images/play-button.svg"
                      alt="Play"
                      width={124}
                      height={124}
                      className="cursor-pointer hover:scale-105 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Card 2 - Elena Petrescu */}
          <div className="testimonial-card relative bg-[rgba(8,8,8,0.2)] rounded-[20px] border border-[rgba(216,231,242,0.07)] shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] overflow-hidden">
            {/* Background Light Effect */}
            <div 
              className="absolute right-0 top-0 w-full h-full min-h-[348px] opacity-10 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle at 93.8% 8.1%, rgba(184,199,217,0.5) 0%, rgba(184,199,217,0) 100%)"
              }}
            />

            {/* Content Grid - Desktop: Image Left, Text Right */}
            <div className="relative flex flex-col md:flex-row items-center md:items-stretch min-h-[348px] md:gap-0">
              
              {/* Image Content - Left Side on Desktop, Top on Mobile */}
              <div className="relative w-full md:w-[372px] h-[292px] md:h-[348px] flex-shrink-0 order-1">
                <div className="relative w-full h-full rounded-t-[20px] md:rounded-r-none md:rounded-l-[20px] overflow-hidden p-[28px] flex items-center justify-center">
                  {/* Testimonial Image */}
                  <div className="relative w-full h-full rounded-[16px] overflow-hidden">
                    <Image
                      src="/images/vision-one.png"
                      alt="Elena Petrescu"
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/images/play-button.svg"
                      alt="Play"
                      width={124}
                      height={124}
                      className="cursor-pointer hover:scale-105 transition-transform"
                    />
                  </div>
                </div>
              </div>

              {/* Text Content - Right Side on Desktop, Bottom on Mobile */}
              <div className="flex-1 p-8 md:py-16 md:pr-16 md:pl-[42px] flex flex-col justify-center order-2 relative">
                
                {/* Name and Role Tags with Quote Icon on same line */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="bg-[rgba(27,28,32,0.2)] px-5 py-1 rounded-[24px]">
                      <span className="font-inter font-medium text-[14px] leading-[22px] tracking-[-0.14px] text-[#c6c6c6]">
                        Elena Petrescu
                      </span>
                    </div>
                    <div className="bg-[#1b1c20] px-5 py-1 rounded-[24px] flex items-center gap-2">
                      <div className="w-[6.9px] h-[6.9px] rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#3B3B3B]"></div>
                      <span className="font-inter font-medium text-[14px] leading-[22px] tracking-[-0.14px] pill-text-gradient">
                        SaaS Founder
                      </span>
                    </div>
                  </div>
                  
                  {/* Quote Icon - on same line as pills, pushed to right, hidden on mobile */}
                  <div className="hidden md:block w-[43px] h-[43px] flex-shrink-0">
                    <Image
                      src="/images/left-quote.svg"
                      alt=""
                      width={43}
                      height={43}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                {/* Quote Text */}
                <h3 className="bg-clip-text font-inter font-medium text-transparent text-[24px] md:text-[32px] leading-[1.4] tracking-[-0.96px] mb-6"
                  style={{
                    backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 416 53\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(41.184 0 0 4.558 208 26.5)\"><stop stop-color=\"rgba(213,219,230,1)\" offset=\"0.28387\"/><stop stop-color=\"rgba(161,166,176,1)\" offset=\"0.46291\"/><stop stop-color=\"rgba(135,140,149,1)\" offset=\"0.55242\"/><stop stop-color=\"rgba(109,113,122,1)\" offset=\"0.64194\"/><stop stop-color=\"rgba(82,87,94,1)\" offset=\"0.73145\"/><stop stop-color=\"rgba(56,60,67,1)\" offset=\"0.82097\"/><stop stop-color=\"rgba(30,34,40,1)\" offset=\"0.91048\"/><stop stop-color=\"rgba(17,20,27,1)\" offset=\"0.95524\"/><stop stop-color=\"rgba(4,7,13,1)\" offset=\"1\"/></radialGradient></defs></svg>')"
                  }}>
                  &quot;Systems and design that scale with me.&quot;
                </h3>

                {/* Description */}
                <p className="font-inter text-[16px] leading-[25.6px] tracking-[-0.32px] text-[#d5dbe6] max-w-[577px]">
                  Avyra helped me automate the busywork and craft a brand customers trust. The result? More time to lead, and growth that feels simple instead of stressful.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustedByVisionaries;

