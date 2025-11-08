"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const MobileMenu = () => {
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

  return (
    <>
      {/* Mobile Navigation Bar - Top Bar with Logo and Hamburger - Floating - Hide when menu opens */}
      <nav className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-opacity duration-300 ${
        mobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="w-full h-[70px] mx-auto">
          <div className="h-full flex items-center justify-between px-4 sm:px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center relative z-50">
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
              <span className="block w-full h-0.5 bg-white transition-all duration-300"></span>
              <span className="block w-full h-0.5 bg-white transition-all duration-300"></span>
              <span className="block w-full h-0.5 bg-white transition-all duration-300"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Backdrop */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ${
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
            
            {/* Avyra AI */}
            <Link 
              href="https://www.avyra.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl font-normal font-inter py-3 border-b border-white/5 hover:text-[#00D7D7] transition-colors"
              onClick={closeMobileMenu}
            >
              Avyra Studio
            </Link>

            <Link 
              href="/#resources" 
              className="text-white text-2xl font-normal font-inter py-3 border-b border-white/5 hover:text-[#00D7D7] transition-colors"
              onClick={closeMobileMenu}
            >
              Resources
            </Link>
            

            <Link 
              href="/newsletter" 
              className="text-white text-2xl font-normal font-inter py-3 border-b border-white/5 hover:text-[#00D7D7] transition-colors"
              onClick={closeMobileMenu}
            >
              Newsletter
            </Link>
            
            <Link 
              href="https://www.skool.com/avyra-5957/about?ref=62d9cf87b0794ed0aee7b54a40d9f199" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl font-normal font-inter py-3 border-b border-white/5 hover:text-[#00D7D7] transition-colors"
              onClick={closeMobileMenu}
            >
              Community
            </Link>
          </div>

          {/* CTA Button at Bottom */}
          <div className="p-6 border-t border-white/10">
            <Link 
              href="/intake" 
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
    </>
  );
};

export default MobileMenu;

