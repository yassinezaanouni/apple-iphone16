"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { hightlightsSlides } from "@/utils/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import React from "react";
import { useInView } from "framer-motion";

const VideoCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const apiRef = useRef<CarouselApi | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLastVideoEnded, setIsLastVideoEnded] = useState(false);

  const inView = useInView(containerRef, { once: false });

  useEffect(() => {
    if (inView) {
      playVideo(currentIndex);
    } else {
      stopVideo(currentIndex);
    }
  }, [inView]);

  useEffect(() => {
    if (!api) {
      return;
    }

    apiRef.current = api;

    api.on("select", () => {
      const newIndex = apiRef.current?.selectedScrollSnap() || 0;
      if (newIndex !== currentIndex) {
        stopVideo(currentIndex);
        setCurrentIndex(newIndex);
        setIsLastVideoEnded(false); // Reset this when changing videos
        if (!isPaused) {
          playVideo(newIndex);
        }
      }
    });

    // Add this new effect to update progress
    const video = videoRefs.current[currentIndex];
    if (video) {
      const updateProgress = () => {
        setProgress((video.currentTime / video.duration) * 100);
      };
      video.addEventListener("timeupdate", updateProgress);
      return () => video.removeEventListener("timeupdate", updateProgress);
    }
  }, [api, currentIndex, isPaused]);

  const stopVideo = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const playVideo = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = 0;
      video
        .play()
        .catch((error) => console.error("Error playing video:", error));
      setIsPlaying(true);
    }
  };

  const handleVideoEnd = () => {
    if (apiRef.current && !isPaused) {
      const nextIndex = currentIndex + 1;
      if (nextIndex < hightlightsSlides.length) {
        apiRef.current.scrollTo(nextIndex);
      } else {
        setIsPlaying(false);
        setIsLastVideoEnded(true); // Set this to true when the last video ends
      }
    }
  };

  const togglePlayPause = () => {
    const video = videoRefs.current[currentIndex];
    if (video) {
      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
        setIsPaused(true);
      } else {
        video
          .play()
          .catch((error) => console.error("Error playing video:", error));
        setIsPlaying(true);
        setIsPaused(false);
      }
    }
  };

  const restartCarousel = () => {
    if (apiRef.current) {
      stopVideo(currentIndex);
      apiRef.current.scrollTo(0);
      setCurrentIndex(0);
      setIsPaused(false);
      setIsLastVideoEnded(false); // Reset this when restarting
      playVideo(0);
    }
  };

  return (
    <div className="" ref={containerRef}>
      <Carousel
        opts={{
          align: "start",
        }}
        className="cursor-grab"
        setApi={setApi}
      >
        <CarouselContent className="big-container">
          {hightlightsSlides.map((slide, index) => (
            <CarouselItem
              key={slide.id}
              className="pr-10 basis-full sm:basis-[70vw] w-[88vw] md:h-[70vh] sm:h-[50vh] h-[35vh]"
            >
              <SlideContent
                slide={slide}
                isActive={index === currentIndex}
                onVideoEnd={handleVideoEnd}
                // @ts-ignore
                ref={(el) => (videoRefs.current[index] = el)}
                isPlaying={isPlaying}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {hightlightsSlides.map((_, i) => (
            <div
              key={i}
              className={`mx-2 h-3 rounded-full relative cursor-pointer transition-all duration-200 ${
                i === currentIndex ? "w-12 bg-gray-400" : "w-3 bg-gray-200"
              }`}
              onClick={() => api?.scrollTo(i)}
            >
              {i === currentIndex && (
                <div
                  ref={(el) => {
                    if (el) {
                      gsap.to(el, {
                        width: `${progress}%`,
                        duration: 0.2,
                        ease: "linear",
                      });
                    }
                  }}
                  className="absolute top-0 left-0 h-full bg-foreground rounded-full"
                />
              )}
            </div>
          ))}
        </div>

        <button
          className=" ml-4 p-4 rounded-full bg-gray-300 backdrop-blur flex-center"
          onClick={isLastVideoEnded ? restartCarousel : togglePlayPause}
        >
          <Image
            src={
              isLastVideoEnded
                ? "/assets/images/replay.svg"
                : isPlaying
                ? "/assets/images/pause.svg"
                : "/assets/images/play.svg"
            }
            alt={isLastVideoEnded ? "restart" : isPlaying ? "pause" : "play"}
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
};

export default VideoCarousel;

type SlideContentProps = {
  slide: any;
  isActive: boolean;
  onVideoEnd: () => void;
  isPlaying: boolean;
};

const SlideContent = React.forwardRef<HTMLVideoElement, SlideContentProps>(
  ({ slide, isActive, onVideoEnd, isPlaying }, ref) => {
    useEffect(() => {
      if (ref && "current" in ref && ref.current) {
        if (isActive && isPlaying) {
          ref.current.currentTime = 0;
          ref.current
            .play()
            .catch((error) => console.error("Error playing video:", error));
        } else {
          ref.current.pause();
        }
      }
    }, [isActive, isPlaying, ref]);

    return (
      <div className="w-full h-full relative flex flex-col items-center justify-around rounded-3xl overflow-hidden bg-background">
        <div className="md:absolute  top-12 left-[5%] z-10">
          {slide.textLists.map((text: string, i: number) => (
            <p
              key={i}
              className="md:text-2xl text-xl max-sm:text-center  font-medium"
            >
              {text}
            </p>
          ))}
        </div>
        <video
          ref={ref}
          id="video"
          playsInline={true}
          className={`${
            slide.id === 2 ? "translate-x-44" : ""
          } pointer-events-none`}
          preload="auto"
          muted
          loop={false}
          onEnded={onVideoEnd}
        >
          <source src={slide.video} type="video/mp4" />
        </video>
      </div>
    );
  }
);

SlideContent.displayName = "SlideContent";
