import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Practice = () => {
  const containerRef = useRef(null);
  const lastRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(lastRef.current, {
        x: 200,

        scrollTrigger: {
          trigger: lastRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
          markers: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <div className="min-h-screen bg-red-100 flex items-center p-10">
        <div className="w-6 h-6 bg-violet-500" />
      </div>

      <div className="min-h-screen bg-green-100 flex items-center p-10">
        <div className="w-6 h-6 bg-violet-500" />
      </div>

      <div className="min-h-screen bg-orange-100 flex items-center p-10">
        <div ref={lastRef} className="w-6 h-6 bg-violet-500" />
      </div>
    </div>
  );
};

export default Practice;
