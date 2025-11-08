"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Check if form is valid for golden button state
  const isFormValid = isValidEmail(email) && agreedToPrivacy;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !agreedToPrivacy) return;
    
    setIsSubmitting(true);
    // Handle newsletter submission here
    console.log('Newsletter signup:', { email, agreedToPrivacy });
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      setAgreedToPrivacy(false);
    }, 1000);
  };

  return (
    <footer className="relative w-full bg-[#080808] pt-16 md:pt-18 lg:pt-20 pb-8 overflow-hidden">
      {/* Footer Background Image - Full Section */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src="/images/footer-background-image.png"
          alt=""
          fill
          className="object-cover opacity-50"
        />
      </div>

      {/* Container */}
      <div className="container mx-auto px-4 relative z-10 max-w-[1200px]">
        
        {/* Main Content */}
        <div className="text-center mb-16 lg:mb-20">
          
          {/* Pill */}
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-[24px] bg-[#1b1c20]">
              {/* Gradient dot */}
              <div className="w-[6.9px] h-[6.9px] rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#3B3B3B] shadow-[0px_1.15px_18.4px_0px_inset_rgba(255,255,255,0.12),0px_1.15px_1.15px_0px_inset_rgba(255,255,255,0.09)]"></div>
              <span className="font-inter font-medium text-[14px] leading-[22px] tracking-[-0.14px] pill-text-gradient uppercase">
                FREE INSTANT PLAN IN 3 MINUTES
              </span>
            </div>
          </div>

          {/* Main Title */}
          <div className="mb-6">
            <h2 
              className="text-center text-[32px] sm:text-[40px] lg:text-[44px] leading-[40px] sm:leading-[48px] lg:leading-[52.8px]"
              style={{
                background: 'radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #A1A6B0 46.29%, #878C95 55.24%, #6D717A 64.19%, #52575E 73.15%, #384043 82.10%, #1E2228 91.05%, #11141B 95.52%, #04070D 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              <span 
                style={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '500'
                }}
              >
                See How {' '}
              </span>
              <span className="font-instrument-serif italic font-normal">
                Free Your Business
              </span>
              <br />
              <span 
                style={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '500'
                }}
              >
                Really Is
              </span>
            </h2>
          </div>

          {/* Subtitle */}
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-[#d5dbe6] text-[16px] leading-[25.6px] tracking-[-0.32px]">
              It&apos;s time to scale on autopilot and reclaim your freedom.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
            {/* Start Free Trial Button - Hero Style */}
            <div className="relative inline-block group">
              {/* Button Background Container with Glow */}
              <div 
                className="relative z-10 p-[2px] rounded-lg h-[50px] overflow-hidden"
                style={{
                  background: "radial-gradient(50% 20.7% at 50% 100%, #ffffff 0%, rgba(255, 225, 198, 0.00) 100%)"
                }}
              >
                {/* Button (Top Layer) */}
                <Link 
                  href="/intake" 
                  className="relative z-50 inline-flex items-center justify-center bg-[#f8f9fa] text-[#000000] px-8 rounded-lg text-base font-medium font-inter transition-all duration-300 hover:opacity-90 cursor-pointer h-[46px]"
                >
                  <span>Start my free assessment</span>
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
            {/* <button className="bg-[rgba(255,255,255,0.1)] text-white px-6 py-2.5 rounded-[10px] font-semibold text-[16px] leading-[24px] tracking-[-0.18px] hover:bg-[rgba(255,255,255,0.15)] transition-colors">
              View Pricing
            </button> */}
          </div>

          {/* Client Avatars */}
          <div className="flex justify-center mb-4">
            <Image
              src="/images/avatargroup.png"
              alt="Customer avatars"
              width={200}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent mb-12" />

        {/* Bottom Section - Desktop: Logo Left, Newsletter Right | Mobile: Newsletter first, Social second */}
        <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:justify-between lg:text-left gap-6 lg:gap-8 mb-8">
          
          {/* Left Side - Desktop: Logo & Copyright | Mobile: Hidden (Newsletter comes first) */}
          <div className="hidden lg:flex flex-col items-start lg:order-1">
            {/* Avyra Logo */}
            <div className="mb-4">
              <Image
                src="/images/avyra-nav-logo.svg"
                alt="Avyra Logo"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </div>
            
            {/* Copyright */}
            <p className="text-[#a6a6a6] text-[12px] leading-[20px] tracking-[-0.16px] mb-4">
              @2025 Avyra OS, All rights reserved.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/company/avyra-ai/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.08)] transition-all duration-300 group"
              >
                <Image
                  src="/icons/linkedin-logo.svg"
                  alt="LinkedIn"
                  width={26}
                  height={26}
                  className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                />
              </a>
              
              {/* X (Twitter) */}
              <a 
                href="https://x.com/AvyraAI" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.08)] transition-all duration-300 group"
              >
                <Image
                  src="/icons/x.svg"
                  alt="X"
                  width={22}
                  height={22}
                  className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                />
              </a>
              
              {/* YouTube */}
              <a 
                href="https://www.youtube.com/@AvyraAI" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.08)] transition-all duration-300 group"
              >
                <Image
                  src="/icons/YouTube.svg"
                  alt="YouTube"
                  width={22}
                  height={22}
                  className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                />
              </a>
              
              {/* Skool */}
              <a 
                href="https://www.skool.com/avyra-5957/about?ref=62d9cf87b0794ed0aee7b54a40d9f199" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.08)] transition-all duration-300 group"
              >
                <Image
                  src="/icons/Skool.svg"
                  alt="Skool"
                  width={22}
                  height={22}
                  className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                />
              </a>
            </div>
          </div>

          {/* Right Side - Desktop: Newsletter | Mobile: Newsletter first, then social */}
          <div className="flex flex-col items-center lg:items-start max-w-md w-full lg:order-2">
            {/* Newsletter Description */}
            <div className="text-center lg:text-left mb-6">
              <p className="text-[#d5dbe6] text-[12px] sm:text-[15px] lg:text-[16px] leading-[22px] sm:leading-[28px] lg:leading-[33.6px] tracking-[-0.28px]">
                Get <span className="font-bold">weekly</span> insights on Freedom Founder Systems
              </p>
            </div>

            {/* Newsletter Form */}
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              {/* Email Input */}
              <div className="relative">
                <div className="bg-[rgba(255,255,255,0.05)] rounded-xl p-1 transition-all duration-300 focus-within:bg-[rgba(255,255,255,0.08)]">
                  <div className="bg-[#080808] rounded-[10px] relative flex items-center">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 bg-transparent text-white text-[14px] font-medium px-[22px] py-[19px] placeholder-white outline-none focus:outline-none focus:ring-0 focus:border-0 focus:placeholder-opacity-70 transition-all duration-300 border-0 email-input-no-autofill"
                      required
                      style={{ 
                        boxShadow: 'none !important',
                        outline: 'none !important',
                        border: 'none !important',
                        WebkitAppearance: 'none',
                        MozAppearance: 'textfield',
                        WebkitTapHighlightColor: 'transparent',
                        // Autocomplete styling overrides
                        WebkitTextFillColor: 'white !important',
                        caretColor: 'white'
                      } as React.CSSProperties}
                      onFocus={(e) => {
                        const target = e.target as HTMLInputElement;
                        target.style.outline = 'none';
                        target.style.border = 'none';
                        target.style.boxShadow = 'none';
                      }}
                      onClick={(e) => {
                        const target = e.target as HTMLInputElement;
                        target.style.outline = 'none';
                        target.style.border = 'none';
                        target.style.boxShadow = 'none';
                      }}
                      onBlur={(e) => {
                        const target = e.target as HTMLInputElement;
                        target.style.outline = 'none';
                        target.style.border = 'none';
                        target.style.boxShadow = 'none';
                      }}
                      autoComplete="email"
                    />
                    <button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className={`rounded-[9px] w-[42px] h-[42px] mr-[9px] flex items-center justify-center transition-all duration-300 ${
                        isFormValid && !isSubmitting
                          ? 'bg-gradient-to-b from-[#FFFFFF] to-[#E0E0E0] hover:opacity-90 cursor-pointer shadow-md'
                          : 'bg-[rgba(217,217,217,0.05)] hover:bg-[#e9ecef] disabled:opacity-50 disabled:cursor-not-allowed'
                      }`}
                    >
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path 
                          fillRule="evenodd" 
                          clipRule="evenodd" 
                          d="M10.293 5.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 12H4a1 1 0 110-2h10.586l-4.293-4.293a1 1 0 010-1.414z" 
                          fill={isFormValid && !isSubmitting ? "#000000" : "#666666"}
                          className="transition-colors duration-300"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Privacy Checkbox */}
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="privacy-checkbox"
                    checked={agreedToPrivacy}
                    onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                    className="sr-only"
                  />
                  <div 
                    onClick={() => setAgreedToPrivacy(!agreedToPrivacy)}
                    className={`w-[19px] h-[19px] rounded bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] cursor-pointer flex items-center justify-center ${
                      agreedToPrivacy ? 'bg-[rgba(255,255,255,0.1)]' : ''
                    }`}
                  >
                    {agreedToPrivacy && (
                      <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                        <path d="M1 4.5L4.5 8L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </div>
                <label htmlFor="privacy-checkbox" className="text-[#d5dbe6] text-[12px] leading-[20px] tracking-[-0.32px] cursor-pointer">
                  I confirm that I have read <span className="text-white font-bold">Avyra&apos;s Privacy Policy</span>
                </label>
              </div>
            </form>
          </div>

          {/* Mobile Only - Social Icons (when desktop logo section is hidden) */}
          <div className="flex lg:hidden items-center justify-center gap-3">
            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/company/avyra-ai/" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.2)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.08)] transition-all duration-300 group"
            >
              <Image
                src="/icons/linkedin-logo.svg"
                alt="LinkedIn"
                width={20}
                height={20}
                className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              />
            </a>
            
            {/* X (Twitter) */}
            <a 
              href="https://x.com/AvyraAI" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.2)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.08)] transition-all duration-300 group"
            >
              <Image
                src="/icons/x.svg"
                alt="X"
                width={16}
                height={16}
                className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              />
            </a>
            
            {/* YouTube */}
            <a 
              href="https://www.youtube.com/@AvyraAI" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.2)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.08)] transition-all duration-300 group"
            >
              <Image
                src="/icons/YouTube.svg"
                alt="YouTube"
                width={16}
                height={16}
                className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              />
            </a>
            
            {/* Skool */}
            <a 
              href="https://www.skool.com/avyra-5957/about?ref=62d9cf87b0794ed0aee7b54a40d9f199" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.2)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.08)] transition-all duration-300 group"
            >
              <Image
                src="/icons/Skool.svg"
                alt="Skool"
                width={16}
                height={16}
                className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              />
            </a>
          </div>
        </div>

        {/* Large Background SVG - Separate section below main content */}
        <div className="text-center relative mt-8">
          
          <div 
            className="relative pointer-events-none flex items-center justify-center"
          >
            <Image
              src="/images/footer-avyra.svg"
              alt="AVYRA"
              width={1332}
              height={288}
              className="w-auto h-full object-contain pointer-events-none"
              style={{
                filter: 'url(#footerGradient)'
              }}
            />
            
            {/* SVG Filter Definition */}
            <svg width="0" height="0" className="absolute">
              <defs>
                <linearGradient id="footerGradient" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="#D5DBE6" stopOpacity="0.3" />
                  <stop offset="28.39%" stopColor="#D5DBE6" stopOpacity="0.25" />
                  <stop offset="46.29%" stopColor="#A1A6B0" stopOpacity="0.2" />
                  <stop offset="55.24%" stopColor="#878C95" stopOpacity="0.18" />
                  <stop offset="64.19%" stopColor="#6D717A" stopOpacity="0.15" />
                  <stop offset="73.15%" stopColor="#52575E" stopOpacity="0.12" />
                  <stop offset="82.10%" stopColor="#384043" stopOpacity="0.1" />
                  <stop offset="91.05%" stopColor="#1E2228" stopOpacity="0.08" />
                  <stop offset="95.52%" stopColor="#11141B" stopOpacity="0.06" />
                  <stop offset="100%" stopColor="#04070D" stopOpacity="0.05" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Custom CSS to prevent all autofill/autocomplete styling */}
      <style jsx>{`
        .email-input-no-autofill:-webkit-autofill,
        .email-input-no-autofill:-webkit-autofill:hover,
        .email-input-no-autofill:-webkit-autofill:focus,
        .email-input-no-autofill:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
          -webkit-text-fill-color: white !important;
          background-color: transparent !important;
          background-image: none !important;
          box-shadow: none !important;
          border: none !important;
          outline: none !important;
          transition: background-color 5000s ease-in-out 0s;
        }
        
        .email-input-no-autofill:focus,
        .email-input-no-autofill:active,
        .email-input-no-autofill:hover {
          box-shadow: none !important;
          border: none !important;
          outline: none !important;
          background-color: transparent !important;
        }

        /* Override any browser-specific focus styles */
        input[type="email"]:focus {
          box-shadow: none !important;
          border: none !important;
          outline: none !important;
        }

        /* Prevent autocomplete dropdown styling issues */
        input[type="email"]::-webkit-contacts-auto-fill-button {
          visibility: hidden;
          display: none !important;
          pointer-events: none;
          height: 0;
          width: 0;
          margin: 0;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
