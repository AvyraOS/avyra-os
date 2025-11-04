"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Section Components
import Navbar from '@/components/landing/navbar';
import Hero from '@/components/landing/hero';
import FounderQuote from '@/components/landing/founder-quote';
import TrustedByVisionaries from '@/components/landing/trusted-by-visionaries';
import FoundersCircle from '@/components/landing/founders-circle';
import Ecosystem from '@/components/landing/ecosystem';
import FoundersByFounders from '@/components/landing/founders-by-founders';
import TrustedBy from '@/components/landing/trusted-by';
import ScaleSolutions from '@/components/landing/scale-solutions';
import FAQ from '@/components/landing/faq';
import Footer from '@/components/landing/footer';



export default function Home() {
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

    // Maintain scroll position on resize
    const maintainScrollPosition = () => {
      // Calculate how far down the page we are (as a percentage)
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollTop / totalHeight;

      // Store this percentage
      sessionStorage.setItem('scrollPercentage', scrollPercentage.toString());
    };

    // Apply the saved scroll percentage after resize
    const applyScrollPosition = () => {
      const storedScrollPercentage = sessionStorage.getItem('scrollPercentage');
      if (storedScrollPercentage) {
        const percentage = parseFloat(storedScrollPercentage);
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTarget = percentage * totalHeight;

        window.scrollTo(0, scrollTarget);
      }
    };

    // Add event listeners for scroll position maintenance
    let resizeTimer: NodeJS.Timeout;
    window.addEventListener('scroll', maintainScrollPosition);
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        applyScrollPosition();
      }, 50); // Short delay to let layout settle
    });


    // Handle smooth scrolling for nav links
    const handleSmoothScroll = () => {
      const navLinks = document.querySelectorAll('a[href^="#"]');

      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = (link as HTMLAnchorElement).getAttribute('href');
          if (!href || href === '#') return;

          e.preventDefault();
          const targetId = href.substring(1);
          const targetSection = document.getElementById(targetId);

          if (targetSection) {
            // Calculate offset position (10% of viewport height)
            const offset = window.innerHeight * 0.1;

            // Calculate the final scroll position
            const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;

            // Perform the scroll
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        });
      });
    };

    // Initialize smooth scrolling after a short delay to ensure DOM is ready
    setTimeout(handleSmoothScroll, 500);

    // Clean up function
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());

      // Clean up event listeners
      window.removeEventListener('scroll', maintainScrollPosition);
      window.removeEventListener('resize', () => {
        clearTimeout(resizeTimer);
      });
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <main className="min-h-screen text-white">


      {/* Main Navigation */}
      <Navbar />

      {/* Main content sections */}
      <div>
        <Hero />
        <FounderQuote />
        <TrustedByVisionaries />
        <FoundersCircle />
        <Ecosystem />
        <FoundersByFounders />
        <TrustedBy />
        <ScaleSolutions />
        <FAQ />
        <Footer />
      </div>
    </main>
  );
}

