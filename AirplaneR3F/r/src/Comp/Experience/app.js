import React from "react";
// import { OrbitControls } from "@react-three/drei";

// const Experience = () => {
//   return (
//     <>
//       {/* <OrbitControls/> */}
//       {/* <OrbitControls/> */}
//         <mesh>
//           <boxGeometry />
//           <meshBasicMaterial />
//         </mesh>
//     </>
//   );
// };

// export default Experience;







import { OrbitControls } from "@react-three/drei";

const Experience = () => {
  return (
    <>
      <OrbitControls />
      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </>
  );
};
export default Experience;