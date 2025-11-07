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
                  <div className="absolute top-full left-[-48px] mt-4 w-[625px] h-[279px] bg-[rgba(8,8,8,0.85)] backdrop-blur-xl rounded-[24px] border border-[#46474e] z-50 flex">
                    {/* Left Column - Solutions */}
                    <div className="flex-1 px-8 py-8 flex flex-col gap-4">
                      <p className="text-[#d9d9d9] text-[12px] font-medium font-inter tracking-[0.5px] uppercase">
                        Solutions
                      </p>
                      
                      <div className="flex flex-col gap-5">
                        {/* AI Automations */}
                        <Link 
                          href="https://www.avyra.ai"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col gap-0.5"
                          onClick={closeSolutionsDropdown}
                        >
                          <div className="flex items-center gap-4 h-6">
                            <div className="w-5 h-5 relative flex-shrink-0">
                              <Image 
                                src="/icons/ai-solutions.svg" 
                                alt="AI Automations"
                                width={20}
                                height={20}
                              />
                            </div>
                            <p className="text-[#c6c6c6] text-[16px] font-medium font-inter leading-6 group-hover:text-white transition-colors duration-200">
                              AI Automations
                            </p>
                          </div>
                          <div className="pl-9">
                            <p className="text-[#4a4a4a] text-[14px] font-normal font-inter leading-6 group-hover:text-[#5a5a5a] transition-colors duration-200">
                              Automate your business
                            </p>
                          </div>
                        </Link>

                        {/* Studio */}
                        <Link 
                          href="https://www.avyra.studio"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col gap-0.5"
                          onClick={closeSolutionsDropdown}
                        >
                          <div className="flex items-center gap-4 h-6">
                            <div className="w-5 h-5 relative flex-shrink-0">
                              <Image 
                                src="/icons/studio-solutions.svg" 
                                alt="Studio"
                                width={20}
                                height={20}
                              />
                            </div>
                            <p className="text-[#c7c7c7] text-[16px] font-medium font-inter leading-6 group-hover:text-white transition-colors duration-200">
                              Studio
                            </p>
                          </div>
                          <div className="pl-9">
                            <p className="text-[#4a4a4a] text-[14px] font-normal font-inter leading-6 group-hover:text-[#5a5a5a] transition-colors duration-200">
                              Build your business
                            </p>
                          </div>
                        </Link>

                        {/* SaaS Product - Coming Soon */}
                        <div className="flex flex-col gap-0.5 opacity-60">
                          <div className="flex items-center gap-4 h-6">
                            <div className="w-5 h-5 relative flex-shrink-0">
                              <Image 
                                src="/icons/saas-solutions.svg" 
                                alt="SaaS Product"
                                width={20}
                                height={20}
                              />
                            </div>
                            <p className="text-[#c5c5c5] text-[16px] font-medium font-inter leading-6">
                              SaaS Product{' '}
                              <span className="text-[9px] text-[rgba(197,197,197,0.4)]">(Coming Soon)</span>
                            </p>
                          </div>
                          <div className="pl-9">
                            <p className="text-[#4a4a4a] text-[14px] font-normal font-inter leading-6">
                              Measure business health
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Founder Freedom Kit */}
                    <div className="w-[280px] h-full bg-[rgba(0,0,0,0.7)] rounded-r-[23px] px-8 py-8 flex flex-col gap-4">
                      <p className="text-[#9b9b9b] text-[12px] font-normal font-inter tracking-[0.5px] uppercase">
                        Founder freedom kit
                      </p>
                      
                      {/* Preview Image */}
                      <div className="w-[215px] h-[94px] bg-[#565656] rounded-[7px]"></div>
                      
                      {/* Checklist */}
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 relative flex-shrink-0">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 1.6C4.464 1.6 1.6 4.464 1.6 8C1.6 11.536 4.464 14.4 8 14.4C11.536 14.4 14.4 11.536 14.4 8C14.4 4.464 11.536 1.6 8 1.6ZM6.8 11.2L3.2 7.6L4.256 6.544L6.8 9.08L11.744 4.136L12.8 5.2L6.8 11.2Z" fill="#919191"/>
                            </svg>
                          </div>
                          <p className="text-[#727272] text-[14px] font-normal font-inter leading-6">
                            Freedom Founder Blueprint
                          </p>
                        </div>
                        <Link 
                          href="/intake"
                          className="flex items-center gap-2 group"
                          onClick={closeSolutionsDropdown}
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 1.6C4.464 1.6 1.6 4.464 1.6 8C1.6 11.536 4.464 14.4 8 14.4C11.536 14.4 14.4 11.536 14.4 8C14.4 4.464 11.536 1.6 8 1.6ZM6.8 11.2L3.2 7.6L4.256 6.544L6.8 9.08L11.744 4.136L12.8 5.2L6.8 11.2Z" fill="#919191"/>
                            </svg>
                          <p className="text-[#727272] text-[14px] font-normal font-inter leading-6 group-hover:text-[#9b9b9b] transition-colors duration-200">
                            Access Blueprint
                          </p>
                          <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 16 16" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            className="flex-shrink-0"
                          >
                            <path 
                              d="M8.5 3L13.5 8L8.5 13M13 8H3" 
                              stroke="#727272" 
                              strokeWidth="1.5" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                              className="group-hover:stroke-[#9b9b9b] transition-colors duration-200"
                            />
                          </svg>
                        </Link>
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
                href="https://www.skool.com/avyra-5957/about?ref=62d9cf87b0794ed0aee7b54a40d9f199" 
                target="_blank"
                rel="noopener noreferrer"
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