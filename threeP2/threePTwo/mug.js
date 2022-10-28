import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointLightHelper } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./muge.css"

const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const loader = new GLTFLoader();
const renderer = new THREE.WebGLRenderer();

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

  loader.load(
    "./models/mug.glb",
    function (gltf) {
      
      scene.add(gltf.scene);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.log("An error happened", { error });
    }
  );



function createPlane() {
  const geometry = new THREE.CircleGeometry(5, 32);
const material = new THREE.MeshPhysicalMaterial({})
material.reflectivity = 1
material.transmission = 1.0
material.roughness = 0.2
material.metalness = 0
material.clearcoat = 0.3
material.clearcoatRoughness = 0.25
material.color = new THREE.Color(0xffffff)
material.ior = 1.2
material.thickness = 10.0
  const circle = new THREE.Mesh(geometry, material);
  circle.rotateX(-Math.PI / 2);
  circle.position.y = -1.5;
  scene.add(circle);
}



createPlane();

renderer.setClearColor(0xffffff);

camera.position.z = 10;
const controls = new OrbitControls(camera, renderer.domElement);

controls.minPolarAngle = 0; 
controls.maxPolarAngle = Math.PI / 2;
controls.enableZoom = false;

function animate() {
  requestAnimationFrame(animate);

  scene.traverse(function(object){
    if (object.isMesh && object.name=="Cube001"){
        object.rotation.y+=0.01
    }
  })

  controls.enablePan = false;
  controls.update();

  renderer.render(scene, camera);
}
animate();
