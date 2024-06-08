import * as THREE from "three";
import gsap from "gsap"; // we are gonna use to create animation like tweens, timelines, stuff
console.log(gsap); //gsap-its called greensock
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

//Animations
//The primary purpose of requestAnimationFrame is not to run code on each frame.
//requestAnimationFrame will execute the function you provide on the next frame. But then, if this function also uses requestAnimationFrame to execute that same function on the next frame, you'll end up with your function being executed on each frame forever which is exactly what we want.
//Create a function named tick and call this function once. In this function, use window.requestAnimationFrame(...) to call this same function on the next frame:
//Clock
//const clock = new THREE.Clock();
gsap.to(mesh.position, { duration: 1, delay: 0, x: 2 }); // we are animate the mesh position and then we have to send an object to specify the destination of the different proprierties
gsap.to(mesh.position, { duration: 1, delay: 1, x: 0 });
const animationLoop = () => {
  //Clock
  //const elapsedTime = clock.getElapsedTime();
  //console.log(elapsedTime);
  //Update objects
  //mesh.position.x = Math.sin(elapsedTime); //my cube is moving
  //mesh.position.y = Math.cos(elapsedTime);
  //mesh.rotation.x += -0.001; //or rotation
  //the cube is rotation at the same speed regardless of the frame rate
  //render
  renderer.render(scene, camera);

  window.requestAnimationFrame(animationLoop); //js will call it on the next frame/my computer is running 60 frames per seconds
};
animationLoop();
