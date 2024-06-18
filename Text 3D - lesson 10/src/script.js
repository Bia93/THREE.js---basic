import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { LessStencilFunc, TetrahedronGeometry } from "three";
//console.log(typefaceFont);
/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
//we add axes helper to see where is the center for the wrting
//const axesHelper = new THREE.AxesHelper(4);
//scene.add(axesHelper);
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/3.png");
//console.log(matcapTexture);

//FONTS
const fontLoader = new FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Bianca Grigore", {
    font: font,
    size: 0.5,
    depth: 0.2,
    curveSegments: 6,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });

  //---PRIMA VARIANTA DE CENTRAT TEXTUL
  //textGeometry.computeBoundingBox();
  //textGeometry.translate(
  // -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
  // -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
  // -(textGeometry.boundingBox.max.z - 0.03) * 0.5
  // );
  //textGeometry.computeBoundingBox();

  // console.log(textGeometry.boundingBox);

  // --A DOUA VARIANTA DE CENTRAT TEXTUL
  textGeometry.center();
  const textMaterial = new THREE.MeshMatcapMaterial({ map: matcapTexture });
  const text = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(text);
});

/**
 * Object
 *
 */
const geometry1 = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
const material1 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const spheres = [];
console.log(spheres);

for (let i = 0; i < 100; i++) {
  const sphere = new THREE.Mesh(geometry1, material1);
  scene.add(sphere);
  spheres.push(sphere);
  //console.log(sphere);
  sphere.position.x = (Math.random() - 0.5) * 10;
  sphere.position.y = (Math.random() - 0.5) * 10;
  sphere.position.z = (Math.random() - 0.5) * 10;
  sphere.rotation.x = Math.random() * Math.PI;
  sphere.rotation.y = Math.random() * Math.PI;
  //sphere.rotation.y += 0.04;
}
const geometry2 = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
const material2 = new THREE.MeshBasicMaterial({ color: "blue" });
const sphere1 = new THREE.Mesh(geometry2, material2);
sphere1.position.x = 3;
scene.add(sphere1);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  86,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 2;
camera.position.y = 1;
camera.position.z = 4;
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
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  for (let i = 0; i < spheres.length; i++) {
    spheres[i].rotation.y += 0.05;
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
