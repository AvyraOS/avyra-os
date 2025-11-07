"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);

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
        // Hide navbar when scrolling down
        else if (currentScrollY > lastScrollY && currentScrollY > 100) {
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
  }, [lastScrollY]);

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
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-[271px] bg-[#070707] rounded-[20px] shadow-[inset_0px_2px_1px_0px_rgba(207,231,255,0.20)] overflow-hidden z-50 py-4">
                    {/* Light overlay */}
                    <div className="absolute inset-0 opacity-10 bg-gradient-radial from-[#b8c7d9]/50 via-[#b8c7d9]/25 to-transparent" style={{
                      background: 'radial-gradient(at 94% 8%, rgba(184, 199, 217, 0.5) 0%, rgba(184, 199, 217, 0) 100%)'
                    }} />
                    
                    {/* Border */}
                    <div className="absolute inset-0 rounded-[20px] border border-[#d8e7f2]/5" />
                    
                    {/* Menu Items Container */}
                    <div className="relative z-10 px-[30px] space-y-2">
                      {/* Avyra AI */}
                      <Link 
                        href="https://www.avyra.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative block py-2 text-white text-lg font-normal font-inter leading-6 hover:text-white transition-colors duration-200"
                        onClick={closeSolutionsDropdown}
                      >
                        {/* Hover background with white/gray tint */}
                        <div className="absolute inset-0 -mx-3 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        <span className="relative z-10">Avyra AI</span>
                      </Link>
                      
                      {/* Avyra Studio */}
                      <Link 
                        href="https://www.avyra.studio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative block py-2 text-white text-lg font-normal font-inter leading-6 hover:text-white transition-colors duration-200"
                        onClick={closeSolutionsDropdown}
                      >
                        {/* Hover background with white/gray tint */}
                        <div className="absolute inset-0 -mx-3 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        <span className="relative z-10">Avyra Studio</span>
                      </Link>
                      
                      {/* Avyra Command - Not clickable */}
                      <div className="relative flex items-center justify-between py-2">
                        <span className="text-white/50 text-lg font-normal font-inter leading-6">Avyra Command</span>
                        <span className="px-1.5 py-[3px] bg-[#363636] rounded-[42px] text-white text-[8px] font-normal font-inter">Coming Soon</span>
                      </div>
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
                href="/newsletter" 
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
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar; 