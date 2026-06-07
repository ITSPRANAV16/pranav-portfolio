import React, { useRef, useState, useEffect } from 'react';

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionTop = window.scrollY + rect.top;
            // Precise scroll offset formula from requirements
            const calculatedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
            setOffset(calculatedOffset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Passive scroll listener for maximum scrolling performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    // First trigger without ticking block to guarantee immediate initial render offset
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const calculatedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(calculatedOffset);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const row1Images = [
    'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
    'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
    'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
    'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
    'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
    'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
    'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
    'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
    'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
    'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
    'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  ];

  const row2Images = [
    'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
    'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
    'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
    'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
    'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
    'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
    'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
    'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
    'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
    'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
  ];

  // Tripled lists for seamless repetition and scrolling overflow
  const row1Tripled = [...row1Images, ...row1Images, ...row1Images];
  const row2Tripled = [...row2Images, ...row2Images, ...row2Images];

  return (
    <section
      ref={sectionRef}
      id="marquee-gallery"
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full select-none"
    >
      <div className="flex flex-col gap-3 w-full">
        {/* Row 1 - Moves RIGHT on scroll */}
        <div className="overflow-hidden w-full flex marquee-mask">
          <div
            className="flex gap-3 whitespace-nowrap"
            style={{
              transform: `translate3d(${offset - 200}px, 0px, 0px)`,
              willChange: 'transform',
            }}
          >
            {row1Tripled.map((url, i) => (
              <img
                key={`r1-${i}`}
                src={url}
                alt={`Portfolio Clip R1-${i}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-[180px] h-[115px] xs:w-[240px] xs:h-[150px] sm:w-[320px] sm:h-[200px] md:w-[420px] md:h-[270px] rounded-[14px] xs:rounded-2xl object-cover shrink-0 pointer-events-none"
              />
            ))}
          </div>
        </div>

        {/* Row 2 - Moves LEFT on scroll */}
        <div className="overflow-hidden w-full flex marquee-mask">
          <div
            className="flex gap-3 whitespace-nowrap"
            style={{
              transform: `translate3d(${-(offset - 200)}px, 0px, 0px)`,
              willChange: 'transform',
            }}
          >
            {row2Tripled.map((url, i) => (
              <img
                key={`r2-${i}`}
                src={url}
                alt={`Portfolio Clip R2-${i}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-[180px] h-[115px] xs:w-[240px] xs:h-[150px] sm:w-[320px] sm:h-[200px] md:w-[420px] md:h-[270px] rounded-[14px] xs:rounded-2xl object-cover shrink-0 pointer-events-none"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
