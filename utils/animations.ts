import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { MutableRefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

type AnimationProps = gsap.TweenVars;
type ScrollProps = gsap.plugins.ScrollTriggerInstanceVars;

export const animateWithGsap = (
  target: gsap.TweenTarget,
  animationProps: AnimationProps,
  scrollProps?: ScrollProps
) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target as gsap.DOMTarget,
      toggleActions: "restart reverse restart reverse",
      start: "top 85%",
      ...scrollProps,
    },
  });
};

type TimelineTarget = gsap.TweenTarget;

export const animateWithGsapTimeline = (
  timeline: gsap.core.Timeline,
  rotationRef: MutableRefObject<{ rotation: { y: number } }>,
  rotationState: number,
  firstTarget: TimelineTarget,
  secondTarget: TimelineTarget,
  animationProps: AnimationProps
) => {
  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: "power2.inOut",
  });

  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<"
  );

  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<"
  );
};
