"use client";

import { useState } from 'react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "David Chen",
    role: "Founder",
    company: "Dexari",
    testimonial: "The Freedom Blueprint changed everything for me. It showed me exactly where I was wasting time and gave me a clear roadmap. Now my business runs on autopilot while I work 20 hours less per week. I actually have time for my hobbies again.",
    avatar: "/images/avatar1.png"
  },
  {
    id: 2,
    name: "Michael Torres",
    role: "Founder",
    company: "Netty Worth",
    testimonial: "Avyra OS framework automated 80% of my operations. I finally have time to focus on vision instead of tasks.",
    avatar: "/images/avatar2.png"
  },
  {
    id: 3,
    name: "James Wilson",
    role: "CEO & Founder",
    company: "Jutsu",
    testimonial: "Revenue up 3x. Time with family up even more. That's the Avyra difference.",
    avatar: "/images/avatar3.png"
  },
  {
    id: 4,
    name: "Ryan Matthews",
    role: "Founder",
    company: "Try Livepeer",
    testimonial: "From burnout to freedom in 60 days. The AI workflows handle everything — I just review and approve.",
    avatar: "/images/avatar4.png"
  },
  {
    id: 5,
    name: "Sarah Mitchell",
    role: "Founder",
    company: "CloudSync",
    testimonial: "The systems Avyra built saved us 25+ hours weekly. Our team finally has room to breathe and innovate. It's not just about efficiency — it's about reclaiming what matters most.",
    avatar: "/images/avatar5.png"
  },
  {
    id: 6,
    name: "Marcus Reid",
    role: "CEO",
    company: "DataFlow",
    testimonial: "Complete autonomy. Business runs itself while we scale.",
    avatar: "/images/avatar6.png"
  },
  {
    id: 7,
    name: "Alex Thompson",
    role: "Founder",
    company: "GrowthLab",
    testimonial: "From chaos to control in 30 days.",
    avatar: "/images/avatar7.png"
  },
  {
    id: 8,
    name: "Emma Rodriguez",
    role: "Founder",
    company: "Streamline",
    testimonial: "Avyra didn't just build systems — they gave us clarity on what actually matters in our business. We went from drowning in operations to focusing purely on growth. The Command HUD alone is worth its weight in gold.",
    avatar: "/images/avatar8.png"
  },
  {
    id: 9,
    name: "Daniel Park",
    role: "CEO & Founder",
    company: "ScaleUp",
    testimonial: "Within 2 weeks, we automated 70% of our workflows. The ROI is undeniable — I'm finally living the founder dream..",
    avatar: "/images/avatar1.png"
  }
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swiped left
      nextSlide();
    }

    if (touchStart - touchEnd < -75) {
      // Swiped right
      prevSlide();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (touchStart) {
      setTouchEnd(e.clientX);
    }
  };

  const handleMouseUp = () => {
    if (touchStart - touchEnd > 75) {
      // Dragged left
      nextSlide();
    }

    if (touchStart - touchEnd < -75) {
      // Dragged right
      prevSlide();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section className="bg-[#080808] relative py-16 lg:py-28">
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center mb-12 px-4">
        <div className="flex flex-col gap-6 items-center justify-start w-full max-w-[467px]">
          {/* Section Tag */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-[24px] bg-[#1b1c20]">
              {/* Gradient dot */}
              <div className="w-[6.9px] h-[6.9px] rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#3B3B3B] shadow-[0px_1.15px_18.4px_0px_inset_rgba(255,255,255,0.12),0px_1.15px_1.15px_0px_inset_rgba(255,255,255,0.09)]"></div>
              <span className="font-inter font-medium text-[14px] leading-[22px] tracking-[-0.14px] pill-text-gradient uppercase">
                TESTIMONIALS
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h2 className="bg-clip-text font-inter font-medium text-center text-transparent text-3xl sm:text-4xl lg:text-[44px] leading-tight lg:leading-[52.8px] whitespace-nowrap"
            style={{
              backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 416 53\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(41.184 0 0 4.558 208 26.5)\"><stop stop-color=\"rgba(213,219,230,1)\" offset=\"0.28387\"/><stop stop-color=\"rgba(161,166,176,1)\" offset=\"0.46291\"/><stop stop-color=\"rgba(135,140,149,1)\" offset=\"0.55242\"/><stop stop-color=\"rgba(109,113,122,1)\" offset=\"0.64194\"/><stop stop-color=\"rgba(82,87,94,1)\" offset=\"0.73145\"/><stop stop-color=\"rgba(56,60,67,1)\" offset=\"0.82097\"/><stop stop-color=\"rgba(30,34,40,1)\" offset=\"0.91048\"/><stop stop-color=\"rgba(17,20,27,1)\" offset=\"0.95524\"/><stop stop-color=\"rgba(4,7,13,1)\" offset=\"1\"/></radialGradient></defs></svg>')"
            }}>
            What <span className="font-instrument-serif italic">founders</span> are saying
          </h2>
        </div>

        {/* Subtitle */}
        <div className="flex flex-col font-inter font-normal justify-center w-full max-w-2xl text-[#d5dbe6] text-sm sm:text-base lg:text-[16px] text-center tracking-[-0.32px] leading-relaxed lg:leading-[25.6px] mt-6">
          100+ founders have transformed how they work and live with Avyra.
        </div>
      </div>

      {/* Desktop Grid Layout - Hidden on Mobile */}
      <div className="hidden md:block container mx-auto px-4">
        <div className="relative w-full flex justify-center">
          <div className="w-full max-w-[1224px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px] justify-items-center">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="rounded-2xl border border-[rgba(216,231,242,0.07)] shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] p-6 flex flex-col relative overflow-hidden w-full h-[312px]" style={{ 
                  maxWidth: '399px',
                  backgroundImage: "url('/images/testimonials-card-bg.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}>

                  {/* Testimonial Text - Now on top */}
                  <div className="relative z-10 flex-1 mb-6">
                    <p className="text-[#d5dbe6] text-[16px] leading-[25.6px] tracking-[-0.32px] opacity-80">
                      &quot;{testimonial.testimonial}&quot;
                    </p>
                  </div>

                  {/* User Info - Now on bottom */}
                  <div className="relative z-10 flex items-center gap-3 mt-auto">
                    <div className="w-[42px] h-[42px] rounded-full overflow-hidden border border-[rgba(207,231,255,0.2)]">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={42}
                        height={42}
                        quality={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-[#d5dbe6] text-[16px] leading-[25.6px] tracking-[-0.32px] font-medium">
                        {testimonial.name}
                      </div>
                      <div className="text-[#d5dbe6] text-[12px] leading-[15.6px] opacity-50">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Carousel - Hidden on Desktop */}
      <div className="md:hidden container mx-auto px-4">
        <div className="relative w-full flex justify-center">
          <div className="w-full max-w-[399px]">
            {/* Carousel Container */}
            <div 
              className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0">
                    <div className="rounded-2xl border border-[rgba(216,231,242,0.07)] shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] p-6 flex flex-col relative overflow-hidden h-[312px]" style={{ 
                      backgroundImage: "url('/images/testimonials-card-bg.png')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}>

                      {/* Testimonial Text */}
                      <div className="relative z-10 flex-1 mb-6">
                        <p className="text-[#d5dbe6] text-[16px] leading-[25.6px] tracking-[-0.32px] opacity-80">
                          &quot;{testimonial.testimonial}&quot;
                        </p>
                      </div>

                      {/* User Info */}
                      <div className="relative z-10 flex items-center gap-3 mt-auto">
                        <div className="w-[42px] h-[42px] rounded-full overflow-hidden border border-[rgba(207,231,255,0.2)]">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            width={42}
                            height={42}
                            quality={100}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-[#d5dbe6] text-[16px] leading-[25.6px] tracking-[-0.32px] font-medium">
                            {testimonial.name}
                          </div>
                          <div className="text-[#d5dbe6] text-[12px] leading-[15.6px] opacity-50">
                            {testimonial.role} at {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white w-8' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows - Centered */}
            <div className="flex justify-center items-center gap-6 mt-6">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                aria-label="Previous testimonial"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                aria-label="Next testimonial"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

