import './style.css'
import * as THREE from 'three' 
import { FirstPersonControls } from '../../FirstPersonControls';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DoubleSide } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DirectionalLight } from 'three';
import { TWEEN } from 'https://unpkg.com/three@0.139.0/examples/jsm/libs/tween.module.min.js';
const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector("#bg")
});

var scene= new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45,
  window.innerWidth/window.innerHeight,0.1,1000)

var rollControls = new FirstPersonControls(camera,renderer.domElement)
const controls = new OrbitControls(camera, renderer.domElement);

// const geometry = new THREE.SphereGeometry( 15, 32, 16 );
// const material = new THREE.MeshBasicMaterial( { color: 0xffff00,wireframe:true } );
// const sphere = new THREE.Mesh( geometry, material );
// scene.add( sphere );
const color1 = new THREE.Color("rgb(255,255,0)");
const color2 = new THREE.Color("rgb(255,0,0)");
const color3 = new THREE.Color("rgb(255,255,255)");



function createPlanes(){
var geo = new THREE.PlaneGeometry( 100, 100);
var mat = new THREE.MeshBasicMaterial({ color: color1, side: DoubleSide });
var plane = new THREE.Mesh(geo, mat);
scene.add(plane);
plane.rotateX( - Math.PI / 2);
plane.position.x = 15
plane.position.y = 0
plane.position.z = 0

}

function createBox(xPos,yPos,zPos){
 const cubeGeometry = new THREE.BoxGeometry(10, 10, 10)
const  cubeMaterial = new THREE.MeshBasicMaterial({color:color2,wireframe:true  });
const  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = xPos;
cube.position.y = yPos;
cube.position.z = zPos;
scene.add(cube)
}
scene.background = new THREE.Color(color3)
// createPlanes();
// createBox(20,25,10);

const loader = new GLTFLoader();

loader.load( './modules/scene/scene.gltf', function ( gltf ) {
  gltf.scene.scale.setScalar( 0.05 );
  new TWEEN.Tween(gltf.scene.rotation)
  .to({ y: "-" + (Math.PI/2) * 8}, 6000) 
  .delay(2000)
  .repeat(Infinity)
  .easing(TWEEN.Easing.Elastic.InOut)
  .start()

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

const light = new THREE.AmbientLight( 0xfffffff ); // soft white light
scene.add( light );
const direcLight= new THREE.DirectionalLight(0xffff00, 2)
direcLight.position.x=20
scene.add(direcLight)
const clock = new THREE.Clock();



renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(100)
camera.position.setY(25)

document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

function animate(){
  requestAnimationFrame(animate)
  controls.update()
  // rollControls.update(clock.getDelta());
  renderer.render(scene, camera);
  TWEEN.update();

}

animate();