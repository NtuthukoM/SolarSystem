import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const geometry = new THREE.SphereGeometry( 1, 32, 16 ); 
const material = new THREE.MeshBasicMaterial( { color: 'yellow' } );
const sun = new THREE.Mesh( geometry, material );
scene.add(sun);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
const controls = new OrbitControls( camera, renderer.domElement );
camera.position.z = 5;
controls.update();
const loader = new GLTFLoader();

document.body.appendChild( renderer.domElement );
function animate() {
    sun.rotation.x += 0.01;
    sun.rotation.y += 0.01;
    controls.update();
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );