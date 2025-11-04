"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobileDevice, getScrollTriggerConfig } from '../../../lib/mobile-utils';
import Image from 'next/image';

const FoundersByFounders = () => {
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

    gsap.set([".founders-pill", ".founders-heading", ".founders-image", ".founders-text", ".founders-signature", ".founders-button"], initialState);

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
    tl.to(".founders-pill", animationProps)
      .to(".founders-heading", animationProps, isMobile ? "-=0.4" : "-=1.5")
      .to(".founders-image", animationProps, isMobile ? "-=0.2" : "-=1.5")
      .to(".founders-text", animationProps, isMobile ? "-=0.2" : "-=1.3")
      .to(".founders-signature", animationProps, isMobile ? "-=0.2" : "-=1.1")
      .to(".founders-button", animationProps, isMobile ? "-=0.2" : "-=1.1");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#080808] overflow-hidden"
      id="founders-by-founders"
    >
      {/* Corner Images */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] max-w-[50vw] max-h-[50vw] pointer-events-none">
        <Image
          src="/images/founders-corner-left.svg"
          alt=""
          fill
          className="object-contain object-bottom-left"
          style={{ objectPosition: 'bottom left' }}
        />
      </div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] max-w-[50vw] max-h-[50vw] pointer-events-none">
        <Image
          src="/images/founders-corner-right.svg"
          alt=""
          fill
          className="object-contain object-bottom-right"
          style={{ objectPosition: 'bottom right' }}
        />
      </div>

      {/* Content Container */}
      <div className="relative py-24 px-4 md:px-8">
      {/* Container to center content */}
      <div className="relative w-full max-w-[1224px] mx-auto">

        {/* Section Tag */}
        <div className="founders-pill mb-6 flex items-center justify-center w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-[24px] bg-[#1b1c20]">
            {/* Gradient dot */}
            <div className="w-[6.9px] h-[6.9px] rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#3B3B3B] shadow-[0px_1.15px_18.4px_0px_inset_rgba(255,255,255,0.12),0px_1.15px_1.15px_0px_inset_rgba(255,255,255,0.09)]"></div>
            <span className="font-inter font-medium text-[14px] leading-[22px] tracking-[-0.14px] pill-text-gradient uppercase">
              Avyra OS
            </span>
          </div>
        </div>

        {/* Main Heading - centered */}
        <div className="founders-heading w-full max-w-[490px] mx-auto mb-12">
          <h2 className="text-center font-inter font-medium text-[32px] md:text-[40px] lg:text-[44px] leading-[1.2] tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#d5dbe6] via-[#878b94] to-[#04070d]">
              Built by founders for&nbsp;<span className="font-instrument-serif italic whitespace-nowrap">founders</span>
            </span>
          </h2>
        </div>

        {/* Founder Image */}
        <div className="founders-image relative w-full max-w-[1079px] mx-auto mb-8 md:mb-16">
          <div className="relative w-full rounded-[32px] overflow-hidden bg-[#414141]" style={{ aspectRatio: '1079/421' }}>
            <Image
              src="/images/founders-image.png"
              alt="Chase Ando"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="founders-text w-full max-w-[734px] mx-auto mb-8 text-center">
          <p className="font-inter text-[14px] md:text-[16px] leading-[1.6] text-[#d5dbe6] tracking-[-0.32px]">
            Hey, I&apos;m Chase ~ serial entrepreneur and systems architect behind 20+ brands and $6M+ raised.
            <br className="hidden md:block" />
            {` My mission is to help founders build `}
            <span className="font-inter font-bold italic">freedom-first</span>
            {` businesses that bring purpose, peace, and profit.`}
            <br className="hidden md:block" />
            {` Research shows founders spend 85% of their week `}
            <span className="font-inter font-bold italic">in</span>
            {` their business.`}
            <br className="hidden md:block" />
            {` Avyra OS helps you work `}
            <span className="font-inter font-bold italic">on</span>
            {` it.`}
          </p>
        </div>

        {/* Signature and Name */}
        <div className="founders-signature flex flex-col items-center gap-3 mb-12">
          <div className="relative w-[200px] h-[70px]">
            <Image
              src="/images/signature.svg"
              alt="Signature"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="font-inter font-semibold text-[16px] leading-[20px] text-[#f2f2f2] tracking-[-0.64px]">
              Chase Ando
            </p>
            <p className="font-inter font-medium text-[12px] leading-[17px] text-[#717075] tracking-[-0.48px]">
              Co-Founder & CEO, Avyra
            </p>
          </div>
        </div>

        {/* About Me Button */}
        <div className="founders-button flex justify-center">
          <div 
            className="p-[2px] rounded-[8px]"
            style={{
              backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 143 48\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(2.9601 0 0 2.4 71.5 48)\"><stop stop-color=\"rgba(255,255,255,1)\" offset=\"0\"/><stop stop-color=\"rgba(255,255,255,0)\" offset=\"1\"/></radialGradient></defs></svg>')"
            }}
          >
            <button className="bg-gradient-to-b from-[#ffffff] to-[#f3f3f3] px-8 py-3 rounded-[8px] font-inter font-semibold text-[16px] text-[#3a3a3a] tracking-[-0.16px] leading-[20px] hover:shadow-lg transition-all duration-200">
              About Me
            </button>
          </div>
        </div>

      </div>
      </div>
    </section>
  );
};

export default FoundersByFounders;

