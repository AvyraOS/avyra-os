"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Section Components
import Navbar from '@/components/landing/navbar';
import Pricing from '@/components/landing/pricing';
import Footer from '@/components/landing/footer';

export default function PricingPage() {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Force scroll to top on page load
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }

    // Remove hash if present to avoid auto-scrolling
    if (window.location.hash) {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });

    // Clean up function
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className="min-h-screen text-white bg-[#080808]">
      {/* Main Navigation */}
      <Navbar />

      {/* Main content sections */}
      <div>
        <Pricing />
        <Footer />
      </div>
    </main>
  );
}

