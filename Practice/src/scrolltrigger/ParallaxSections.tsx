import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ParallaxSections = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Select all images that should parallax
      const images = gsap.utils.toArray<HTMLElement>(".parallax-img");

      images.forEach((img) => {
        gsap.to(img, {
          // Move image UP slightly as user scrolls DOWN
          // Smaller value = subtle paralax
          y: -80,

          ease: "none",

          scrollTrigger: {
            // Each image controls its own parallax
            trigger: img,

            // Start when image enters viewport
            start: "top bottom",

            // End when image leaves viewport
            end: "bottom top",

            // Scroll position directly controls movement
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* SECTION 1 */}
      <section className="relative h-screen overflow-hidden">
        <img
          className="parallax-img absolute inset-0 w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          alt="Nature"
        />
        <div className="relative z-10 h-full flex items-center justify-center text-white text-5xl font-bold">
          Nature
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="relative h-screen overflow-hidden">
        <img
          className="parallax-img absolute inset-0 w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
          alt="Mountains"
        />
        <div className="relative z-10 h-full flex items-center justify-center text-white text-5xl font-bold">
          Mountains
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="relative h-screen overflow-hidden">
        <img
          className="parallax-img absolute inset-0 w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt="Ocean"
        />
        <div className="relative z-10 h-full flex items-center justify-center text-white text-5xl font-bold">
          Ocean
        </div>
      </section>
    </div>
  );
};

export default ParallaxSections;
