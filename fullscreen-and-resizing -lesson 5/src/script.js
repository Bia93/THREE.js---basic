import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth, //pt a fi pe tot ecranul-it will get the size of the viewport
  height: window.innerHeight, //pt a fi pe tot ecranu;
};
//Pt resize a ferestrei
window.addEventListener("resize", function test() {
  //Update sizes
  (sizes.width = window.innerWidth), //pt a fi pe tot ecranul-it will get the size of the viewport
    (sizes.height = window.innerHeight); //pt a fi pe tot ecranu;
  //Update camera
  camera.updateProjectionMatrix(); //dam update la scale rotation etc
  //Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
//How to make it fullscreen- we make a function
//when i doule click the window will come full size
window.addEventListener("dblclick", function () {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen(); //am pus canvas pt ca asta ne interesa dar putem face pt orice
  } else {
    this.document.exitFullscreen();
  }
});
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
