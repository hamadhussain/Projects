// components/OrbitControls.js
import React, { useRef, useEffect } from "react";
import { OrbitControls as ThreeOrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useThree } from "@react-three/fiber";

const OrbitControls = (props) => {
  const { camera, gl: renderer } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.update();
    }
  }, [camera, renderer]);

  useEffect(() => {
    const controls = new ThreeOrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    return () => controls.dispose();
  }, [camera, renderer]);

//   return null;
};

export default OrbitControls;
