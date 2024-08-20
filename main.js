import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const geometry = new THREE.SphereGeometry( 1, 32, 16 ); 
const material = new THREE.MeshLambertMaterial( { color: 'yellow' } );
const sun = new THREE.Mesh( geometry, material );
// instantiate a loader
const _loader = new THREE.ImageBitmapLoader();

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
    const Planetm = new THREE.MeshLambertMaterial( {color: colour} ); 
    const Planetc = new THREE.Mesh( Planetg, Planetm ); 
    scene.add(Planetc);
    return Planetc;
}

function createAndAddSaturn(colour, radius){
    const PlanetGroup = new THREE.Group();
    const Planetg = new THREE.SphereGeometry( radius, 32, 16 ); 
    const Planetm = new THREE.MeshLambertMaterial( {color: colour} ); 
    const Planetc = new THREE.Mesh( Planetg, Planetm ); 
    PlanetGroup.add(Planetc);

    const geometry = new THREE.TorusGeometry( 5, 1, 100, 100); 
    const material = new THREE.MeshLambertMaterial( { color: 'pink' } ); 
    const torus = new THREE.Mesh( geometry, material );
    torus.rotation.y = 0.7
    torus.rotation.x = -0.9
    torus.scale.set( 0.05, 0.05, 0.05 );
    PlanetGroup.add(torus);    
    scene.add(PlanetGroup);
    _loader.load(
        // resource URL
        'img/2k_saturn.jpg',
    
        // onLoad callback
        function ( imageBitmap ) {
            const texture = new THREE.CanvasTexture( imageBitmap );
            const material = new THREE.MeshLambertMaterial( { map: texture } );
            Planetc.material = material;
        },
    
        // onProgress callback currently not supported
        undefined,
    
        // onError callback
        function ( err ) {
            console.log( 'An error happened' ); 
        }
    );    
    _loader.load(
        // resource URL
        'img/2k_saturn_ring_alpha.png',
    
        // onLoad callback
        function ( imageBitmap ) {
            const texture = new THREE.CanvasTexture( imageBitmap );
            const material = new THREE.MeshLambertMaterial( { map: texture } );
            torus.material = material;
        },
    
        // onProgress callback currently not supported
        undefined,
    
        // onError callback
        function ( err ) {
            console.log( 'An error happened' ); 
        }
    );    
    return { group:PlanetGroup, planet:Planetc};
}

// set options if needed
_loader.setOptions( { imageOrientation: 'flipY' } );

// load a image resource
_loader.load(
	// resource URL
	'img/2k_jupiter.jpg',

	// onLoad callback
	function ( imageBitmap ) {
		const texture = new THREE.CanvasTexture( imageBitmap );
		const material = new THREE.MeshLambertMaterial( { map: texture } );
        Jupiterc.material = material;
	},

	// onProgress callback currently not supported
	undefined,

	// onError callback
	function ( err ) {
		console.log( 'An error happened' ); 
	}
);
// load a image resource
_loader.load(
	// resource URL
	'img/2k_earth_daymap.jpg',

	// onLoad callback
	function ( imageBitmap ) {
		const texture = new THREE.CanvasTexture( imageBitmap );
		const material = new THREE.MeshLambertMaterial( { map: texture } );
        Earthc.material = material;
	},

	// onProgress callback currently not supported
	undefined,

	// onError callback
	function ( err ) {
		console.log( 'An error happened' ); 
	}
);
// load a image resource
_loader.load(
	// resource URL
	'img/2k_mars.jpg',

	// onLoad callback
	function ( imageBitmap ) {
		const texture = new THREE.CanvasTexture( imageBitmap );
		const material = new THREE.MeshLambertMaterial( { map: texture } );
        Marsc.material = material;
	},

	// onProgress callback currently not supported
	undefined,

	// onError callback
	function ( err ) {
		console.log( 'An error happened' ); 
	}
);
// load a image resource
_loader.load(
	// resource URL
	'img/2k_mercury.jpg',

	// onLoad callback
	function ( imageBitmap ) {
		const texture = new THREE.CanvasTexture( imageBitmap );
		const material = new THREE.MeshLambertMaterial( { map: texture } );
        mercuryc.material = material;
	},

	// onProgress callback currently not supported
	undefined,

	// onError callback
	function ( err ) {
		console.log( 'An error happened' ); 
	}
);
// load a image resource
_loader.load(
	// resource URL
	'img/2k_neptune.jpg',

	// onLoad callback
	function ( imageBitmap ) {
		const texture = new THREE.CanvasTexture( imageBitmap );
		const material = new THREE.MeshLambertMaterial( { map: texture } );
        Neptunec.material = material;
	},

	// onProgress callback currently not supported
	undefined,

	// onError callback
	function ( err ) {
		console.log( 'An error happened' ); 
	}
);

