"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Link from "next/link";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.to(heroRef.current, { opacity: 1, delay: 2 });
    gsap.to("#cta", { opacity: 1, y: -50, delay: 2 });
  }, []);
  return (
    <section className="w-full nav-height relative">
      <div className="h-5/6 flex-center flex-col">
        <p
          ref={heroRef}
          className="text-center font-semibold text-3xl text-gray-100 opacity-0 max-md:mb-10"
        >
          iphone 15 pro
        </p>

        <div className="md:w-10/12 w-9/12">
          <video
            autoPlay
            muted
            playsInline
            className="hidden pointer-events-none md:block"
          >
            <source src={"/assets/videos/hero.mp4"} type="video/mp4" />
          </video>

          <video
            autoPlay
            muted
            playsInline
            className="block pointer-events-none md:hidden"
          >
            <source
              src={"/assets/videos/smallHero.mp4"}
              className="block md:hidden"
              type="video/mp4"
            />
          </video>
        </div>
      </div>

      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        <Link
          href="#highlights"
          className="px-5 py-2 rounded-3xl bg-primary my-5 hover:bg-transparent border border-transparent hover:border hover:text-primary hover:border-primary"
        >
          buy
        </Link>
        <p className="text-center text-gray">
          From $999 or $41.62/mo. for 24 mo.1
          <br />
          Apple Intelligence coming this fall2
        </p>
      </div>
    </section>
  );
};

export default Hero;
