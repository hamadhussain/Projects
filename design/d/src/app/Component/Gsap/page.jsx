// // // // // // // // // // pages/index.js
// // // // // // // // // 'use client'
// // // // // // // // // import { useEffect } from 'react';
// // // // // // // // // import gsap from 'gsap';
// // // // // // // // // import { MotionPathPlugin, ScrollTrigger } from 'gsap/all';

// // // // // // // // // // Register GSAP plugins
// // // // // // // // // gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

// // // // // // // // // // Helper function for path easing
// // // // // // // // // function pathEase(path, config = {}) {
// // // // // // // // //   let axis = config.axis || "y",
// // // // // // // // //       precision = config.precision || 1,
// // // // // // // // //       rawPath = MotionPathPlugin.cacheRawPathMeasurements(MotionPathPlugin.getRawPath(gsap.utils.toArray(path)[0]), Math.round(precision * 12)),
// // // // // // // // //       useX = axis === "x",
// // // // // // // // //       start = rawPath[0][useX ? 0 : 1],
// // // // // // // // //       end = rawPath[rawPath.length - 1][rawPath[rawPath.length-1].length - (useX ? 2 : 1)],
// // // // // // // // //       range = end - start,
// // // // // // // // //       l = Math.round(precision * 200),
// // // // // // // // //       inc = 1 / l,
// // // // // // // // //       positions = [0],
// // // // // // // // //       a = [],
// // // // // // // // //       minIndex = 0,
// // // // // // // // //       smooth = [0],
// // // // // // // // //       minChange = (1 / l) * 0.6,
// // // // // // // // //       smoothRange = config.smooth === true ? 7 : Math.round(config.smooth) || 0,
// // // // // // // // //       fullSmoothRange = smoothRange * 2,
// // // // // // // // //       getClosest = p => {
// // // // // // // // //         while (positions[minIndex] <= p && minIndex++ < l) { }
// // // // // // // // //         a.push((p - positions[minIndex-1]) / (positions[minIndex] - positions[minIndex - 1]) * inc + minIndex * inc);
// // // // // // // // //         smoothRange && a.length > smoothRange && (a[a.length - 1] - a[a.length - 2] < minChange) && smooth.push(a.length - smoothRange);
// // // // // // // // //       },
// // // // // // // // //       i = 1;
// // // // // // // // //   for (; i < l; i++) {
// // // // // // // // //     positions[i] = (MotionPathPlugin.getPositionOnPath(rawPath, i / l)[axis] - start) / range;
// // // // // // // // //   }
// // // // // // // // //   positions[l] = 1;
// // // // // // // // //   for (i = 0; i < l; i++) {
// // // // // // // // //     getClosest(i / l);
// // // // // // // // //   }
// // // // // // // // //   a.push(1); // must end at 1.
// // // // // // // // //   if (smoothRange) { // smooth at the necessary indexes where a small difference was sensed. Make it a linear change over the course of the fullSmoothRange
// // // // // // // // //     smooth.push(l-fullSmoothRange+1);
// // // // // // // // //     smooth.forEach(i => {
// // // // // // // // //       let start = a[i],
// // // // // // // // //           j = Math.min(i + fullSmoothRange, l),
// // // // // // // // //           inc = (a[j] - start) / (j - i),
// // // // // // // // //           c = 1;
// // // // // // // // //       i++;
// // // // // // // // //       for (; i < j; i++) {
// // // // // // // // //         a[i] = start + inc * c++;
// // // // // // // // //       }
// // // // // // // // //     });
// // // // // // // // //   }
// // // // // // // // //   return p => {
// // // // // // // // //     let i = p * l,
// // // // // // // // //         s = a[i | 0];
// // // // // // // // //     return i ? s + (a[Math.ceil(i)] - s) * (i % 1) : 0;
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // export default function Home() {
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     gsap.set("#motionSVG", { scale: 0.7, autoAlpha: 1 });
// // // // // // // // //     gsap.set("#tractor", { transformOrigin: "50% 50%" });

// // // // // // // // //     let rotateTo = gsap.quickTo("#tractor", "rotation"),
// // // // // // // // //         prevDirection = 0;

// // // // // // // // //     gsap.to("#motionSVG", {
// // // // // // // // //       scrollTrigger: {
// // // // // // // // //         trigger: "#motionPath",
// // // // // // // // //         start: "top center",
// // // // // // // // //         end: () => "+=" + document.querySelector("#motionPath").getBoundingClientRect().height,
// // // // // // // // //         scrub: 0.5,
// // // // // // // // //         markers: true,
// // // // // // // // //         onUpdate: self => {
// // // // // // // // //           if (prevDirection !== self.direction) { // only run this when we're changing direction
// // // // // // // // //             rotateTo(self.direction === 1 ? 0 : -180);
// // // // // // // // //             prevDirection = self.direction;
// // // // // // // // //           }
// // // // // // // // //         }
// // // // // // // // //       },
// // // // // // // // //       ease: pathEase("#motionPath"), // a custom ease that helps keep the tractor centered
// // // // // // // // //       immediateRender: true,
// // // // // // // // //       motionPath: {
// // // // // // // // //         path: "#motionPath",
// // // // // // // // //         align: "#motionPath",
// // // // // // // // //         alignOrigin: [0.5, 0.5],
// // // // // // // // //         autoRotate: 90,
// // // // // // // // //       }
// // // // // // // // //     });

