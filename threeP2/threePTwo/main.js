import "./style.css";

import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointLightHelper } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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

var count = 6;

for (let i = 0; i < count; i++) {
  loader.load(
    "./models/mug.glb",
    function (gltf) {
      const mesh = gltf.scene;
      const t = (i / count) * 2 * Math.PI;
      
      
      mesh.position.x = Math.cos(t) * 9;
      mesh.position.z = Math.sin(t) * 9;
      gltf.name = "MUGS";
      console.log(mesh.name)

      scene.add(gltf.scene);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.log("An error happened", { error });
    }
  );
}


loader.load(
  "./models/table.glb",
  function (gltf) {
    const mesh = gltf.scene;
    mesh.name="model"
    mesh.scale.set(2,2,2)

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
  const color3 = new THREE.Color("rgb(207, 185, 151)");
  const material = new THREE.MeshBasicMaterial({ color: color3 });
  const circle = new THREE.Mesh(geometry, material);
  circle.rotateX(-Math.PI / 2);
  circle.position.y = -1.5;
  circle.scale.set(3, 3, 3);
  scene.add(circle);
}


/* Buttons to handle scene switch */
function changeScene(){
  var block= document.getElementById("scene2")
  scene=block
}


const scene2 = new THREE.Scene();

const geometry2 = new THREE.SphereGeometry(100, 10, 10);
const material2 = new THREE.MeshNormalMaterial();

const mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.set(0, 0, 150);
scene2.add(mesh2); // so note need to be able to switch this on 

createPlane();

renderer.setClearColor(0xffffff);

camera.position.z = 25;
const controls = new OrbitControls(camera, renderer.domElement);

controls.minPolarAngle = 0; 
controls.maxPolarAngle = Math.PI / 2;
controls.enableZoom = false;

function animate() {
  requestAnimationFrame(animate);

  controls.enablePan = false;
  controls.update();
  scene.traverse(function (object) {
    if (object.isMesh === true && object.name.match("Cube001")) {
      object.material.wireframe = true;
    }
  });
  TWEEN.update();
  renderer.render(scene, camera);
}
animate();
