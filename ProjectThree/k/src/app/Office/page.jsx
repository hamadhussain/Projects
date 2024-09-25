"use client";
import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {ScrollControls} from "@react-three/drei";

export default function Model(props ) {
  const { nodes, materials } = useGLTF('/Models/WawaOffice.glb')
  const modelRef = useRef(); 
  useFrame(() => {
      // modelRef.current.rotation.y += 0.007;
  });

  return (
    <ScrollControls damping={0.5} pages={3}>
    <group
      {...props}
      dispose={null}
      ref={modelRef}
      scale={[0.4, 0.4, 0.4]}
      rotation={[0.5, 5.3, 0]}
      position={[0, 0, 0]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['01_office'].geometry}
        material={materials['01']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['02_library'].geometry}
        material={materials['02']}
        position={[0, 2.114, -2.23]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['03_attic'].geometry}
        material={materials['03']}
        position={[-1.97, 4.227, -2.199]}
      />
    </group></ScrollControls>

  )
}

useGLTF.preload('/Models/WawaOffice.glb')
