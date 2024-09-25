// 'use client'
// import React from 'react'
// import { Canvas } from 'three/src/Three.js'
// import Three from '../Three/page'

// const Page = () => {
//   return (
//     <Canvas   camera={{
//       fov: 64,
//       position: [2.3, 1.5, 2.3],
//     }}>
//         <Three/>
//     </Canvas>
//   )
// }

// export default Page

"use client";
import React from "react";
import Three from "../Office/page";
import { Canvas } from "@react-three/fiber";
// import { OrbitControls, ScrollControls } from "three";
import OrbitControls from "../Orbit/page";
import {ScrollControls} from "@react-three/drei";
import { useEffect, useState } from "react";
// import { OrbitControls, Stars } from "@react-three/drei";

const Page = () => {
  // const scroll = useScroll()

  // useEffect(() => {
  //   console.log(actions)
  //   //@ts-ignore
  //   actions["Experiment"].play().paused = true
  // }, [])
  // useFrame(
  //   () =>
  //     //@ts-ignore
  //     (actions["Experiment"].time =
  //       //@ts-ignore
  //       (actions["Experiment"].getClip().duration * scroll.offset) / 4)
  // )
  return (
    <div className=" w-screen h-screen  overflow-hidden flex justify-center items-center  ">
      {" "}
      <Canvas
        // camera={
        //   {
        //     fov: 64,
        //   }
        // }
        className={` h-full bg-transparent flex justify-center items-center`}
      >
        
        {/* <directionalLight
        position={[1.3, 1, 9.4]}
        castShadow
        intensity={Math.PI * 2}
      /> */}
        <ambientLight intensity={2.2} />
        <pointLight position={[1, 0, 2]} />

        <OrbitControls />
        {/* <ScrollControls damping={0.5} pages={3}/> */}
          {" "}
          <Three />
        {/* </ScrollControls> */}
        {/* <Environment preset="sunset"  /> */}
      </Canvas>
    </div>
  );
};

export default Page;
