"use client";
import React, { useEffect, useRef, useState } from "react";
import ModelView from "./model-view";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "@/utils/constants";
import gsap from "gsap";
import { animateWithGsapTimeline } from "@/utils/animations";

const Model = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState(models[0]);

  // camera control
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  // model
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  //rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const tl = gsap.timeline();
  useEffect(() => {
    if (size === "large") {
      animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 2,
      });
    } else {
      animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 2,
      });
    }
  }, [size]);

  if (typeof window === "undefined" || !document) {
    return null;
  }

  return (
    <section className="big-container">
      <h2 className="text-foreground text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[3.5rem] font-bold">
        Take a closer look.
      </h2>
      <div className="flex flex-col items-center-mt-5">
        <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
          <ModelView
            index={1}
            groupRef={small}
            gsapType="view1"
            controlRef={cameraControlSmall}
            setRotationState={setSmallRotation}
            item={model}
            size={size}
          />

          <ModelView
            index={2}
            groupRef={large}
            gsapType="view2"
            controlRef={cameraControlLarge}
            setRotationState={setLargeRotation}
            item={model}
            size={size}
          />

          <Canvas
            className="w-full h-full"
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              overflow: "hidden",
            }}
            eventSource={document.querySelector("body")!}
          >
            <View.Port />
          </Canvas>
        </div>

        <div className="mx-auto w-full">
          <p className="text-sm font-light text-center mb-5">{model.title}</p>
          <div className="flex-center">
            <ul className="flex items-center justify-center px-4 py-4 rounded-full bg-gray-300 backdrop-blur">
              {models.map((item, i) => (
                <li
                  key={i}
                  className={`size-6 rounded-full mx-2 cursor-pointer ${
                    model.color[0] === item.color[0]
                      ? "ring-2 ring-foreground"
                      : ""
                  }`}
                  style={{
                    backgroundColor: item.color[0],
                  }}
                  onClick={() => {
                    setModel(item);
                  }}
                ></li>
              ))}
            </ul>
            <button className="flex items-center justify-center p-1 rounded-full bg-gray-300 backdrop-blur ml-3 gap-1 relative">
              <span
                className="absolute w-10 h-10 bg-white rounded-full transition-all duration-300 ease-in-out"
                style={{
                  left:
                    sizes.findIndex((item) => item.value === size) * 40 +
                    (sizes.findIndex((item) => item.value === size) === 1
                      ? 8
                      : 4) +
                    "px",
                }}
              />
              {sizes.map((item, i) => (
                <span
                  key={i}
                  className={`w-10 h-10 text-sm flex justify-center items-center rounded-full transition-all z-10 ${
                    size === item.value ? "text-background" : "text-foreground"
                  }`}
                  onClick={() => {
                    setSize(item.value);
                  }}
                >
                  {item.label}
                </span>
              ))}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