// // // // // // // // //   }, []);

// // // // // // // // //   return (
// // // // // // // // //     <div>

// // // // // // // // //       <main>
// // // // // // // // //         <h1>Welcome to GSAP with Next.js</h1>
// // // // // // // // //         <div>
// // // // // // // // //           <svg id="motionSVG" width="100" height="100">
// // // // // // // // //             {/* SVG content */}
// // // // // // // // //           </svg>
// // // // // // // // //           <div id="motionPath" style={{ height: '200vh' }}>
// // // // // // // // //             {/* Path content */}
// // // // // // // // //           </div>
// // // // // // // // //           <svg id="tractor" width="50" height="50">
// // // // // // // // //             {/* Tractor SVG content */}
// // // // // // // // //           </svg>
// // // // // // // // //         </div>
// // // // // // // // //       </main>

// // // // // // // // //       <footer>
// // // // // // // // //         <p>Powered by Next.js and GSAP</p>
// // // // // // // // //       </footer>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // pages/index.js
// // // // // // // // 'use client';
// // // // // // // // import { useEffect } from 'react';
// // // // // // // // import gsap from 'gsap';
// // // // // // // // import { MotionPathPlugin, ScrollTrigger } from 'gsap/all';

// // // // // // // // // Register GSAP plugins
// // // // // // // // gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

// // // // // // // // // Helper function for path easing
// // // // // // // // function pathEase(path, config = {}) {
// // // // // // // //   let axis = config.axis || 'y',
// // // // // // // //       precision = config.precision || 1,
// // // // // // // //       rawPath = MotionPathPlugin.getRawPath(gsap.utils.toArray(path)[0]),
// // // // // // // //       useX = axis === 'x',
// // // // // // // //       start, end, range, l, inc, positions, a, minIndex, smooth, minChange, smoothRange, fullSmoothRange, getClosest, i;

// // // // // // // //   if (!rawPath || rawPath.length === 0) {
// // // // // // // //     console.error('Invalid path data');
// // // // // // // //     return p => 0; // Return a default value or handle as needed
// // // // // // // //   }

// // // // // // // //   rawPath = MotionPathPlugin.cacheRawPathMeasurements(rawPath, Math.round(precision * 12));
// // // // // // // //   start = rawPath[0][useX ? 0 : 1];
// // // // // // // //   end = rawPath[rawPath.length - 1][rawPath[rawPath.length - 1].length - (useX ? 2 : 1)];
// // // // // // // //   range = end - start;
// // // // // // // //   l = Math.round(precision * 200);
// // // // // // // //   inc = 1 / l;
// // // // // // // //   positions = [0];
// // // // // // // //   a = [];
// // // // // // // //   minIndex = 0;
// // // // // // // //   smooth = [0];
// // // // // // // //   minChange = (1 / l) * 0.6;
// // // // // // // //   smoothRange = config.smooth === true ? 7 : Math.round(config.smooth) || 0;
// // // // // // // //   fullSmoothRange = smoothRange * 2;

// // // // // // // //   getClosest = p => {
// // // // // // // //     while (positions[minIndex] <= p && minIndex++ < l) {}
// // // // // // // //     a.push((p - positions[minIndex - 1]) / (positions[minIndex] - positions[minIndex - 1]) * inc + minIndex * inc);
// // // // // // // //     smoothRange && a.length > smoothRange && (a[a.length - 1] - a[a.length - 2] < minChange) && smooth.push(a.length - smoothRange);
// // // // // // // //   };

// // // // // // // //   for (i = 1; i < l; i++) {
// // // // // // // //     positions[i] = (MotionPathPlugin.getPositionOnPath(rawPath, i / l)[axis] - start) / range;
// // // // // // // //   }
// // // // // // // //   positions[l] = 1;
// // // // // // // //   for (i = 0; i < l; i++) {
// // // // // // // //     getClosest(i / l);
// // // // // // // //   }
// // // // // // // //   a.push(1); // must end at 1.
// // // // // // // //   if (smoothRange) {
// // // // // // // //     smooth.push(l - fullSmoothRange + 1);
// // // // // // // //     smooth.forEach(i => {
// // // // // // // //       let start = a[i],
// // // // // // // //           j = Math.min(i + fullSmoothRange, l),
// // // // // // // //           inc = (a[j] - start) / (j - i),
// // // // // // // //           c = 1;
// // // // // // // //       i++;
// // // // // // // //       for (; i < j; i++) {
// // // // // // // //         a[i] = start + inc * c++;
// // // // // // // //       }
// // // // // // // //     });
// // // // // // // //   }
// // // // // // // //   return p => {
// // // // // // // //     let i = p * l,
// // // // // // // //         s = a[i | 0];
// // // // // // // //     return i ? s + (a[Math.ceil(i)] - s) * (i % 1) : 0;
// // // // // // // //   };
// // // // // // // // }

