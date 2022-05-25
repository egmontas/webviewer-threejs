//import * as THREE from 'https://unpkg.com/three@0.140.2/build/three.module.js'
//import * as THREE from './three/build/three.module.js'
import * as THREE from 'three'

console.log(THREE)

import { OrbitControls } from 'https://unpkg.com/three@0.140.2/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.140.2/examples/jsm/loaders/GLTFLoader.js';

//import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
//import {GLTFLoader} from './three/build/GLTFLoader.js';

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

///*
const loader = new GLTFLoader()
loader.load('models/debug.gltf', function(gltf){
    console.log(gltf)
    const root = gltf.scene;
    root.scale.set(0.1,0.1,0.1);
    scene.add(root);
}, function(xhr){
    console.log((xhr.loaded/xhr.total * 100) + "% loaded")
}, function(error){
    console.log('Error')
})
//*/
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({
        color: 'red'
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(0,5,0)
scene.add(light)

//Boilerplate Code

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
camera.position.set(0,1,5)
scene.add(camera)

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.gammaOutput = true

function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

animate()