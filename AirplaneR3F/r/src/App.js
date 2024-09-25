// import { Canvas } from "three/src/Three.js";
import "./App.css";
import Experience from "./Comp/Experience/app";
import { Canvas } from '@react-three/fiber';


function App() {
  return (
    <>
      <Canvas>
        <color attach="background" arga={["#ecece"]}/>
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