// // // // // // // // export default function Home() {
// // // // // // // //   useEffect(() => {
// // // // // // // //     gsap.set('#motionSVG', { scale: 0.7, autoAlpha: 1 });
// // // // // // // //     gsap.set('#tractor', { transformOrigin: '50% 50%' });

// // // // // // // //     let rotateTo = gsap.quickTo('#tractor', 'rotation'),
// // // // // // // //         prevDirection = 0;

// // // // // // // //     gsap.to('#motionSVG', {
// // // // // // // //       scrollTrigger: {
// // // // // // // //         trigger: '#motionPath',
// // // // // // // //         start: 'top center',
// // // // // // // //         end: () => "+=" + document.querySelector('#motionPath').getBoundingClientRect().height,
// // // // // // // //         scrub: 0.5,
// // // // // // // //         markers: true,
// // // // // // // //         onUpdate: self => {
// // // // // // // //           if (prevDirection !== self.direction) { // only run this when we're changing direction
// // // // // // // //             rotateTo(self.direction === 1 ? 0 : -180);
// // // // // // // //             prevDirection = self.direction;
// // // // // // // //           }
// // // // // // // //         }
// // // // // // // //       },
// // // // // // // //       ease: pathEase('#motionPath'), // a custom ease that helps keep the tractor centered
// // // // // // // //       immediateRender: true,
// // // // // // // //       motionPath: {
// // // // // // // //         path: '#motionPath',
// // // // // // // //         align: '#motionPath',
// // // // // // // //         alignOrigin: [0.5, 0.5],
// // // // // // // //         autoRotate: 90,
// // // // // // // //       }
// // // // // // // //     });

// // // // // // // //   }, []);

// // // // // // // //   return (
// // // // // // // //     <div>
// // // // // // // //       <main>
// // // // // // // //         <h1>Welcome to GSAP with Next.js</h1>
// // // // // // // //         <div>
// // // // // // // //           <svg id="motionSVG" width="100" height="100">
// // // // // // // //             {/* SVG content */}
// // // // // // // //           </svg>
// // // // // // // //           <div id="motionPath" style={{ height: '200vh' }}>
// // // // // // // //             {/* Path content */}
// // // // // // // //           </div>
// // // // // // // //           <svg id="tractor" width="50" height="50">
// // // // // // // //             {/* Tractor SVG content */}
// // // // // // // //           </svg>
// // // // // // // //         </div>
// // // // // // // //       </main>
// // // // // // // //       <footer>
// // // // // // // //         <p>Powered by Next.js and GSAP</p>
// // // // // // // //       </footer>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // src/app/Component/Gsap/page.jsx
// // // // // // // 'use client';
// // // // // // // import { useEffect } from 'react';
// // // // // // // import gsap from 'gsap';
// // // // // // // import { MotionPathPlugin, ScrollTrigger } from 'gsap/all';

// // // // // // // // Register GSAP plugins
// // // // // // // gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

// // // // // // // // Helper function for path easing
// // // // // // // function pathEase(path, config = {}) {
// // // // // // //   let axis = config.axis || 'y',
// // // // // // //       precision = config.precision || 1,
// // // // // // //       rawPath = MotionPathPlugin.getRawPath(gsap.utils.toArray(path)[0]),
// // // // // // //       useX = axis === 'x',
// // // // // // //       start, end, range, l, inc, positions, a, minIndex, smooth, minChange, smoothRange, fullSmoothRange, getClosest, i;

// // // // // // //   if (!rawPath || rawPath.length === 0) {
// // // // // // //     console.error('Invalid path data');
// // // // // // //     return p => 0; // Return a default value or handle as needed
// // // // // // //   }

// // // // // // //   rawPath = MotionPathPlugin.cacheRawPathMeasurements(rawPath, Math.round(precision * 12));
// // // // // // //   start = rawPath[0][useX ? 0 : 1];
// // // // // // //   end = rawPath[rawPath.length - 1][rawPath[rawPath.length - 1].length - (useX ? 2 : 1)];
// // // // // // //   range = end - start;
// // // // // // //   l = Math.round(precision * 200);
// // // // // // //   inc = 1 / l;
// // // // // // //   positions = [0];
// // // // // // //   a = [];
// // // // // // //   minIndex = 0;
// // // // // // //   smooth = [0];
// // // // // // //   minChange = (1 / l) * 0.6;
// // // // // // //   smoothRange = config.smooth === true ? 7 : Math.round(config.smooth) || 0;
// // // // // // //   fullSmoothRange = smoothRange * 2;