// load a image resource
_loader.load(
	// resource URL
	'img/2k_uranus.jpg',

	// onLoad callback
	function ( imageBitmap ) {
		const texture = new THREE.CanvasTexture( imageBitmap );
		const material = new THREE.MeshLambertMaterial( { map: texture } );
        Uranusc.material = material;
	},

	// onProgress callback currently not supported
	undefined,

	// onError callback
	function ( err ) {
		console.log( 'An error happened' ); 
	}
);
// load a image resource
_loader.load(
	// resource URL
	'img/2k_venus_surface.jpg',

	// onLoad callback
	function ( imageBitmap ) {
		const texture = new THREE.CanvasTexture( imageBitmap );
		const material = new THREE.MeshLambertMaterial( { map: texture } );
        Venusc.material = material;
	},

	// onProgress callback currently not supported
	undefined,

	// onError callback
	function ( err ) {
		console.log( 'An error happened' ); 
	}
);

//Sun Material:
// load a image resource
_loader.load(
	// resource URL
	'img/2k_sun.jpg',

	// onLoad callback
	function ( imageBitmap ) {
		const texture = new THREE.CanvasTexture( imageBitmap );
		const material = new THREE.MeshLambertMaterial( { map: texture } );
        sun.material = material;
	},

	// onProgress callback currently not supported
	undefined,

	// onError callback
	function ( err ) {
		console.log( 'An error happened' ); 
	}
);

const light = new THREE.PointLight( 'yellow', 8, 100 );
scene.add( light );

const alight = new THREE.AmbientLight( 0x404040, 2 ); // soft white light
scene.add( alight );

// White directional light at half intensity shining from the top.
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.2 );
scene.add( directionalLight );

        // Create starfield
        function createStarField() {
            const starCount = 10000;
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(starCount * 3);

            for (let i = 0; i < positions.length; i += 3) {
                positions[i] = (Math.random() - 0.5) * 2000; // X
                positions[i + 1] = (Math.random() - 0.5) * 2000; // Y
                positions[i + 2] = (Math.random() - 0.5) * 2000; // Z
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            const material = new THREE.PointsMaterial({ color: 0xffffff });
            const stars = new THREE.Points(geometry, material);
            scene.add(stars);
        }

        createStarField();

function animate() {
    sun.rotation.y += 0.01;
    mercuryc.rotation.y += 0.04;
    Venusc.rotation.y += 0.04;
    Earthc.rotation.y += 0.04;
    Marsc.rotation.y += 0.05;
    Jupiterc.rotation.y += 0.04;
    Saturnc.planet.rotation.y += 0.04;
    Uranusc.rotation.y += 0.04;
    Neptunec.rotation.y += 0.04;  
    // Increment the angle
    angle += 0.01; // Adjust the speed of rotation

    // Update the position of the planet
    orbitSun(mercuryc, 0.1);
    orbitSun(Venusc, 0.5, 1.2);
    orbitSun(Earthc, 0.9, 1.3);
    orbitSun(Marsc, 1.2, 0.8);
    orbitSun(Jupiterc, 1.7, 0.7);
    orbitSun(Saturnc.group, 2.25, 1.4);
    orbitSun(Uranusc, 2.75);
    orbitSun(Neptunec, 3.2, 1.3);

    // Optionally rotate the spinning object around its own axis
    mercuryc.rotation.y += 0.01;    
    controls.update();
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );
