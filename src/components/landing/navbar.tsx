"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : '';
  };

  // Clean up body overflow when component unmounts or menu closes
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setSolutionsDropdownOpen(false); // Close dropdown when mobile menu closes
    document.body.style.overflow = '';
  };

  // Handle solutions dropdown
  const toggleSolutionsDropdown = () => {
    setSolutionsDropdownOpen(!solutionsDropdownOpen);
  };

  const closeSolutionsDropdown = () => {
    setSolutionsDropdownOpen(false);
  };

  // Handle scroll behavior for sticky navbar
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Update scroll position for background opacity
      setScrollY(currentScrollY);
      
      // Check if we're on mobile (less than lg breakpoint)
      const isMobile = window.innerWidth < 1024;
      
      if (isMobile) {
        // On mobile, only show navbar in the hero section to prevent scroll issues
        if (currentScrollY < window.innerHeight * 0.8) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        // Desktop behavior: Show navbar when scrolling up or at the top
        if (currentScrollY < lastScrollY || currentScrollY < 10) {
          setIsVisible(true);
        } 
        // Hide navbar when scrolling down (but not if mobile menu is open)
        else if (currentScrollY > lastScrollY && currentScrollY > 100 && !mobileMenuOpen) {
          setIsVisible(false);
          setSolutionsDropdownOpen(false); // Close dropdown when navbar hides
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY, mobileMenuOpen]);

  // Close dropdown when clicking outside (desktop only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (solutionsDropdownOpen && !target.closest('.solutions-dropdown-container') && window.innerWidth >= 1024) {
        closeSolutionsDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [solutionsDropdownOpen]);

  return (
    <>
      {/* Main Navigation Bar - Hidden on mobile, fixed on desktop */}
      <nav className={`hidden lg:block lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:z-40 lg:transition-transform lg:duration-300 lg:ease-in-out ${
        isVisible ? 'lg:translate-y-0' : 'lg:-translate-y-full'
      }`}>
        {/* Glass Background Container */}
        <div 
          className="w-full max-w-[1350px] h-[70px] md:h-[98px] mx-auto transition-all duration-300 ease-in-out"
          style={{
            borderRadius: '0 0 24px 24px',
            background: (scrollY > 50 && isVisible) ? `rgba(0, 0, 0, ${Math.min(0.5, (scrollY - 50) / 150)})` : 'transparent',
            backdropFilter: (scrollY > 50 && isVisible) ? `blur(${Math.min(44.7, ((scrollY - 50) / 150) * 44.7)}px)` : 'none',
            WebkitBackdropFilter: (scrollY > 50 && isVisible) ? `blur(${Math.min(44.7, ((scrollY - 50) / 150) * 44.7)}px)` : 'none'
          }}
        >
          <div className="h-full flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              {/* Mobile Logo - Brandmark */}
              <Image 
                src="/images/avyra-brandmark.svg" 
                alt="Avyra Logo" 
                width={32}
                height={32}
                className="h-8 w-8 lg:hidden"
              />
              {/* Desktop Logo - Full Logo */}
              <Image 
                src="/images/avyra-nav-logo.svg" 
                alt="Avyra Logo" 
                width={120}
                height={32}
                className="h-8 w-auto hidden lg:block"
              />
            </Link>

            {/* Desktop Navigation Links - Centered */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 absolute left-1/2 transform -translate-x-1/2">
              {/* Solutions Dropdown */}
              <div className="relative solutions-dropdown-container">
                <button
                  onClick={toggleSolutionsDropdown}
                  className="flex items-center text-[#d5dbe6] text-base font-normal font-inter leading-relaxed hover:text-white transition-colors duration-200 whitespace-nowrap"
                >
                  Solutions
                  <svg 
                    className={`ml-1 w-4 h-4 transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {solutionsDropdownOpen && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[271px] h-[156px] bg-[#070707] rounded-[20px] shadow-[inset_0px_2px_1px_0px_rgba(207,231,255,0.20)] overflow-hidden z-50">
                    {/* Light overlay */}
                    <div className="absolute inset-0 opacity-10 bg-gradient-radial from-[#b8c7d9]/50 via-[#b8c7d9]/25 to-transparent" style={{
                      background: 'radial-gradient(at 94% 8%, rgba(184, 199, 217, 0.5) 0%, rgba(184, 199, 217, 0) 100%)'
                    }} />
                    
                    {/* Border */}
                    <div className="absolute inset-0 rounded-[20px] border border-[#d8e7f2]/5" />
                    
                    {/* Avyra Studio - Clickable with turquoise hover */}
                    <Link 
                      href="https://www.avyra.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group absolute left-[30px] top-[24px] text-white/100 text-lg font-normal font-inter leading-6 hover:text-[#00D7D7] transition-colors duration-200"
                      onClick={closeSolutionsDropdown}
                    >
                      {/* Hover background with turquoise tint */}
                      <div className="absolute -left-[12px] -top-[8px] w-[235px] h-10 bg-[#00D7D7]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      <span className="relative z-10">Avyra AI</span>
                    </Link>
                    
                    {/* Avyra OS - Not clickable */}
                    <div className="absolute left-[30px] top-[66px] text-white/70 text-lg font-normal font-inter leading-6">
                      Avyra OS
                    </div>
                    <div className="absolute left-[186px] top-[70px] px-1.5 py-[3px] bg-[#363636] rounded-[42px] flex justify-center items-center">
                      <div className="text-white text-[8px] font-normal font-inter">Coming Soon</div>
                    </div>
                    
                    {/* Avyra Command - Not clickable */}
                    <div className="absolute left-[30px] top-[108px] text-white/70 text-lg font-normal font-inter leading-6">
                      Avyra Command
                    </div>
                    <div className="absolute left-[186px] top-[112px] px-1.5 py-[3px] bg-[#363636] rounded-[42px] flex justify-center items-center">
                      <div className="text-white text-[8px] font-normal font-inter">Coming Soon</div>
                    </div>
                  </div>
                )}
              </div>
              <Link 
                href="#resources" 
                className="text-[#d5dbe6] text-base font-normal font-inter leading-relaxed hover:text-white transition-colors duration-200 whitespace-nowrap"
              >
                Resources
              </Link>
              <Link 
                href="#newsletter" 
                className="text-[#d5dbe6] text-base font-normal font-inter leading-relaxed hover:text-white transition-colors duration-200 whitespace-nowrap"
              >
                Newsletter
              </Link>
              <Link 
                href="#community" 
                className="text-[#d5dbe6] text-base font-normal font-inter leading-relaxed hover:text-white transition-colors duration-200 whitespace-nowrap"
              >
                Community
              </Link>
            </div>

            {/* Get Started Button - Only show on large screens */}
            <Link href="/calendar" className="hidden lg:block group">
              <div className="inline-flex h-10 relative rounded-[100px] shadow-[inset_0px_0px_8px_0px_rgba(248,248,248,0.25),0px_32px_24px_-16px_rgba(0,0,0,0.40)] border-[1.5px] border-[#484848] overflow-hidden justify-center items-center p-1 transition-all duration-300">
                <div className="inline-flex h-8 bg-gradient-to-b from-[rgba(18,18,18,0.30)] to-[rgba(18,18,18,0.30)] bg-[rgba(248,248,248,0.01)] rounded-[100px] border-[1.5px] border-[#242424] backdrop-blur-[6px] overflow-hidden items-center justify-center px-6 transition-all duration-300 group-hover:shadow-[inset_0px_0px_20px_0px_rgba(255,255,255,0.1),inset_0px_0px_12px_0px_rgba(255,255,255,0.15),inset_0px_0px_6px_0px_rgba(255,255,255,0.2)] group-hover:border-white/20">
                  <div className="text-[#f8f8f8]/95 text-sm font-normal font-inter leading-tight transition-colors duration-300 group-hover:text-white whitespace-nowrap">Book Call</div>
                </div>
              </div>
            </Link>

            {/* Mobile Menu Hamburger Button - Show on medium and smaller screens */}
            <button 
              className="lg:hidden w-6 h-6 flex flex-col justify-center space-y-1 z-50 relative"
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
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu Slide Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full bg-[#0F0F0F] z-40 lg:hidden transition-transform duration-300 ease-in-out ${
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
            <div className="text-white/40 text-sm font-medium font-inter uppercase tracking-wider">
              Solutions
            </div>
            
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
            
            {/* Avyra Command */}
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <span className="text-white/50 text-2xl font-normal font-inter">Avyra Command</span>
              <span className="px-3 py-1 bg-[#363636] rounded-full text-white text-xs">Coming Soon</span>
            </div>
            <Link 
              href="#resources" 
              className="text-white text-2xl font-normal font-inter py-3 border-b border-white/5 hover:text-[#00D7D7] transition-colors"
              onClick={closeMobileMenu}
            >
              Resources
            </Link>
            <Link 
              href="#newsletter" 
              className="text-white text-2xl font-normal font-inter py-3 border-b border-white/5 hover:text-[#00D7D7] transition-colors"
              onClick={closeMobileMenu}
            >
              Newsletter
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
                    background: "radial-gradient(50% 20.7% at 50% 100%, #C6FFFF 0%, rgba(198, 255, 255, 0.00) 100%)"
                  }}
                >
                  {/* Button Content */}
                  <div className="w-full h-full bg-gradient-to-b from-[#89FFFF] to-[#00D7D7] text-[#000000] rounded-lg flex items-center justify-center text-base font-medium font-inter transition-all duration-300 hover:opacity-90">
                    <span>Book Call</span>
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
    </>
  );
};

export default Navbar; 