// // // // // // //   getClosest = p => {
// // // // // // //     while (positions[minIndex] <= p && minIndex++ < l) {}
// // // // // // //     a.push((p - positions[minIndex - 1]) / (positions[minIndex] - positions[minIndex - 1]) * inc + minIndex * inc);
// // // // // // //     smoothRange && a.length > smoothRange && (a[a.length - 1] - a[a.length - 2] < minChange) && smooth.push(a.length - smoothRange);
// // // // // // //   };

// // // // // // //   for (i = 1; i < l; i++) {
// // // // // // //     positions[i] = (MotionPathPlugin.getPositionOnPath(rawPath, i / l)[axis] - start) / range;
// // // // // // //   }
// // // // // // //   positions[l] = 1;
// // // // // // //   for (i = 0; i < l; i++) {
// // // // // // //     getClosest(i / l);
// // // // // // //   }
// // // // // // //   a.push(1); // must end at 1.
// // // // // // //   if (smoothRange) {
// // // // // // //     smooth.push(l - fullSmoothRange + 1);
// // // // // // //     smooth.forEach(i => {
// // // // // // //       let start = a[i],
// // // // // // //           j = Math.min(i + fullSmoothRange, l),
// // // // // // //           inc = (a[j] - start) / (j - i),
// // // // // // //           c = 1;
// // // // // // //       i++;
// // // // // // //       for (; i < j; i++) {
// // // // // // //         a[i] = start + inc * c++;
// // // // // // //       }
// // // // // // //     });
// // // // // // //   }
// // // // // // //   return p => {
// // // // // // //     let i = p * l,
// // // // // // //         s = a[i | 0];
// // // // // // //     return i ? s + (a[Math.ceil(i)] - s) * (i % 1) : 0;
// // // // // // //   };
// // // // // // // }

// // // // // // // export default function Home() {
// // // // // // //   useEffect(() => {
// // // // // // //     const motionSVG = document.querySelector('#motionSVG');
// // // // // // //     const motionPath = document.querySelector('#motionPath');
// // // // // // //     const tractor = document.querySelector('#tractor');

// // // // // // //     if (!motionSVG || !motionPath || !tractor) {
// // // // // // //       console.error('One or more elements not found');
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     gsap.set(motionSVG, { scale: 0.7, autoAlpha: 1 });
// // // // // // //     gsap.set(tractor, { transformOrigin: '50% 50%' });

// // // // // // //     let rotateTo = gsap.quickTo(tractor, 'rotation'),
// // // // // // //         prevDirection = 0;

// // // // // // //     gsap.to(motionSVG, {
// // // // // // //       scrollTrigger: {
// // // // // // //         trigger: motionPath,
// // // // // // //         start: 'top center',
// // // // // // //         end: () => "+=" + motionPath.getBoundingClientRect().height,
// // // // // // //         scrub: 0.5,
// // // // // // //         markers: true,
// // // // // // //         onUpdate: self => {
// // // // // // //           if (prevDirection !== self.direction) { // only run this when we're changing direction
// // // // // // //             rotateTo(self.direction === 1 ? 0 : -180);
// // // // // // //             prevDirection = self.direction;
// // // // // // //           }
// // // // // // //         }
// // // // // // //       },
// // // // // // //       ease: pathEase(motionPath), // a custom ease that helps keep the tractor centered
// // // // // // //       immediateRender: true,
// // // // // // //       motionPath: {
// // // // // // //         path: motionPath,
// // // // // // //         align: motionPath,
// // // // // // //         alignOrigin: [0.5, 0.5],
// // // // // // //         autoRotate: 90,
// // // // // // //       }
// // // // // // //     });

// // // // // // //   }, []);

