'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

type Segment = 'foundation-builder' | 'system-optimizer' | 'sovereign-founder';

export default function Demo() {
  const searchParams = useSearchParams();
  // Convert capitalized segment to lowercase for internal use
  const segment = (searchParams.get('segment')?.toLowerCase() || 'foundation-builder') as Segment;
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useState<HTMLVideoElement | null>(null)[0]
  
  // Get CTA content based on segment
  const getCTAContent = () => {
    switch (segment) {
      case 'foundation-builder':
        return {
          text: 'Download Founder Freedom Blueprint',
          href: '/toolkit' // Lead magnet page
        };
      case 'system-optimizer':
        return {
          text: 'Join Free Founder\'s Circle (Skool)',
          href: 'https://www.skool.com/avyra-5957/about?ref=62d9cf87b0794ed0aee7b54a40d9f199'
        };
      case 'sovereign-founder':
        return {
          text: 'Book a Call with Chase',
          href: '/calendar' // VSL/booking page
        };
    }
  };
  
  const ctaContent = getCTAContent();

  const handlePlayClick = () => {
    setIsPlaying(true)
    const videoElement = document.querySelector('video') as HTMLVideoElement
    if (videoElement) {
      videoElement.play()
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/demo-bg.png"
          alt="Demo background"
          fill
          className="object-cover"
          priority={true}
          quality={100}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Exit Button */}
      <Link href="/" className="absolute top-[4%] right-[4%] bg-transparent border border-[#242424] rounded-full p-1.5 md:p-3 text-white text-xs md:text-lg cursor-pointer z-[2000] hover:bg-white/5 transition-colors">
        <span className="flex items-center justify-center">
          <svg 
            width="14" 
            height="14" 
            className="md:w-5 md:h-5"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </span>
      </Link>

      {/* Header Content */}
      <motion.div 
        className="relative flex flex-col gap-4 md:gap-6 items-center justify-start w-full md:max-w-4xl mx-auto px-4 md:px-0 z-10 pt-[110px] md:pt-[162px]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col gap-6 items-center justify-start relative w-full">
          {/* START SCALING Pill - Matching landing page style */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-[24px] bg-[#1b1c20]">
              {/* Gradient dot */}
              <div className="w-[6.9px] h-[6.9px] rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#3B3B3B] shadow-[0px_1.15px_18.4px_0px_inset_rgba(255,255,255,0.12),0px_1.15px_1.15px_0px_inset_rgba(255,255,255,0.09)]"></div>
              <span className="font-inter font-medium text-[14px] leading-[22px] tracking-[-0.14px] pill-text-gradient uppercase">
                START SCALING
              </span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div 
            className="flex flex-col gap-3.5 items-center justify-start relative w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            <h1 
              className="text-[32px] md:text-[44px] lg:text-[56px] font-medium leading-tight text-center md:whitespace-nowrap w-full"
              style={{
                background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #A1A6B0 46.29%, #878C95 55.24%, #6D717A 64.19%, #52575E 73.15%, #383C43 82.10%, #1E2228 91.05%, #111419 95.52%, #04070D 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                fontFamily: "Inter"
              }}
            >
              <span className="md:hidden">See Your AI<br />Workforce in Action</span>
              <span className="hidden md:inline">See Your AI Workforce in Action</span>
            </h1>
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.div 
          className="flex flex-col font-['Inter'] font-normal justify-center text-[#d5dbe6] text-[14px] md:text-[16px] text-center tracking-[-0.32px] w-full max-w-[370px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <p className="leading-[22px] md:leading-[25.6px]">90 seconds to discover how founders scale faster using Avyra AI Workflows and Agent</p>
        </motion.div>
      </motion.div>

      {/* Video Player Container */}
      <motion.div 
        className="relative z-10 mt-4 mb-4 md:mt-12 md:mb-12 w-[calc(100vw-32px)] md:w-[868px] mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="relative w-full bg-[#393939] rounded-[16px] md:rounded-[27px] overflow-hidden" style={{ aspectRatio: '16/9' }}>
          {/* Video Element */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            controls={isPlaying}
            playsInline
            preload="metadata"
          >
            <source src="/videos/AvyraAI_PraetorLeadGen.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Play Button */}
          {!isPlaying && (
            <button 
              onClick={handlePlayClick}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] md:w-[170px] md:h-[170px] group hover:scale-105 transition-transform duration-300 z-10"
            >
              {/* Play Button Background */}
              <div className="absolute inset-0">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/10">
                  <div className="absolute inset-[1px] rounded-full bg-gradient-to-br from-white/10 to-transparent" />
                </div>
              </div>
              
              {/* Play Icon */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px] md:w-[58px] md:h-[58px]">
                <svg 
                  width="100%" 
                  height="100%" 
                  viewBox="0 0 58 58" 
                  fill="none"
                  className="text-white group-hover:text-white/80 transition-colors duration-300"
                >
                  <path 
                    d="M22 17L38 29L22 41V17Z" 
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          )}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="relative z-10 w-full flex flex-col items-center gap-6 md:gap-[30px] pb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {/* Main CTA Button */}
        <div className="relative group w-auto">
          {/* Button Glow Background - grows on hover */}
          <Image
            src="/images/button-glow.png"
            alt=""
            width={314}
            height={120}
            className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 w-[314px] h-[120px] object-contain opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
          />
          
          <div 
            className="p-[2px] rounded-lg w-[calc(100vw-32px)] md:w-[550px] h-[50px] flex items-center justify-center overflow-hidden relative z-10"
            style={{
              background: 'radial-gradient(50% 20.7% at 50% 100%, #FFFFFF 0%, rgba(255, 255, 255, 0.00) 100%)'
            }}
          >
            <Link 
              href={ctaContent.href}
              className="w-full h-full bg-gradient-to-b from-[#FFFFFF] to-[#F3F3F3] rounded-[8px] flex items-center justify-center gap-1.5 px-4 md:px-8 py-3 relative z-10 hover:opacity-90 transition-all duration-300"
            >
              <span className="text-[#000000] text-[16px] font-semibold font-inter tracking-[-0.16px] leading-[20px]">
                {ctaContent.text}
              </span>
              <div className="w-[22px] h-[22px]">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M4.58333 11H17.4167M17.4167 11L11.9167 5.5M17.4167 11L11.9167 16.5" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Custom Styles */}
      <style jsx global>{`
        /* Make sure body and html don't scroll horizontally */
        html, body {
          overflow-x: hidden;
        }
        
        /* Remove focus outline */
        *:focus {
          outline: none !important;
        }
      `}</style>
    </div>
  )
} 