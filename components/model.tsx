"use client";
import React, { useRef, useState } from "react";
import ModelView from "./model-view";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "@/constants";

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
            className="w-full h-full fixed inset-0 overflow-hidden"
            eventSource={document.getElementById("root")!}
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
                  className="size-6 rounded-full mx-2 cursor-pointer"
                  style={{
                    backgroundColor: item.color[0],
                  }}
                  onClick={() => {
                    setModel(item);
                  }}
                ></li>
              ))}
            </ul>
            <button className="flex items-center justify-center p-1 rounded-full bg-gray-300 backdrop-blur ml-3 gap-1">
              {sizes.map((item, i) => (
                <span
                  key={i}
                  className={`w-10 h-10 text-sm flex justify-center items-center rounded-full transition-all ${
                    size === item.value
                      ? "bg-white text-black"
                      : "bg-transparent text-white"
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