// // // // // // //   return (
// // // // // // //     <div>
// // // // // // //       <main>
// // // // // // //         <h1>Welcome to GSAP with Next.js</h1>
// // // // // // //         <div>
// // // // // // //           <svg id="motionSVG" width="100" height="100">
// // // // // // //           <svg id="linesvg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 869 3002" xml:space="preserve">
// // // // // // //         <style type="text/css">
// // // // // // //             .st0{fill:none;stroke:red;stroke-width:10;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
// // // // // // //         </style>
// // // // // // //         <path id="motionPath" class="st0" d="M155.395,383.31 C152.773,390.548 92.401,646.162 250.215,727.041 453.479,831.213 835.629,715.412 832.33,924.268 830.006,1071.385 20.339,1040.965 22.58,1206.204 24.517,1348.994 835.125,1320.378 832.275,1445.504 827.175,1669.362 57.235,1623.348 56.673,1760.63 55.674,2004.272 837.157,1936.609 837.205,2053.845 837.283,2246.807 137.92199,2252.96102 137.92199,2252.96102 " />
// // // // // // //         <g id="motionSVG">
// // // // // // //           <g id="tractor">
// // // // // // //             <path id="Vector" d="M30.4786 2.37109C30.1944 1.6945 28.2463 1.46897 26.5629 1.44392L26.561 1.44147C26.5079 1.44147 26.4533 1.44228 26.3993 1.4427C26.3456 1.44228 26.2909 1.44147 26.2378 1.44147L26.2359 1.44392C24.5526 1.46897 22.6045 1.6945 22.3202 2.37109C22.0174 3.09168 22.0406 4.97436 22.46 5.53219C22.46 5.53219 23.2008 6.28613 26.0526 6.36144C26.1275 6.3654 26.2033 6.36894 26.2845 6.36894C26.3247 6.36894 26.36 6.3673 26.3993 6.36705C26.4388 6.3673 26.4742 6.36894 26.5143 6.36894C26.5955 6.36894 26.6713 6.3654 26.7463 6.36144C29.5982 6.28613 30.3388 5.53219 30.3388 5.53219C30.7582 4.97436 30.7814 3.09168 30.4786 2.37109Z" fill="#2497C9"/>
// // // // // // //             <path id="Vector_2" opacity="0.7" d="M30.4786 2.37109C30.1944 1.6945 28.2463 1.46897 26.5629 1.44392L26.561 1.44147C26.5079 1.44147 26.4533 1.44228 26.3993 1.4427C26.3456 1.44228 26.2909 1.44147 26.2378 1.44147L26.2359 1.44392C24.5526 1.46897 22.6045 1.6945 22.3202 2.37109C22.0174 3.09168 22.0406 4.97436 22.46 5.53219C22.46 5.53219 23.2008 6.28613 26.0526 6.36144C26.1275 6.3654 26.2033 6.36894 26.2845 6.36894C26.3247 6.36894 26.36 6.3673 26.3993 6.36705C26.4388 6.3673 26.4742 6.36894 26.5143 6.36894C26.5955 6.36894 26.6713 6.3654 26.7463 6.36144C29.5982 6.28613 30.3388 5.53219 30.3388 5.53219C30.7582 4.97436 30.7814 3.09168 30.4786 2.37109Z" fill="#566C24"/>
// // // // // // //             <path id="Vector_3" d="M26.331 3.27753C28.4543 3.27753 30.1756 2.91852 30.1756 2.47565C30.1756 2.03278 28.4543 1.67377 26.331 1.67377C24.2077 1.67377 22.4865 2.03278 22.4865 2.47565C22.4865 2.91852 24.2077 3.27753 26.331 3.27753Z" fill="#DFDDB9"/>
// // // // // // //             <path id="Vector_4" d="M29.7363 2.25998C29.3816 1.99099 27.988 1.78998 26.3195 1.78998C24.4229 1.78998 22.8819 2.0497 22.8188 2.37383C25.1195 2.64259 27.4458 2.6043 29.7363 2.25998V2.25998Z" fill="white"/>
// // // // // // //             <path id="Vector_5" opacity="0.5" d="M22.6955 2.99945C22.6955 2.99945 25.0179 4.19793 28.2558 3.47489C28.2558 3.47489 27.7889 6.32589 25.1358 5.98338C22.4821 5.64084 22.6955 2.99945 22.6955 2.99945Z" fill="#BCEE4A"/>
// // // // // // //             <path id="Vector_6" d="M53.0765 2.37109C53.361 1.6945 55.3089 1.46897 56.9923 1.44392L56.9942 1.44147C57.0472 1.44147 57.1018 1.44228 57.1559 1.4427C57.2096 1.44228 57.2643 1.44147 57.3175 1.44147L57.3191 1.44392C59.0028 1.46897 60.9507 1.6945 61.235 2.37109C61.5378 3.09168 61.5146 4.97436 61.0952 5.53219C61.0952 5.53219 60.3544 6.28613 57.5026 6.36144C57.4278 6.3654 57.3519 6.36894 57.2705 6.36894C57.2307 6.36894 57.1952 6.3673 57.1559 6.36705C57.1165 6.3673 57.0811 6.36894 57.0409 6.36894C56.9598 6.36894 56.8839 6.3654 56.8091 6.36144C53.9571 6.28613 53.2163 5.53219 53.2163 5.53219C52.7969 4.97436 52.7739 3.09168 53.0765 2.37109Z" fill="#2497C9"/>          </svg>
// // // // // // //           <div id="motionPath" style={{ height: '200vh' }}>
// // // // // // //             {/* Path content */}
// // // // // // //           </div>
// // // // // // //           <svg id="tractor" width="50" height="50">
// // // // // // //             {/* Tractor SVG content */}
// // // // // // //           </svg>
// // // // // // //         </div>
// // // // // // //       </main>
// // // // // // //       <footer>
// // // // // // //         <p>Powered by Next.js and GSAP</p>
// // // // // // //       </footer>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // 'use client'
// // // // // // // FishComponent.js
// // // // // // import React from 'react';
// // // // // // import { Canvas } from '@react-three/fiber';
// // // // // // import { OrbitControls, useGLTF } from '@react-three/drei';
// // // // // // import { Vector3 } from 'three';

// // // // // // function Fish() {
// // // // // //   const { nodes, materials } = useGLTF('/fish.gltf'); // Assuming you have a fish model in glTF format
// // // // // //   return (
// // // // // //     <group>
// // // // // //       <mesh geometry={nodes.Fish.geometry} material={materials.FishMaterial} />
// // // // // //     </group>
// // // // // //   );
// // // // // // }

// // // // // // const FishScene = () => {
// // // // // //   return (
// // // // // //     <Canvas
// // // // // //       style={{ height: '100vh', width: '100%' }}
// // // // // //       camera={{ position: [0, 1, 5], fov: 50 }}
// // // // // //     >
// // // // // //       <ambientLight intensity={0.5} />
// // // // // //       <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
// // // // // //       <Fish />
// // // // // //       <OrbitControls />
// // // // // //     </Canvas>
// // // // // //   );
// // // // // // }

// // // // // // export default FishScene;

// // // // // 'use client';

// // // // // import React from 'react';
// // // // // import { Canvas } from '@react-three/fiber';
// // // // // import { OrbitControls, useGLTF } from '@react-three/drei';
// // // // // import { Vector3 } from 'three';

// // // // // // Component to load and display the fish model
// // // // // function Fish() {
// // // // //   const { nodes, materials } = useGLTF('/fish.glb'); // Load the fish model (make sure the path is correct)

// // // // //   return (
// // // // //     <group>
// // // // //       <mesh geometry={nodes.Fish.geometry} material={materials.FishMaterial} />
// // // // //     </group>
// // // // //   );
// // // // // }

// // // // // // Component to setup the scene
// // // // // const FishScene = () => {
// // // // //   return (
// // // // //     <Canvas
// // // // //       style={{ height: '100vh', width: '100%' }}
// // // // //       camera={{ position: [0, 1, 5], fov: 50 }}
// // // // //     >
// // // // //       <ambientLight intensity={0.5} />
// // // // //       <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
// // // // //       <Fish />
// // // // //       <OrbitControls />
// // // // //     </Canvas>
// // // // //   );
// // // // // }

// // // // // export default FishScene;

// // // // 'use client';

// // // // import React from 'react';
// // // // import { Canvas } from '@react-three/fiber';
// // // // import { OrbitControls, useGLTF } from '@react-three/drei';

// // // // // Component to load and display the fish model
// // // // function Fish() {
// // // //   const { nodes, materials } = useGLTF('/fish.glb'); // Ensure the model is placed in the public folder

// // // //   // Check the structure of nodes and materials
// // // //   console.log(nodes);
// // // //   console.log(materials);

// // // //   return (
// // // //     <group>
// // // //       {/* Use safe access in case nodes or materials might not be available */}
// // // //       <mesh  geometry={nodes.Fish?.geometry} material={materials.FishMaterial} />
// // // //     </group>
// // // //   );
// // // // }

// // // // // Component to setup the scene
// // // // const FishScene = () => {
// // // //   return (
// // // //     <Canvas
// // // //       style={{ height: '100vh', width: '100%' }}
// // // //       camera={{ position: [0, 1, 5], fov: 50 }}
// // // //     >
// // // //       <ambientLight intensity={0.5} />
// // // //       <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
// // // //       <Fish />
// // // //       <OrbitControls />
// // // //     </Canvas>
// // // //   );
// // // // }

// // // // export default function Home() {
// // // //   return (
// // // //     <div>
// // // //       <h1 className='text-4xl text-center my-4'>3D Fish Model</h1>
// // // //       <FishScene />
// // // //     </div>
// // // //   );
// // // // }

// // // 'use client';

// // // import React, { useState } from 'react';
// // // import { Canvas } from '@react-three/fiber';
// // // import { OrbitControls, useGLTF } from '@react-three/drei';
// // // import * as THREE from 'three';

// // // // Component to load and display the fish model
// // // function Fish({ colors }) {
// // //   const { nodes, materials } = useGLTF('/fish.glb'); // Load the fish model

// // //   // Apply colors to materials if available
// // //   if (materials) {
// // //     for (const materialName in materials) {
// // //       if (colors[materialName]) {
// // //         materials[materialName].color = new THREE.Color(colors[materialName]);
// // //       }
// // //     }
// // //   }

// // //   return (
// // //     <group>
// // //       {/* Ensure the node names match those in your GLTF model */}
// // //       <mesh geometry={nodes.Fish.geometry} material={materials.FishMaterial} />
// // //     </group>
// // //   );
// // // }

// // // // Component to setup the scene
// // // const FishScene = () => {
// // //   const [fishColor, setFishColor] = useState('#ff6347'); // Default color (Tomato)
// // //   const [finColor, setFinColor] = useState('#4682b4');  // Default color (SteelBlue)

