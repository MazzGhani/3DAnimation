import './style.css'
import * as THREE from 'three' 
import { FirstPersonControls } from '../../FirstPersonControls';

const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector("#bg")
});

var scene= new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45,
  window.innerWidth/window.innerHeight,0.1,1000)


var rollControls = new FirstPersonControls(camera,renderer.domElement)
rollControls.enabled=true;
rollControls.activeLook=true
rollControls.lookVertical=true
rollControls.constrainVertical=true
rollControls.verticalMax=Math.PI /1.7
rollControls.verticalMax=Math.PI/2,3



const geometry = new THREE.SphereGeometry( 15, 32, 16 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00,wireframe:true } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50)
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

function animate(){
  requestAnimationFrame(animate)
  rollControls.update(0.3)
  renderer.render(scene, camera);

}

animate();