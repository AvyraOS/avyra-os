"use client";

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/landing/navbar';
import MobileMenu from '@/components/landing/mobile-menu';
import Disclaimer from '@/components/landing/disclaimer';
import Footer from '@/components/landing/footer';

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

const Newsletter = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Beehiv API Integration
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to subscribe');
      }

      setIsSubmitted(true);
      // Reset form
      setFormData({ name: '', email: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      console.error('Subscription error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <MobileMenu />
      <Navbar />
      <section className="relative h-[85vh] bg-black flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/newsletter-bg.png"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[1350px] mx-auto px-6 md:px-12 lg:px-16 pt-46 md:pt-64 pb-24 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column - Form */}
            <div className="w-full max-w-[641px] text-center lg:text-left">
              {/* Title */}
              <h1 
                className="text-[40px] sm:text-[44px] md:text-[48px] font-medium leading-[50px] sm:leading-[56px] md:leading-[64px] mb-8 md:mb-10"
                style={{
                  background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #A1A6B0 46.29%, #878C95 55.24%, #6D717A 64.19%, #52575E 73.15%, #383C43 82.10%, #1E2228 91.05%, #11141B 95.52%, #04070D 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                The newsletter to help you build a{' '}
                <span 
                  className="italic font-['Instrument_Serif']"
                  style={{
                    background: "radial-gradient(86% 99% at 50% 50%, #D5DBE6 28.39%, #A1A6B0 46.29%, #878C95 55.24%, #6D717A 64.19%, #52575E 73.15%, #383C43 82.10%, #1E2228 91.05%, #11141B 95.52%, #04070D 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  profitable
                </span>
                {' '}brand.
              </h1>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-[18px] mb-8 md:mb-10">
                {/* Full Name Input */}
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="w-full bg-[#1b1c20] border border-[#121212] rounded-[10px] px-6 py-4 text-white text-sm font-medium font-inter tracking-[-0.16px] placeholder:text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[34px] h-[34px] bg-[rgba(217,217,217,0.05)] rounded-[7.286px] flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 9C10.6569 9 12 7.65685 12 6C12 4.34315 10.6569 3 9 3C7.34315 3 6 4.34315 6 6C6 7.65685 7.34315 9 9 9Z" fill="white"/>
                      <path d="M9 10.5C6.51472 10.5 4.5 12.5147 4.5 15H13.5C13.5 12.5147 11.4853 10.5 9 10.5Z" fill="white"/>
                    </svg>
                  </div>
                </div>

                {/* Email Input */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your Email"
                    required
                    className="w-full bg-[#1b1c20] border border-[#121212] rounded-[10px] px-6 py-4 text-white text-sm font-medium font-inter tracking-[-0.16px] placeholder:text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[34px] h-[34px] bg-[rgba(217,217,217,0.05)] rounded-[7.286px] flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 4.5H15C15.4125 4.5 15.75 4.8375 15.75 5.25V12.75C15.75 13.1625 15.4125 13.5 15 13.5H3C2.5875 13.5 2.25 13.1625 2.25 12.75V5.25C2.25 4.8375 2.5875 4.5 3 4.5Z" fill="white"/>
                      <path d="M15.75 5.25L9 9.75L2.25 5.25" stroke="#1b1c20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </form>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm font-inter">{error}</p>
                </div>
              )}

              {/* CTA Button - Matching Hero Style */}
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
                className="group inline-flex items-center justify-center w-full lg:w-auto mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="relative w-full lg:w-auto inline-block">
                  {/* Button Background Container with Glow */}
                  <div
                    className="relative z-10 p-[2px] rounded-lg h-[50px] overflow-hidden"
                    style={{
                      background: "radial-gradient(50% 20.7% at 50% 100%, #FFFFFF 0%, rgba(255, 255, 255, 0.00) 100%)"
                    }}
                  >
                    <div className="relative z-50 inline-flex items-center justify-center bg-gradient-to-b from-[#FFFFFF] to-[#F3F3F3] text-[#000000] px-8 rounded-lg text-base font-semibold font-inter transition-all duration-300 hover:opacity-90 cursor-pointer h-[46px] w-full lg:w-auto">
                      <span>{isLoading ? 'Subscribing...' : 'Get The Systems'}</span>
                      {!isLoading && (
                        <svg
                          className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </button>

              {/* Success Message - Hidden by default, shown after submission */}
              {isSubmitted && (
                <p className="text-[#d5dbe6] text-[22px] font-normal font-inter leading-[32px] tracking-[-0.32px]">
                  Hey we just sent you an email with the freedom founders kit. Please watch our Automation in action
                </p>
              )}
            </div>

            {/* Right Column - Visual/Placeholder */}
            <div className="hidden lg:block w-full h-[470px] bg-[#5b5b5b] rounded-[40px]">
              {/* Placeholder for future content - video, image, or interactive element */}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Mini Version */}
      <section className="bg-black relative py-4 pb-16">
        {/* Section Header - Just the Pill */}
        <div className="flex flex-col items-center justify-center mb-12 px-4">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-[24px] bg-[#1b1c20]">
              {/* Gradient dot */}
              <div className="w-[6.9px] h-[6.9px] rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#3B3B3B] shadow-[0px_1.15px_18.4px_0px_inset_rgba(255,255,255,0.12),0px_1.15px_1.15px_0px_inset_rgba(255,255,255,0.09)]"></div>
              <span className="font-inter font-medium text-[14px] leading-[22px] tracking-[-0.14px] pill-text-gradient uppercase">
                Success Stories
              </span>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="container mx-auto px-4">
          <div className="relative w-full flex justify-center">
            <div className="w-full max-w-[1224px]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px] justify-items-center">
                {testimonials.slice(0, 3).map((testimonial) => (
                  <div key={testimonial.id} className="rounded-2xl border border-[rgba(216,231,242,0.07)] shadow-[0px_2px_1px_0px_inset_rgba(207,231,255,0.2)] p-6 flex flex-col relative overflow-hidden w-full h-[312px]" style={{ 
                    maxWidth: '399px',
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section - Wrapped in pure black */}
      <div className="bg-black [&_section]:!bg-black">
        <Disclaimer />
      </div>

      {/* Footer Section - Override with pure black */}
      <div className="bg-black [&_footer]:!bg-black">
        <Footer />
      </div>
    </>
  );
};

export default Newsletter;