// // //   const colors = {
// // //     FishMaterial: fishColor,
// // //     FinMaterial: finColor,
// // //   };

// // //   return (
// // //     <div>
// // //       <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}>
// // //         <label>
// // //           Fish Color:
// // //           <input
// // //             type="color"
// // //             value={fishColor}
// // //             onChange={(e) => setFishColor(e.target.value)}
// // //           />
// // //         </label>
// // //         <label>
// // //           Fin Color:
// // //           <input
// // //             type="color"
// // //             value={finColor}
// // //             onChange={(e) => setFinColor(e.target.value)}
// // //           />
// // //         </label>
// // //       </div>
// // //       <Canvas
// // //         style={{ height: '100vh', width: '100%' }}
// // //         camera={{ position: [0, 1, 5], fov: 50 }}
// // //       >
// // //         <ambientLight intensity={0.5} />
// // //         <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
// // //         <Fish colors={colors} />
// // //         <OrbitControls />
// // //       </Canvas>
// // //     </div>
// // //   );
// // // }

// // // export default FishScene;

// // import Image from "next/image";
// // import React from "react";

// // const page = () => {
// //   return (
// //     <div>
// //       <Image src="/fish.gif" width={400} height={200} />
// //       <div style="width:100%;height:0;padding-bottom:56%;position:relative;">
// //         <iframe
// //           src="https://giphy.com/embed/LmOrgjV7s6sAWuwKxc"
// //           width="100%"
// //           height="100%"
// //           style="position:absolute"
// //           frameBorder="0"
// //           class="giphy-embed"
// //           allowFullScreen
// //         ></iframe>
// //       </div>
// //       <p>
// //         <a href="https://giphy.com/gifs/montereybayaquarium-school-fish-mackerel-LmOrgjV7s6sAWuwKxc">
// //           via GIPHY
// //         </a>
// //       </p>
// //     </div>
// //   );
// // };

// // export default page;



// import Image from "next/image";
// import React from "react";

// const Page = () => {
//   return (
//     <div>
//       <Image src="/fish.gif" width={400} height={200} alt="Animated fish" />
//       <div style={{ width: '100%', height: '0', paddingBottom: '56%', position: 'relative' }}>
//         <iframe
//           src="https://giphy.com/embed/LmOrgjV7s6sAWuwKxc"
//           width="100%"
//           height="100%"
//           style={{ position: 'absolute' }}
//           frameBorder="0"
//           className="giphy-embed"
//           allowFullScreen
//           title="Giphy animation"
//         ></iframe>
//       </div>
//       <p>
//         <a href="https://giphy.com/gifs/montereybayaquarium-school-fish-mackerel-LmOrgjV7s6sAWuwKxc">
//           via GIPHY
//         </a>
//       </p>
//     </div>
//   );
// };

// export default Page;




