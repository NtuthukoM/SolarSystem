import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const geometry = new THREE.SphereGeometry( 1, 32, 16 ); 
const material = new THREE.MeshBasicMaterial( { color: 'yellow' } );
const sun = new THREE.Mesh( geometry, material );

//Planets:
const mercuryc = createAndAddPlanet('blue', 0.1);
const Venusc = createAndAddPlanet('red', 0.15);
const Earthc = createAndAddPlanet('green', 0.15);
const Marsc = createAndAddPlanet('pink', 0.1);
const Jupiterc = createAndAddPlanet('brown', 0.3);
const Saturnc = createAndAddSaturn('orange', 0.21);
const Uranusc = createAndAddPlanet('#58666d', 0.18);
const Neptunec = createAndAddPlanet('#5a71b3', 0.16);

scene.add(sun);
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
const controls = new OrbitControls( camera, renderer.domElement );
camera.position.z = 5;
controls.update();
const loader = new GLTFLoader();
document.body.appendChild( renderer.domElement );

let angle = 0;
let radius = 1.2; // Distance from the central object

function orbitSun(planet, distance, offset = 1){
        // Update the position of the planet
        planet.position.x = sun.position.x + (radius + distance)* Math.cos(angle*offset);
        planet.position.z = sun.position.z + (radius + distance)* Math.sin(angle*offset);
}

function createAndAddPlanet(colour, radius){
    const Planetg = new THREE.SphereGeometry( radius, 32, 16 ); 
    const Planetm = new THREE.MeshBasicMaterial( {color: colour} ); 
    const Planetc = new THREE.Mesh( Planetg, Planetm ); 
    scene.add(Planetc);
    return Planetc;
}

function createAndAddSaturn(colour, radius){
    const PlanetGroup = new THREE.Group();
    const Planetg = new THREE.SphereGeometry( radius, 32, 16 ); 
    const Planetm = new THREE.MeshBasicMaterial( {color: colour} ); 
    const Planetc = new THREE.Mesh( Planetg, Planetm ); 
    PlanetGroup.add(Planetc);

    const geometry = new THREE.TorusGeometry( 5, 1, 16, 10); 
    const material = new THREE.MeshBasicMaterial( { color: 'pink' } ); 
    const torus = new THREE.Mesh( geometry, material );
    torus.rotation.y = 0.7
    torus.rotation.x = -0.9
    torus.scale.set( 0.05, 0.05, 0.05 );
    PlanetGroup.add(torus);    
    scene.add(PlanetGroup);
    return PlanetGroup;
}

function animate() {
    sun.rotation.x += 0.01;
    // Increment the angle
    angle += 0.01; // Adjust the speed of rotation

    // Update the position of the planet
    orbitSun(mercuryc, 0.1);
    orbitSun(Venusc, 0.5, 1.2);
    orbitSun(Earthc, 0.9, 1.3);
    orbitSun(Marsc, 1.2, 0.8);
    orbitSun(Jupiterc, 1.7, 0.7);
    orbitSun(Saturnc, 2.25, 1.4);
    orbitSun(Uranusc, 2.75);
    orbitSun(Neptunec, 3.2, 1.3);

    // Optionally rotate the spinning object around its own axis
    mercuryc.rotation.y += 0.01;    
    controls.update();
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );