/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: polyman (https://sketchfab.com/Polyman_3D)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/apple-iphone-15-pro-max-black-df17520841214c1792fb8a44c6783ee7
Title: Apple iPhone 15 Pro Max Black
*/

import * as THREE from "three";
import React, { useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
};

type ModelProps = {
  item: {
    img: string;
    color: string[];
  };
};

function Model(props: ModelProps & JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/scene.glb") as GLTFResult;

  const texture = useTexture(props.item.img);

  useEffect(() => {
    Object.entries(materials).forEach(([key, material]) => {
      // these are the material names that can't be changed color
      if (
        key !== "zFdeDaGNRwzccye" &&
        key !== "ujsvqBWRMnqdwPx" &&
        key !== "hUlRcbieVuIiOXG" &&
        key !== "jlzuBkUzuJqgiAK" &&
        key !== "xNrofRCqOXXHVZt"
      ) {
        (material as THREE.MeshStandardMaterial).color.set(props.item.color[0]);
      }
      material.needsUpdate = true;
    });
  }, [materials, props.item]);

  return (
    <group {...props} dispose={null}>
      {Object.entries(nodes).map(([key, node]) => {
        const materialKey = Array.isArray(node.material)
          ? node.material[0].name
          : node.material?.name;

        return (
          <mesh
            key={key}
            castShadow
            receiveShadow
            geometry={node.geometry}
            material={materialKey ? materials[materialKey] : undefined}
            scale={0.01}
          >
            {key === "xXDHkMplTIDAXLN" && (
              <meshStandardMaterial roughness={1} map={texture} />
            )}
          </mesh>
        );
      })}
    </group>
  );
}

export default Model;

useGLTF.preload("/models/scene.glb");
