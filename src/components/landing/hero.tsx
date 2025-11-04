"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  const logosRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : '';
  };

  // Clean up body overflow when component unmounts or menu closes
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Check if mobile for targeted logging
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      console.log('🔍 MOBILE: Hero component initializing');
    }

    // Hero content fade-in animation
    const heroTl = gsap.timeline();
    heroTl.to(".hero-main-content", {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        if (isMobile) console.log('✅ GSAP: Hero fade animation complete');
      }
    });

    // Client logos animation
    const initClientLogos = () => {
      const clientsContainer = logosRef.current?.querySelector('.clients-container');
      if (!clientsContainer) {
        if (isMobile) console.log('⚠️ LOGOS: Container not found');
        return;
      }
      if (isMobile) console.log('🎬 LOGOS: Starting client logos animation');

      // Set initial state of container and images
      const prepareLogos = () => {
        // Ensure the container is wide enough
        gsap.set(clientsContainer, { width: '400%', height: '100%' });

        // Update logo positions
        const updateLogoPositions = () => {
          const logos = clientsContainer.querySelectorAll('img');
          logos.forEach(logo => {
            // Make sure all logos have consistent styling
            gsap.set(logo, {
              height: '100%',
              position: 'absolute',
              left: 0,
              marginRight: '42px',
              paddingRight: '42px'
            });
          });

          // Position the first logo starting from right edge
          gsap.set("#clientLogos1", { x: "0%" });

          // Position the second logo right after the first one (seamless)
          gsap.set("#clientLogos2", { x: "100%" });
        };

        // Initial setup
        updateLogoPositions();
      };

      prepareLogos();

      // Create the continuous animation with improved smoothness
      const logoTimeline = gsap.timeline({
        repeat: -1,
        ease: "none",
        onStart: () => {
          if (isMobile) console.log('🔄 LOGOS: Timeline started');
        }
      });

      logoTimeline
        .to("#clientLogos1", {
          x: "-100%",
          duration: 40,
          ease: "linear",
          force3D: true
        })
        .to("#clientLogos2", {
          x: "0%",
          duration: 40,
          ease: "linear",
          force3D: true
        }, "<") // Start at the same time
        .to("#clientLogos1", {
          x: "100%",
          duration: 0
        })
        .to("#clientLogos2", {
          x: "-100%",
          duration: 40,
          ease: "linear",
          force3D: true
        })
        .to("#clientLogos1", {
          x: "0%",
          duration: 40,
          ease: "linear",
          force3D: true
        }, "<");
    };

    // Initialize logo animation with a small delay to ensure DOM is ready
    setTimeout(() => {
      if (isMobile) console.log('⏰ LOGOS: Initializing after 100ms delay');
      initClientLogos();
    }, 100);

    // Add scroll performance monitoring on mobile
    if (isMobile) {
      let scrollBlocked = false;
      let lastScrollY = 0;
      
      const detectScrollIssues = () => {
        const currentScrollY = window.scrollY;
        
        // Detect if scroll position hasn't changed (potential blocking)
        if (Math.abs(currentScrollY - lastScrollY) < 1 && currentScrollY > 0) {
          if (!scrollBlocked) {
            console.log('🚫 SCROLL: Potential blocking detected at scrollY=' + currentScrollY);
            scrollBlocked = true;
          }
        } else {
          if (scrollBlocked) {
            console.log('✅ SCROLL: Movement resumed at scrollY=' + currentScrollY);
            scrollBlocked = false;
          }
        }
        
        lastScrollY = currentScrollY;
      };
      
      const scrollMonitor = setInterval(detectScrollIssues, 100);
      
      // Clean up animations and monitoring on unmount
      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
        clearInterval(scrollMonitor);
        if (isMobile) console.log('🧹 CLEANUP: Hero animations and monitoring stopped');
      };
    }

    // Clean up animations on unmount
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="relative h-[130vh] md:h-[1558px] bg-[#080808] flex flex-col justify-center items-center overflow-hidden" id="home">
      {/* Mobile Navigation Bar - Integrated into Hero */}
      <nav className="lg:hidden absolute top-0 left-0 right-0 z-40">
        <div className="w-full h-[70px] mx-auto">
          <div className="h-full flex items-center justify-between px-4 sm:px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/avyra-brandmark.svg" 
                alt="Avyra Logo" 
                width={32}
                height={32}
                className="h-8 w-8"
              />
            </Link>

            {/* Mobile Menu Hamburger Button */}
            <button 
              className="w-6 h-6 flex flex-col justify-center space-y-1 z-50 relative"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Backdrop */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu Slide Panel */}
      <div 
        className={`lg:hidden fixed top-0 right-0 h-full w-full bg-[#0F0F0F] z-40 transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile Menu Content */}
        <div className="flex flex-col h-full">
          
          {/* Header with Logo and Close */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Link href="/" onClick={closeMobileMenu}>
              <Image 
                src="/images/avyra-nav-logo.svg" 
                alt="Avyra Logo" 
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <button 
              onClick={closeMobileMenu}
              className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-center px-6 space-y-6">
            {/* Solutions Section Header */}
            {/* <div className="text-white/40 text-sm font-medium font-inter uppercase tracking-wider">
              Solutions
            </div> */}
            
            {/* Avyra AI */}
            <Link 
              href="https://www.avyra.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl font-normal font-inter py-3 border-b border-white/5 hover:text-[#00D7D7] transition-colors"
              onClick={closeMobileMenu}
            >
              Avyra AI
            </Link>
            
            {/* Avyra OS */}
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <span className="text-white/50 text-2xl font-normal font-inter">Avyra OS</span>
              <span className="px-3 py-1 bg-[#363636] rounded-full text-white text-xs">Coming Soon</span>
            </div>

            <Link 
              href="#work" 
              className="text-white text-2xl font-normal font-inter py-3 border-b border-white/5 hover:text-[#00D7D7] transition-colors"
              onClick={closeMobileMenu}
            >
              Work
            </Link>
            
            {/* Avyra Command */}
            {/* <div className="flex items-center justify-between py-3 border-b border-white/5">
              <span className="text-white/50 text-2xl font-normal font-inter">Avyra Command</span>
              <span className="px-3 py-1 bg-[#363636] rounded-full text-white text-xs">Coming Soon</span>
            </div>
             */}
            <Link 
              href="#pricing" 
              className="text-white text-2xl font-normal font-inter py-3 border-b border-white/5 hover:text-[#00D7D7] transition-colors"
              onClick={closeMobileMenu}
            >
              Pricing
            </Link>
            <Link 
              href="#blog" 
              className="text-white text-2xl font-normal font-inter py-3 border-b border-white/5 hover:text-[#00D7D7] transition-colors"
              onClick={closeMobileMenu}
            >
              Blog
            </Link>
            <Link 
              href="#community" 
              className="text-white text-2xl font-normal font-inter py-3 border-b border-white/5 hover:text-[#00D7D7] transition-colors"
              onClick={closeMobileMenu}
            >
              Community
            </Link>
          </div>

          {/* CTA Button at Bottom */}
          <div className="p-6 border-t border-white/10">
            <Link 
              href="/calendar" 
              onClick={closeMobileMenu}
              className="block w-full group"
            >
              <div className="relative w-full h-12 rounded-lg overflow-hidden">
                {/* Button Background with Glow */}
                <div 
                  className="absolute inset-0 p-[2px] rounded-lg"
                  style={{
                    background: "radial-gradient(50% 20.7% at 50% 100%, #FFFFFF 0%, rgba(255, 255, 255, 0.00) 100%)"
                  }}
                >
                  {/* Button Content */}
                  <div className="w-full h-full bg-gradient-to-b from-[#FFFFFF] to-[#F3F3F3] text-[#000000] rounded-lg flex items-center justify-center text-base font-medium font-inter transition-all duration-300 hover:opacity-90">
                    <span>Free Assessment</span>
                    <svg 
                      className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Level: Background Gradients */}
      <div className="absolute inset-0 z-0">
        {/* Top Gradient - native CSS version, hanging off top */}
        <div className="TopGradientBg absolute -top-[241px] left-1/2 transform -translate-x-1/2 w-[381.01px] h-[382px] opacity-40 rounded-br-md blur-[132.70px]"
          style={{
            background: "radial-gradient(circle, #f3f3f3 0%, rgba(255,255,255,0.6) 62%, rgba(255,255,255,0.1) 100%)"
          }} />
        {/* Bottom Gradient - native CSS version, hanging off bottom */}
        <div className="BottomGradientBg absolute -bottom-[241px] left-1/2 transform -translate-x-1/2 w-[481.01px] h-[342px] opacity-40 rounded-tl-md blur-[132.70px]"
          style={{
            background: "radial-gradient(circle, #f3f3f3 0%, #ffffff 42%, rgba(255,255,255,0.1) 100%)"
          }} />

        {/* Client Logos Animation - At background level */}
        <div className="absolute bottom-[80px] md:bottom-[110px] left-1/2 transform -translate-x-1/2 w-full -z-10">
          <div className="w-full flex justify-center relative">
            {/* Solid background blockers on left and right */}
            <div className="absolute left-0 top-0 w-[15%] h-[50px] sm:h-[65px] md:h-[80px] bg-[#080808] z-[20]"></div>
            <div className="absolute right-0 top-0 w-[15%] h-[50px] sm:h-[65px] md:h-[80px] bg-[#080808] z-[20]"></div>

            <div ref={logosRef} className="w-[85%] relative overflow-hidden opacity-80">
              <div className="clients overflow-hidden w-full h-[50px] sm:h-[65px] md:h-[80px] relative flex justify-center items-center before:content-[''] before:absolute before:top-0 before:left-0 before:w-[20%] before:h-full before:z-[10] before:pointer-events-none before:bg-gradient-to-r before:from-[#080808] before:from-0% before:via-[#080808] before:via-70% before:to-transparent before:to-100% after:content-[''] after:absolute after:top-0 after:right-0 after:w-[20%] after:h-full after:z-[10] after:pointer-events-none after:bg-gradient-to-l after:from-[#080808] after:from-0% after:via-[#080808] after:via-70% after:to-transparent after:to-100%">
                <div className="clients-container relative w-full h-full overflow-hidden flex items-center">
                  <Image
                    src="/icons/client_logos.svg"
                    alt="Client logos"
                    width={2000}
                    height={100}
                    id="clientLogos1"
                    className="client-logos h-full absolute will-change-transform left-0 mr-[42px] pr-[42px] max-w-none opacity-70"
                    priority
                  />
                  <Image
                    src="/icons/client_logos.svg"
                    alt="Client logos"
                    width={2000}
                    height={100}
                    id="clientLogos2"
                    className="client-logos h-full absolute will-change-transform left-0 mr-[42px] pr-[42px] max-w-none opacity-70"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Top Gradient - Above content including pill, below CTAs/Nav */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Image
          src="/images/hero-top-gradient.png"
          alt=""
          width={1920}
          height={600}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Top Pill - Separate layer behind gradient */}
      <div className="absolute top-[88px] md:top-[17vh] left-1/2 transform -translate-x-1/2 z-10 text-center px-4 w-full">
        <div className="mb-3 sm:mb-4 md:mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[24px] bg-[#1b1c20]">
            {/* Gradient dot */}
            <div className="w-[6.9px] h-[6.9px] rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#3B3B3B]"></div>
            <span
              className="font-inter font-medium text-[14px] leading-[22px] tracking-[-0.14px] pill-text-gradient"
            >
              YOUR OPERATING SYSTEM FOR GROWTH
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Layer - positioned with better spacing below pill */}
      <div className="absolute top-[138px] md:top-[calc(16vh+70px)] left-1/2 transform -translate-x-1/2 z-30 text-center px-4 w-full max-w-[1440px]">

        {/* Hero content */}
        <div className="text-center opacity-0 hero-main-content">
          {/* Hero Header with proper responsive design */}
          <div className="flex flex-col justify-center self-stretch mb-[1rem] sm:mb-6 md:mb-8">
            <h1
              style={{
                background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #04070D 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                fontFamily: "Inter"
              }}
              className="text-center text-[2rem] sm:text-[2.75rem] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5rem] font-medium leading-[2.25rem] sm:leading-[3rem] md:leading-[4rem] lg:leading-[5rem] xl:leading-[5.5rem] tracking-[-0.04rem] sm:tracking-[-0.055rem] md:tracking-[-0.07rem] lg:tracking-[-0.09rem] xl:tracking-[-0.11rem] capitalize max-w-full"
            >
               Feeling Trapped By<br />
               your business?
            </h1>
          </div>

          {/* Subheader with exact specs - fully responsive */}
          <p
            className="w-full max-w-[20rem] sm:max-w-[400px] md:max-w-[506px] mx-auto text-[#D5DBE6] text-center text-[1rem] sm:text-sm md:text-base font-normal font-inter leading-[1.425rem] sm:leading-[22px] md:leading-[25.6px] tracking-[-0.015rem] sm:tracking-[-0.28px] md:tracking-[-0.32px] mb-[1rem] sm:mb-6 md:mb-8 sm:px-4"
          >
            Take the quick 3 minute freedom founder assessment to see whats holding back and how to fix it.
          </p>
          {/* Button Container with Animated Border Glow */}
          <div className="relative inline-block mb-8 group">
            {/* Button Glow (Bottom Layer) - larger to show glow effect */}
            <Image
              src="/images/button-glow.png"
              alt=""
              width={400}
              height={120}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 w-[400px] h-[120px] object-contain opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
            />

            {/* Button Background Container with Moving Glow - 50px height */}
            <div
              className="relative z-10 p-[2px] rounded-lg h-[50px] overflow-hidden"
              style={{
                background: "radial-gradient(50% 20.7% at 50% 100%, #FFFFFF 0%, rgba(255, 255, 255, 0.00) 100%)"
              }}
            >
              <Link
                href="/calendar"
                className="relative z-50 inline-flex items-center justify-center bg-gradient-to-b from-[#FFFFFF] to-[#F3F3F3] text-[#000000] px-8 rounded-lg text-base font-medium font-inter transition-all duration-300 hover:opacity-90 cursor-pointer h-[46px]"
              >
                <span>Start My Free Assessment</span>
                <svg
                  className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>

          <style jsx>{`
              @keyframes moveGlow {
                0% {
                  top: -30px;
                  left: 50%;
                  transform: translateX(-50%);
                }
                12.5% {
                  top: -15px;
                  left: calc(100% - 20px);
                  transform: translateX(-50%);
                }
                25% {
                  top: 50%;
                  left: calc(100% + 20px);
                  transform: translateY(-50%);
                }
                37.5% {
                  top: calc(100% - 5px);
                  left: calc(100% - 20px);
                  transform: translateX(-50%);
                }
                50% {
                  top: calc(100% + 20px);
                  left: 50%;
                  transform: translateX(-50%);
                }
                62.5% {
                  top: calc(100% - 5px);
                  left: 20px;
                  transform: translateX(-50%);
                }
                75% {
                  top: 50%;
                  left: -30px;
                  transform: translateY(-50%);
                }
                87.5% {
                  top: -15px;
                  left: 20px;
                  transform: translateX(-50%);
                }
                100% {
                  top: -30px;
                  left: 50%;
                  transform: translateX(-50%);
                }
              }
            `}</style>

          {/* Hero Image Frame - responsive spacing below CTA button */}
          <div className="w-full relative mt-6 md:mt-[64px]">
            <Image
              src="/images/hero-image.png"
              alt="Hero dashboard interface"
              width={1600}
              height={900}
              className="w-full h-[400px] md:h-auto object-cover md:object-contain rounded-lg"
              priority
            />
          </div>
        </div>
      </div>

      {/* Social Proof Text - Fixed positioning to maintain consistent distance from bottom */}
      <div className="absolute bottom-[190px] md:bottom-[210px] left-1/2 transform -translate-x-1/2 z-30 text-center w-full max-w-[1440px]">
        <p className="text-[#D5DBE6] text-sm md:text-base font-normal font-inter opacity-60">
          Loved by 100+ companies
        </p>
      </div>
    </section>
  );
};

export default Hero; 