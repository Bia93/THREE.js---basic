//in three js objects have position properties
import * as THREE from "three"; //ES modules
import { EventDispatcher } from "three";

//using DOM
const canvas = document.querySelector("canvas.webgl");
//console.log(canvas);
console.log(THREE);
//to use a THREE.js class, we need to instantiate it
//we need 4 elements:

//we add scene
const scene = new THREE.Scene();

//we add objects
const geometry = new THREE.BoxGeometry(1, 1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "green" });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh); //we are calling the scene; and we add the ,mesh

//position
//mesh.position.x = 0.7;
//mesh.position.y = -0.6;
//mesh.position.z = 1;
mesh.position.set(0.7, -0.6, 1);
//mesh is an object
//Scale
mesh.scale.set(1, 2, 1);
//Rotation
mesh.rotation.y = Math.PI * 0.6;
//Axes helper
const axesHelper = new THREE.AxesHelper(); //it s an object so we have to add to the scene
scene.add(axesHelper);

//sizes
const sizes = {
  width: 800,
  height: 600,
};

//we add camera
//perspective camera-one of them
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
//camera is an object
camera.position.z = 3; //x,y,z //we move the camera backward-hats why we put z

scene.add(camera);
camera.lookAt(mesh.position);
//render-the render kinda take a picture of your scene and provide that picture on the canvas that we are gonna create right after   <canvas class="webgl"></canvas> in html
//we are gonna use webgl renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
}); //i need to provide parameter thats why i use object
//we need to resize the renderer
renderer.setSize(sizes.width, sizes.height);
//first renderer
renderer.render(scene, camera); //we ask our renderer to take a picture of the scene seen  from the camera point of view ( that we see the black square)
