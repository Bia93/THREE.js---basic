import * as THREE from "three";
import { Material, MeshPhysicalMaterial } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.JS";
/**
 * Base
 */
//TEXTURES
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg"
);
const doorNormalTexture = textureLoader.load("./textures/door/height.jpg");
const doorHeightTexture = textureLoader.load("./textures/door/normal.jpg");
const matcapTexture = textureLoader.load("./textures/matcaps/3.png");
const gradientTexture = textureLoader.load("./textures/gradients/3.jpg");
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//Objects
//--VARIANTA LUI---
//MeshBasicMaterial
//const material = new THREE.MeshBasicMaterial();
//material.map = doorColorTexture;
//material.color = new THREE.Color("yellow");
//material.wireframe = true;
// material.side = THREE.DoubleSide;

//MeshNormalMaterial
//const material = new THREE.MeshNormalMaterial();

//MeshMatcapMaterial
//const material = new THREE.MeshMatcapMaterial();
//material.matcap = matcapTexture;

//MeshDeptMaterial

//const material = new THREE.MeshDepthMaterial();

//MeshLambertMaterial -THAT REQUIRES LIGHT
//is the most performant material that uses the light
//const material = new THREE.MeshLambertMaterial();
//we are gonna add 2 lights
//Lights
//const ambientLight = new THREE.AmbientLight(0xffffff, 1); //COLOR AND INTENSITY
//scene.add(ambientLight);
//const pointLight = new THREE.PointLight(0xffffff, 30); //color and intensity
//pointLight.position.x = 2;
//pointLight.position.y = 3;
//pointLight.position.z = 4;
//scene.add(pointLight);

//MeshPointMaterial
//const material = new THREE.MeshPhongMaterial();
//material.shininess = 100;
//material.spectacular = new THREE.Color(0x1188ff);

//MeshToonMaterial
//const material = new THREE.MeshStandardMaterial();
//material.metalness = 0.45;
//material.roughness = 0.65;
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.map = doorColorTexture;
material.aoMap = doorAmbientOcclusionTexture;

// GUI
const gui = new GUI();
gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
sphere.position.x = -1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
);
torus.position.x = 1.5;

scene.add(sphere, plane, torus);
//---VARIANTA MEA-----
//const geometry1 = new THREE.SphereGeometry(0.5, 16, 16);
//const material1 = new THREE.MeshBasicMaterial({ map: doorColorTexture });
//const sphere = new THREE.Mesh(geometry1, material1);
//scene.add(sphere);
//sphere.position.x = -1.5;

//const geometry2 = new THREE.TorusGeometry(0.3, 0.2, 16, 132);
//const material2 = new THREE.MeshBasicMaterial({ map: doorColorTexture });
//const torus = new THREE.Mesh(geometry2, material2);
//scene.add(torus);
//torus.position.x = 1.5;
//const geometry3 = new THREE.PlaneGeometry(1, 1);
//const material3 = new THREE.MeshBasicMaterial({
// color: 0xf4f00,
// side: THREE.DoubleSide,
//});
//const plane3 = new THREE.Mesh(geometry3, material3);
//scene.add(plane3);
//const ambientLight = new THREE.AmbientLight(0xffffff, 1);
//scene.add(ambientLight);

//const pointLight = new THREE.PointLight(0xffffff, 30);
//pointLight.position.x = 2;
//pointLight.position.y = 3;
//pointLight.position.z = 4;

//scene.add(pointLight);

//Environment map
const rgbeLoader = new RGBELoader();
rgbeLoader.load("./textures/environmentMap/2k.hdr", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = environmentMap;
  scene.environment = environmentMap;
});
/**
 *
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
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 2;
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

  // Update controls
  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  plane.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
