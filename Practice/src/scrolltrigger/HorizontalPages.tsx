import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

// Register the ScrollTrigger plugin so GSAP can use scroll-based animations
gsap.registerPlugin(ScrollTrigger);

const HorizontalPages = () => {
  // This element will be PINNED (the viewport stays fixed)
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // This is the wide horizontal strip that actually moves left/right
  const trackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    // gsap.context scopes GSAP to this component
    // and allows proper cleanup on unmount
    const ctx = gsap.context(() => {
      // Collect all full-screen pages
      // Each ".panel" is 100vw wide
      const panels = gsap.utils.toArray<HTMLElement>(".panel");

      /**
       * CORE ANIMATION
       * ----------------
       * We animate the TRACK, not the panels.
       * The viewport is pinned, so moving the track
       * creates the illusion of pages sliding in/out.
       */
      gsap.to(trackRef.current, {
        /**
         * xPercent moves the track horizontally
         * based on its OWN width.
         *
         * Example with 4 panels:
         * panels.length = 4
         *
         * xPercent = -100 * (4 - 1)
         * xPercent = -300
         *
         * Meaning:
         * - Move the track LEFT by 300% of its width
         *
         * Scroll progress → track position:
         * 0%   → xPercent = 0     → Page 1 visible
         * 33%  → xPercent = -100  → Page 2 visible
         * 66%  → xPercent = -200  → Page 3 visible
         * 100% → xPercent = -300  → Page 4 visible
         *
         * Because the track moves LEFT,
         * new pages ENTER from the RIGHT.
         */
        xPercent: -100 * (panels.length - 1),

        // No easing — scroll position controls animation directly
        ease: "none",

        scrollTrigger: {
          // When this wrapper hits the viewport, start the animation
          trigger: wrapperRef.current,

          // Freeze the viewport while animation happens
          pin: true,

          // Scroll position controls animation progress
          // Scroll down → move forward
          // Scroll up → move backward
          scrub: 1,

          /**
           * Total scroll distance available
           * More distance = slower horizontal movement
           *
           * window.innerWidth per panel feels natural
           */
          end: () => "+=" + window.innerWidth * panels.length,

          // markers: true, // enable for debugging
        },
      });
    }, wrapperRef);

    // Cleanup GSAP + ScrollTrigger on unmount
    return () => ctx.revert();
  }, []);

  return (
    /**
     * WRAPPER
     * - Full viewport height
     * - overflow-hidden so only one page is visible
     * - This is what gets pinned
     */
    <div ref={wrapperRef} className="h-screen overflow-hidden">
      {/**
       * TRACK
       * - Horizontal flex container
       * - Width = number of pages × 100vw
       * - THIS element moves left/right
       */}
      <div
        ref={trackRef}
        className="flex h-full"
        style={{ width: "400vw" }} // 4 pages → 400vw
      >
        <section className="panel w-screen h-full bg-red-200 flex items-center justify-center text-4xl font-bold">
          Page 1
        </section>

        <section className="panel w-screen h-full bg-green-200 flex items-center justify-center text-4xl font-bold">
          Page 2
        </section>

        <section className="panel w-screen h-full bg-blue-200 flex items-center justify-center text-4xl font-bold">
          Page 3
        </section>

        <section className="panel w-screen h-full bg-yellow-200 flex items-center justify-center text-4xl font-bold">
          Page 4
        </section>
      </div>
    </div>
  );
};

export default HorizontalPages;
