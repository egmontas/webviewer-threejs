import * as THREE from 'three'

console.log(THREE)

import Stats from 'https://unpkg.com/three@0.140.2/examples/jsm/libs/stats.module.js'

import { OrbitControls } from 'https://unpkg.com/three@0.140.2/examples/jsm/controls/OrbitControls.js'

import { GLTFLoader } from 'https://unpkg.com/three@0.140.2/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'https://unpkg.com/three@0.140.2/examples/jsm/loaders/DRACOLoader.js'

//Boilerplate Code

//let mixer

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

const clock = new THREE.Clock()
const container = document.getElementById('container')

const stats = new Stats()
//container.appendChild(stats.dom)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Renderer

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas,
    antialias: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding
//container.appendChild(renderer.domElement)
//renderer.shadowMap.enabled = true
//renderer.gammaOutput = true

//Camera and Controls

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
camera.position.set(0,0,5)

const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0,0,0)
controls.update()
controls.enablePan = false
controls.enableDamping = true

scene.add(camera)

//Geometry

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('js/libs/draco/gltf/')

const loader = new GLTFLoader()
loader.setDRACOLoader(dracoLoader)

loader.load('models/debug.gltf', function(gltf){
    console.log(gltf)   
    const debug = gltf.scene
    debug.position.set(0,0,0)
    debug.scale.set(1,1,1)
    scene.add(debug)
}, function(xhr){
    console.log((xhr.loaded/xhr.total * 100) + "% loaded")
}, function(error){
    console.log('Error')
})

//Lighting

const light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(0,5,0)
scene.add(light)

//Window

window.onresize = function(){
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
}

//Animate

function animate(){
    requestAnimationFrame(animate)
    //const delta = clock.getDelta()
    controls.update()
    stats.update()
    renderer.render(scene, camera)
}

animate()