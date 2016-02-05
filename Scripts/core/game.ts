/// <reference path="_reference.ts"/>

// ********************************************
// * Source file : game.ts                    *
// * Author name : Yaroslav Kabanov           *
// * Last Modified by : Yaroslav Kabanov      *
// * Last Date Modified : February 5th, 2016  *
// * Program Description : Three.js rotating  *
// * cube-man. Player can change rotation     *
// * speed and change color of the cubes.     *
// ********************************************    



// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;
import CScreen = config.Screen;

//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var plane: Mesh;
var sphere: Mesh;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;
var cubeGeometry:CubeGeometry;
var cubeMaterial:LambertMaterial;

// cube man
var rLeg: Mesh;
var lLeg: Mesh;
var head: Mesh;
var cube: Mesh;
var rArm: Mesh;
var lArm: Mesh;
var lEye: Mesh;
var rEye: Mesh;
var mouth: Mesh;
var letter1: Mesh;
var letter2: Mesh;
var letter3: Mesh;
var hat: Mesh;
var hat1: Mesh;


function init() {
    // Instantiate a new Scene object
    scene = new Scene();

    setupRenderer(); // setup the default renderer
	
    setupCamera(); // setup the camera
	
    // add an axis helper to the scene
    axes = new AxisHelper(30);
    scene.add(axes);
    
    //Add a Plane to the Scene
    plane = new gameObject(
        new PlaneGeometry(20, 20, 1, 1),
        new LambertMaterial({ color: 0xFF67CE }),
        0, 0, 0);

    plane.rotation.x = -0.5 * Math.PI;

    scene.add(plane);
    
    //Add a cube body to the Scene
    cubeMaterial = new LambertMaterial({color:0x5F43E7});
    cubeGeometry = new CubeGeometry(1 ,4 , 3);
    cube = new Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.position.y = 4;    
    scene.add(cube);

    // add a head to the scene 
    cubeMaterial = new LambertMaterial({color:0x2DE7B4});
    cubeGeometry = new CubeGeometry(1.5, 2, 2);
    head = new Mesh(cubeGeometry, cubeMaterial);
    head.castShadow = true;
    head.receiveShadow = true;
    head.position.y = 3;
    head.position.x = 0.25;
    cube.add(head);
    
    // add left eye to the scene
    cubeMaterial = new LambertMaterial({color:0x000000});
    cubeGeometry = new CubeGeometry(0.25, 0.25, 0.25);
    lEye = new Mesh(cubeGeometry, cubeMaterial);
    lEye.castShadow = true;
    lEye.receiveShadow = true;
    lEye.position.y = 0.5;
    lEye.position.x = 0.75;
    lEye.position.z = 0.5;
    head.add(lEye);
    
    // right eye
    cubeMaterial = new LambertMaterial({color:0x000000});
    cubeGeometry = new CubeGeometry(0.25, 0.25, 0.25);
    rEye = new Mesh(cubeGeometry, cubeMaterial);
    rEye.castShadow = true;
    rEye.receiveShadow = true;
    rEye.position.y = 0.5;
    rEye.position.x = 0.75;
    rEye.position.z = -0.5;
    head.add(rEye);
    
    // add hat part to the scene
    cubeMaterial = new LambertMaterial({color:0xFF0000});
    cubeGeometry = new CubeGeometry(2, 0.2, 2);
    hat = new Mesh(cubeGeometry, cubeMaterial);
    hat.castShadow = true;
    hat.receiveShadow = true;
    hat.position.y = 1;
    hat.position.x = 0.25;
    hat.position.z = 0;
    head.add(hat);
    
    // add hat part to the scene
    cubeMaterial = new LambertMaterial({color:0xFF0000});
    cubeGeometry = new CubeGeometry(1.5, 1, 2);
    hat1 = new Mesh(cubeGeometry, cubeMaterial);
    hat1.castShadow = true;
    hat1.receiveShadow = true;
    hat1.position.y = 1.60;
    hat1.position.x = 0;
    hat1.position.z = 0;
    head.add(hat1);
    
    
    
    // add mouth to the scene 
    cubeMaterial = new LambertMaterial({color:0x000000});
    cubeGeometry = new CubeGeometry(0.25, 0.25, 1);
    mouth = new Mesh(cubeGeometry, cubeMaterial);
    mouth.castShadow = true;
    mouth.receiveShadow = true;
    mouth.position.y = -0.25;
    mouth.position.x = 0.75;
    mouth.position.z = 0;
    head.add(mouth);
    
    // part of letter on the t-shirt added
    cubeMaterial = new LambertMaterial({color:0xFF0FFF});
    cubeGeometry = new CubeGeometry(0.25, 2.5, 0.5);
    letter1 = new Mesh(cubeGeometry, cubeMaterial);
    letter1.castShadow = true;
    letter1.receiveShadow = true;
    letter1.position.y = 0;
    letter1.position.x = 0.5;
    letter1.position.z = -0.85;
    cube.add(letter1);
    
    // part of letter on the t-shirt added
    cubeMaterial = new LambertMaterial({color:0xFF0FFF});
    cubeGeometry = new CubeGeometry(0.25, 2.5, 0.5);
    letter2 = new Mesh(cubeGeometry, cubeMaterial);
    letter2.castShadow = true;
    letter2.receiveShadow = true;
    letter2.position.y = 0;
    letter2.position.x = 0.5;
    letter2.position.z = 0.85;
    cube.add(letter2);
    
    // part of letter on the t-shirt added
    cubeMaterial = new LambertMaterial({color:0xFF0FFF});
    cubeGeometry = new CubeGeometry(0.25, 0.25, 2);
    letter3 = new Mesh(cubeGeometry, cubeMaterial);
    letter3.castShadow = true;
    letter3.receiveShadow = true;
    letter3.position.y = 0;
    letter3.position.x = 0.5;
    letter3.position.z = 0;
    cube.add(letter3);
    
    
    
    
    // add a left leg to the scene
    cubeMaterial = new LambertMaterial({color:0x3B3B3B});
    cubeGeometry = new CubeGeometry(1, 2, 1);
    lLeg = new Mesh(cubeGeometry, cubeMaterial);
    lLeg.castShadow = true;
    lLeg.receiveShadow = true;
    lLeg.position.z = -1;
    lLeg.position.y = -3;
    cube.add(lLeg);
    
      // add a right leg to the scene
    cubeMaterial = new LambertMaterial({color:0x3B3B3B});
    cubeGeometry = new CubeGeometry(1, 2, 1);
    rLeg = new Mesh(cubeGeometry, cubeMaterial);
    rLeg.castShadow = true;
    rLeg.receiveShadow = true;
    rLeg.position.z = 1;
    rLeg.position.y = -3;   
    cube.add(rLeg);

    // add a right arm to the scene 
    cubeMaterial = new LambertMaterial({color:0xE7AED0});
    cubeGeometry = new CubeGeometry(1, 1, 2);
    rArm = new Mesh(cubeGeometry, cubeMaterial);
    rArm.castShadow = true;
    rArm.receiveShadow = true;
    rArm.position.z = 2.5;
    rArm.position.y = 1.5;
    cube.add(rArm);
    
    // add a left arm to the scene
    cubeMaterial = new LambertMaterial({color:0xE7AED0});
    cubeGeometry = new CubeGeometry(1, 1, 2);
    lArm = new Mesh(cubeGeometry, cubeMaterial);
    lArm.castShadow = true;
    lArm.receiveShadow = true;
    lArm.position.z = -2.5;
    lArm.position.y = 1.5; 
    cube.add(lArm);
    
    
    
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
	
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(80 , 40 , 60);
    spotLight.rotation.set(0, 0, 0);
    spotLight.castShadow = true;
    spotLight.intensity = 1;
    scene.add(spotLight);
    
    // add controls
    gui = new GUI();
    control = new Control(0.02);
    addControl(control);
    

    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    
    window.addEventListener('resize', onResize, false);
}

function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
}
    // add control function
function addControl(controlObject: Control): void {
    gui.add(controlObject, 'rotationSpeedx', -0.5,0.5);
    gui.add(controlObject, 'rotationSpeedy', -0.5,0.5);
    gui.add(controlObject, 'rotationSpeedz', -0.5,0.5);
    gui.add(controlObject, 'changeColorsToRandom');
    gui.add(controlObject, 'returnColors');
    gui.add(controlObject, 'stopRotations');
    gui.add(controlObject, 'defaultRotations');
    

}

function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

// Setup main game loop
function gameLoop(): void {
    stats.update();
    
    cube.rotation.x += control.rotationSpeedx;
    cube.rotation.y += control.rotationSpeedy;
    cube.rotation.z += control.rotationSpeedz;
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
  //  renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
    renderer.shadowMap.enabled = true;
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, CScreen.RATIO, 0.1, 1000);
    camera.position.x = 20;
    camera.position.y = 20;
    camera.position.z = 0;
    camera.lookAt(new Vector3(0, 0, 0));
}