"use client";
// pages/FishPage.js

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger, MotionPathPlugin } from "gsap/all";
import Image from "next/image";
// import styles from '../styles/FishPage.module.css'; // Ensure you create this CSS file

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const FishPage = () => {
  useEffect(() => {
    const rx = window.innerWidth < 1000 ? window.innerWidth / 1200 : 1;
    const ry = window.innerHeight < 700 ? window.innerHeight / 1200 : 1;

    const path = [
      { x: 800, y: 200 },
      { x: 900, y: 20 },
      { x: 1100, y: 100 },
      { x: 1000, y: 200 },
      { x: 900, y: 20 },
      { x: 10, y: 500 },
      { x: 100, y: 300 },
      { x: 500, y: 400 },
      { x: 1000, y: 200 },
      { x: 1100, y: 300 },
      { x: 400, y: 400 },
      { x: 200, y: 250 },
      { x: 100, y: 300 },
      { x: 500, y: 450 },
      { x: 1100, y: 500 },
    ];

    const scaledPath = path.map(({ x, y }) => ({
      x: x * rx,
      y: y * ry,
    }));

    const sections = document.querySelectorAll("section");
    const fish = document.querySelector(".fish");
    const fishHeadAndBody = document.querySelectorAll(
      ".fish__head, .fish__body"
    );
    const lights = document.querySelectorAll("[data-lights]");
    const rays = document.querySelector("[data-rays]");

    const bubbles = gsap.timeline();
    bubbles.set(".bubbles__bubble", { y: 100 });
    bubbles.to(".bubbles__bubble", {
      scale: 1.2,
      y: -300,
      opacity: 1,
      duration: 2,
      stagger: 0.2,
    });
    bubbles.to(
      ".bubbles__bubble",
      { scale: 1, opacity: 0, duration: 1 },
      "-=1"
    );
    bubbles.pause();

    const tl = gsap.timeline({
      scrollTrigger: { scrub: 1.5 },
    });
    tl.to(fish, {
      motionPath: {
        path: scaledPath,
        align: "self",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
      },
      duration: 10,
      immediateRender: true,
    });
    tl.to(".indicator", { opacity: 0 }, 0);
    tl.to(fish, { rotateX: 180 }, 1);
    tl.to(fish, { rotateX: 0 }, 2.5);
    tl.to(fish, { z: -500, duration: 2 }, 2.5);
    tl.to(fish, { rotateX: 180 }, 4);
    tl.to(fish, { rotateX: 0 }, 5.5);
    tl.to(fish, { z: -50, duration: 2 }, 5);
    tl.to(fish, { rotate: 0, duration: 1 }, "-=1");
    tl.to(".fish__skeleton", { opacity: 0.6, duration: 0.1, repeat: 4 }, "-=3");
    tl.to(fishHeadAndBody, { opacity: 0, duration: 0.1, repeat: 4 }, "-=3");
    tl.to(".fish__inner", { opacity: 0.1, duration: 1 }, "-=1");
    tl.to(".fish__skeleton", { opacity: 0.1, duration: 1 }, "-=1");

    bubbles.play();
    // tl.pause();

    const lightsTl = gsap.timeline({
      scrollTrigger: { scrub: 6 },
    });
    lightsTl.from(
      lights[0],
      {
        x: window.innerWidth * -1,
        y: window.innerHeight,
        ease: "power4.out",
        duration: 80,
      },
      0
    );
    lightsTl.to(
      lights[10],
      {
        x: window.innerWidth,
        y: window.innerHeight * -1,
        ease: "power4.out",
        duration: Infinity,
      },
      "-=5"
    );

    const makeBubbles = (p, i) => {
      const { top, left } = fish.getBoundingClientRect();
      gsap.to(p, { opacity: 1, duration: 1 });
      gsap.set(".bubbles", { x: left, y: top });
      if (bubbles.paused) {
        bubbles.restart();
      }
      if (i > 6) {
        gsap.to(".bubbles", { opacity: 0 });
      }
    };

    const rotateFish = (self) => {
      if (self.direction === -1) {
        gsap.to(fish, { rotationY: 180, duration: 0.4 });
      } else {
        gsap.to(fish, { rotationY: 0, duration: 0.4 });
      }
    };

    const hideText = (p) => {
      gsap.to(p, { opacity: 0, duration: 1 });
    };

    sections.forEach((section, i) => {
      const p = section.querySelector("p");
      gsap.to(p, { opacity: 0 });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        onEnter: () => makeBubbles(p, i),
        onEnterBack: () => {
          if (i <= 6) {
            gsap.to(".bubbles", { opacity: 1 });
          }
        },
        onLeave: () => {
          hideText(p);
          if (i === 0) {
            gsap.to(".rays", {
              opacity: 0,
              y: -500,
              duration: 8,
              ease: "power4.in",
            });
          }
        },
        onLeaveBack: () => hideText(p),
        onUpdate: (self) => rotateFish(self),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      <p className="indicator">
        <span>Scroll</span>
        <span>↓</span>
      </p>

      <div className="fishWrapper">
        <div className="fish">
          <div className="fishSkeleton hover:cursor-pointer">
            <Image src="/fish2.gif" className=" hover:h-96 " width={700} height={100}/>
            
          </div>
          <div className="fishInner">
            <div className="fishBody"></div>
            <div className="fishBody"></div>
            <div className="fishBody"></div>
            <div className="fishBody"></div>
            <div className="fishHead"></div>
            <div className={`fishHead fishHead2`}></div>
            <div className={`fishHead fishHead3`}></div>
            <div className={`fishHead fishHead4'`}></div>
            <div className="fishTailMain"></div>
            <div className="fishTailFork"></div>
            <div className="fishFin"></div>
            <div className={`fishFin fishFin2`}></div>
          </div>
        </div>
      </div>

      <div className="bubbles">
        <div className="bubblesInner">
          <div className="bubblesBubble"></div>
          <div className="bubblesBubble"></div>
          <div className="bubblesBubble"></div>
        </div>
      </div>

      <div className="rays">
        <div data-rays></div>
      </div>

      <div className="lights">
        <div className="lightsGroup" data-lights="1">
          <div className="lightsLight"></div>
          <div className="lightsLight"></div>
          <div className="lightsLight"></div>
          <div className="lightsLight"></div>
          <div className="lightsLight"></div>
          <div className="lightsLight"></div>
          <div className="lightsLight"></div>
          <div className="lightsLight"></div>
        </div>
      </div>

      <div className="content">
        <section>
          <div className="sectionContent">
            <p>In the deepest ocean</p>
          </div>
        </section>
        <section>
          <div className="sectionContent">
            <p>the bottom of the sea</p>
          </div>
        </section>
        <section>
          <div className="sectionContent">
            <p>on the sea bed</p>
          </div>
        </section>
        <section>
          <div className="sectionContent">
            <p>and the little fish</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FishPage;