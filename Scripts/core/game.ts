/// <reference path="_reference.ts"/>

// MAIN GAME FILE

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


function init() {
    // Instantiate a new Scene object
    scene = new Scene();

    setupRenderer(); // setup the default renderer
	
    setupCamera(); // setup the camera
	
    // add an axis helper to the scene
    axes = new AxisHelper(10);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    
    //Add a Plane to the Scene
    plane = new gameObject(
        new PlaneGeometry(16, 16, 1, 1),
        new LambertMaterial({ color: 0xe79b61 }),
        0, 0, 0);

    plane.rotation.x = -0.5 * Math.PI;

    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    
    //Add a Cube to the Scene
    cubeMaterial = new LambertMaterial({color:0x5F43E7});
    cubeGeometry = new CubeGeometry(1 ,4 , 3);
    cube = new Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.position.y = 4;    
    
    scene.add(cube);

    
    cubeMaterial = new LambertMaterial({color:0x2DE7B4});
    cubeGeometry = new CubeGeometry(1.5, 2, 2);
    head = new Mesh(cubeGeometry, cubeMaterial);
    head.castShadow = true;
    head.receiveShadow = true;
    head.position.y = 3;
    head.position.x = 0.25;
    
    cube.add(head);
    
    cubeMaterial = new LambertMaterial({color:0x3B3B3B});
    cubeGeometry = new CubeGeometry(1, 2, 1);
    lLeg = new Mesh(cubeGeometry, cubeMaterial);
    lLeg.castShadow = true;
    lLeg.receiveShadow = true;
    lLeg.position.z = -1;
    lLeg.position.y = -3;
    
    cube.add(lLeg);
    
    
    cubeMaterial = new LambertMaterial({color:0x3B3B3B});
    cubeGeometry = new CubeGeometry(1, 2, 1);
    rLeg = new Mesh(cubeGeometry, cubeMaterial);
    rLeg.castShadow = true;
    rLeg.receiveShadow = true;
    rLeg.position.z = 1;
    rLeg.position.y = -3;
    
    
    cube.add(rLeg);

    cubeMaterial = new LambertMaterial({color:0xE7AED0});
    cubeGeometry = new CubeGeometry(1, 1, 2);
    rArm = new Mesh(cubeGeometry, cubeMaterial);
    rArm.castShadow = true;
    rArm.receiveShadow = true;
    rArm.position.z = 2.5;
    rArm.position.y = 1.5;
    
    cube.add(rArm);
    
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
    console.log("Added an Ambient Light to Scene");
	
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(5.6, 23.1, 5.4);
    spotLight.rotation.set(-0.8, 42.7, 19.5);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    
    // add controls
    gui = new GUI();
    control = new Control(0.05);
    addControl(control);
    
   



    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    
    window.addEventListener('resize', onResize, false);
}

function onResize(): void {
  //  camera.aspect = CScreen.RATIO;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
 //   renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
}

function addControl(controlObject: Control): void {
    gui.add(controlObject, 'rotationSpeedx', -0.5,0.5);
    gui.add(controlObject, 'rotationSpeedy', -0.5,0.5);
    gui.add(controlObject, 'rotationSpeedz', -0.5,0.5);

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
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, CScreen.RATIO, 0.1, 1000);
  //  camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0.6;
    camera.position.y = 16;
    camera.position.z = -20.5;
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera...");
}