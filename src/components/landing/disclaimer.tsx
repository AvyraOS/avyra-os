"use client";

export default function Disclaimer() {
  return (
    <section className="bg-[#080808] relative py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center max-w-[1300px] mx-auto">
          
          {/* Disclaimer Pill */}
          <div className="mb-8 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-[24px] bg-[#1b1c20]">
              {/* Gradient dot */}
              <div className="w-[6.9px] h-[6.9px] rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#3B3B3B] shadow-[0px_1.15px_18.4px_0px_inset_rgba(255,255,255,0.12),0px_1.15px_1.15px_0px_inset_rgba(255,255,255,0.09)]"></div>
              <span className="font-inter font-medium text-[14px] leading-[22px] tracking-[-0.14px] pill-text-gradient uppercase">
                IMPORTANT: DISCLAIMER
              </span>
            </div>
          </div>

          {/* Disclaimer Text */}
          <div className="flex flex-col gap-6 text-center">
            <p className="font-inter text-[16px] md:text-[18px] leading-[1.6] text-[#d5dbe6] max-w-[1100px]">
              The stories you&apos;ve seen are real. The results are earned. Every founder&apos;s journey is different ~ and your success depends on your own execution and consistency.
            </p>
            
            <p className="font-inter text-[16px] md:text-[18px] leading-[1.6] text-[#d5dbe6] max-w-[1100px]">
              Avyra exists to empower you with systems, strategy, and support — not promises or guarantees.
            </p>
            
            <p className="font-inter text-[16px] md:text-[18px] leading-[1.6] text-[#d5dbe6] max-w-[1100px]">
              Everything we share is designed to educate, inspire, and equip you to build your version of freedom.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

