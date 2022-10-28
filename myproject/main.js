import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Sphere, Vector2, Vector3 } from "three";
import shader from "./shaders/vertex.glsl"
import fragShader from "./shaders/fragment.glsl"
import atmoshereVertex from "./shaders/atmosphereVertex.glsl"
import atmostphereFragmenet from "./shaders/atmosphereFragement.glsl"

const mouse= new THREE.Vector2();


console.log(shader)
const loader = new GLTFLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  antialias:true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

 
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);


const sphere= new THREE.Mesh(new THREE.SphereGeometry(5,50,50), new THREE.ShaderMaterial({
  //color:0xff0000
  vertexShader:shader,
  fragmentShader:fragShader,
  uniforms:{
    globeTexture:{
      value:new THREE.TextureLoader().load('./img/globe.jpeg')
    }
  }

}))

const atmosphere= new THREE.Mesh(new THREE.SphereGeometry(5,50,50), new THREE.ShaderMaterial({
  vertexShader:atmoshereVertex,
  fragmentShader:atmostphereFragmenet,
  blending:THREE.AdditiveBlending,
  side:THREE.BackSide
}))

atmosphere.scale.set(1.1,1.1,1.1);

camera.position.z=15

// scene.add(lightHelper, gridHelper);
scene.add(sphere)
scene.add(atmosphere)

const mouseMove={
  x: undefined,
  y:undefined

}

window.addEventListener('mousemove',(e)=>{
  mouseMove.x=(e.clientX/innerWidth)*2-1
  mouseMove.yu=(e.clientY/innerHeight)*2+1

  

})
var clock = new THREE.Clock();
var time = 0;
var delta = 0;

// const controls = new OrbitControls(camera, renderer.domElement);
function animate() {
  requestAnimationFrame(animate);
  // controls.update();
  renderer.render(scene, camera);
  delta = clock.getDelta();
  time += delta;
  sphere.rotation.x = time * 4;
  sphere.position.y = 0.5 + Math.abs(Math.sin(time * 3)) * 2;
  sphere.position.z = Math.sin(time) * 4;
 
  atmosphere.rotation.x = time * 4;
  atmosphere.position.y = 0.5 + Math.abs(Math.sin(time * 3)) * 2;
  atmosphere.position.z = Math.sin(time) * 4;
}
animate();
