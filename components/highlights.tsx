"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import VideoCarousel from "./video-carousel";
const Highlights = () => {
  useGSAP(() => {
    gsap.to("#title", { opacity: 1, y: 0 });
    gsap.to(".link", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.25,
    });
  }, []);
  return (
    <section id="highlights" className="overflow-hidden h-full  bg-zinc ">
      <div className="">
        <div className="~mb-12/[5rem] w-full md:flex items-center  justify-between big-container">
          <h2
            id="title"
            className="text-foreground text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[3.5rem] font-bold"
          >
            Get the highlights.
          </h2>

          <div className="flex flex-wrap items-end gap-5">
            <p className="flex items-center text-primary">
              Watch the film{" "}
              <Image
                src={"/assets/images/watch.svg"}
                alt="watch"
                width={16}
                height={16}
                className="ml-2"
              />
            </p>
          </div>
        </div>

        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
