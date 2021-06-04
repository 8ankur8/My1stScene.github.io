import './style/main.css'
import * as THREE from 'three'
import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import { Color, RGBA_ASTC_10x10_Format, WireframeGeometry } from 'three'
import * as dat from 'dat.gui'

// debug another UI index

const gui = new dat.GUI()
//gui.hide(true)

// Scene
const scene = new THREE.Scene()

/**
 * textureloader (alternavtive method)
*/
 const textureloader = new THREE.TextureLoader()
 
 const particalTexture = textureloader.load ('/partical/1.png')
 const alpaparticalTexture = textureloader.load ('/partical/alpa/5.png')
 const gradianTexture = textureloader.load ('/gradian/2.png')
 const simpleshadowTexture = textureloader.load('/shadows/2.PNG')
 //function on textures
 /** 
 basetexture.rotation= Math.PI/4
 basetexture.center.x=0.5
 basetexture.center.y =0.5
*/
 gradianTexture.minFilter= THREE.NearestFilter
 gradianTexture.magFilter= THREE.NearestFilter
 gradianTexture.generateMipmaps = false
 


/**
 * fonts

const textgroup = new THREE.Group()
scene.add(textgroup)

const fontLoader = new THREE.FontLoader()

fontLoader.load(
    '/font/helvetiker_regular.typeface.json',
    (font) =>
    {
       const textGeometry = new THREE.TextBufferGeometry(
           'OG',
           {
               font: font,
               size: 0.5,
               height:0.5,
               curveSegments:6,
               bevelEnabled:true,
               bevelThickness:0.025,
               bevelSize:0.02,
               bevelOffset: 0,
               bevelSegments:4
            }
       )
       //textGeometry.computeBoundingBox()
       //textGeometry.translate(
           //-(textGeometry.boundingBox.max.x - 0.02) * 0.5,
           //-(textGeometry.boundingBox.max.y - 0.02) * 0.5,
           //-(textGeometry.boundingBox.max.z - 0.025) * 0.5
       //) 
       textGeometry.center()
       
       const textmaterial = new THREE.MeshMatcapMaterial({matcap:matcapTexture})
       //textmaterial.flatShading =true
       const text = new THREE.Mesh(textGeometry,textmaterial)
       text.castShadow =true
       //textgroup.add(text)
       
    }
)
*/


const parameters = {
    color: 0xffffff, 
    spin : () =>
    {
       gsap.to(cube.rotation,{ duration:3, y:cube.rotation.y + 4})
    }
}
gui 
   .addColor(parameters,'color')
   .onChange(() =>
   { 
      material1.color.set(parameters.color)
   })
   
//gui.add(parameters,'spin')


//cursor
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove',(event) =>
{
    cursor.x =event.clientX / sizes.width - 0.5
    cursor.y =(event.clientY / sizes.height - 0.5) * -1
    
})


/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight


window.addEventListener('resize', () =>
{
    // Save sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})

window.addEventListener('dblclick', () =>
{
    if(!document.fullscreenElement)
    {
        canvas.requestFullscreen()
    }
    else
    {
        document.exitFullscreen()
    }
})







// Camera--------

const camera = new THREE.PerspectiveCamera(90, sizes.width / sizes.height, .01,10000)
//const ar = sizes.width/sizes.height
//const camera = new THREE.OrthographicCamera(-3*ar,3*ar,3,-3,0.3,100)
camera.position.z =12
camera.position.y =5
//camera.position.x = 1.35
//camera.position.y = -1.35
scene.add(camera)


/**
 * Material,object
 */


const material = new THREE.MeshStandardMaterial({color: 0x7a4000})
material.metalness =0.1
material.roughness = 0.6

//material.map = basetexture
//material.displacementMap = heightTexture
//material.displacementScale = 0.5
//material.metalnessMap = metalTexture
//material.roughnessMap = roughTexture
//material.alphaMap = alpaTexture
//material.normalMap = normalTexture
//material.transparent =true
//const sphereshadowmaterial = new THREE.MeshBasicMaterial({color:0x0})
//sphereshadowmaterial.alphaMap = simpleshadowTexture
//sphereshadowmaterial.transparent = true

/** 
const material = new THREE.MeshStandardMaterial()
material.metalness =0.8
material.roughness = 0.05
material.envMap = environmentMapTexture
*/

gui.add(material,'metalness').min(0).max(1).step(0.01)
gui.add(material,'roughness').min(0).max(1).step(0.01)
//gui.add(material,'displacementScale').min(0).max(1).step(0.01)



// paramite oject
const group = new THREE.Group()
const parmit = new THREE.Group()

scene.add(group,parmit)

//cubes,object

const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1,100,100,100), material)
cube.position.set(0,0,0)

//cube.rotation.reorder('YXZ')
//group.add(cube)
//cube.position.normalize()
const head = new THREE.Mesh( new THREE.ConeBufferGeometry( 1, 1, 4 ), new THREE.MeshStandardMaterial( {color: 0xffff00,
 transparent : true,
 opacity : 0.7,
 metalness: 1,
 roughness:0.7,
} ))
head.rotation.y =Math.PI/4
head.castShadow = true
head.position.y =5
parmit.add(head)

//const floorMaterial = new THREE.MeshStandardMaterial({color:0x935824}) 
for (let i=0 ; i< 9 ;i++)
{
    const base = new THREE.Mesh(new THREE.BoxBufferGeometry(10-i, 0.5, 10-i,10,10,10), material)
    base.position.y=0.25 + i/2
    
    parmit.add(base)
    base.castShadow = true
    base.receiveShadow = true
    
}

//cube1.position.normalize()

const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(50, 50), new THREE.MeshStandardMaterial({color: 0xffc100}))
plane.position.y= 0

plane.rotation.x =- Math.PI/2
plane.receiveShadow =true
scene.add(plane)

//partical geometry
const fireFlyGeometry = new THREE.SphereBufferGeometry(20,32,32)

//particle Material
const fireFLyMaterial = new THREE.PointsMaterial()
fireFLyMaterial.size = 0.05
fireFLyMaterial.sizeAttenuation = true

// fireflies
const  fireFly = new THREE.Points(fireFlyGeometry,fireFLyMaterial)
group.add(fireFly)

// FOR FLOAT Buffer geometry

const geometry =new THREE.BufferGeometry()
const count = 100
const positionArray =new Float32Array(count*3*3)
const colors =new Float32Array(count*3*3)

for (let i=0;i< count*3*3;i++)
{
    positionArray[i] = (Math.random()- 0.5) *25
    colors[i] =Math.random() 
}
const positionAttributes = new THREE.BufferAttribute(positionArray,3)
geometry.setAttribute('position', positionAttributes)
const colorsAttributes = new THREE.BufferAttribute(colors,3)
geometry.setAttribute('color', colorsAttributes)
const material1 = new THREE.PointsMaterial( { color: 'yellow' })
material1.size = 0.15
material1.transparent =true
material1.alphaMap =particalTexture
material1.vertexColors = true //for random color


//material1.alphaTest = 0.001 // for bug fixing
//material1.depthTest = false   // for bug fixing
material1.depthWrite= false   // for bug fixing

//material1.blending =THREE.AdditiveBlending
const mesh = new THREE.Points(geometry,material1)
group.add( mesh )


//fog

const fog =new THREE.Fog('#262837',2,25)
scene.fog=fog
gui
 .add(fog,'far',10,50,1)
 .name('fog')


/**
 * lights
 */
const ambientLight = new THREE.AmbientLight('#b9d5ff',0.1)
scene.add(ambientLight)  
gui.add(ambientLight,'intensity',0,1,0.01)

//direction light
const directionLight = new THREE.DirectionalLight('#b9d5ff',0.1)
directionLight.position.set(10,10,10)
scene.add(directionLight)

gui
 .add(directionLight,'intensity',0,1,0.01)
 .name('directionLI')  
 
directionLight.castShadow =true 
/**
directionLight.shadow.mapSize.width = 1024
directionLight.shadow.mapSize.width = 1024

directionLight.shadow.camera.top = 2
directionLight.shadow.camera.right = 2
directionLight.shadow.camera.bottom = -2
directionLight.shadow.camera.left = -2
directionLight.shadow.camera.near = 1
directionLight.shadow.camera.far = 10

directionLight.shadow.radius =10 //blur
*/

const dLCH = new THREE.CameraHelper(directionLight.shadow.camera)
//scene.add(dLCH) 


//hemispherelight 
const hemispherelight = new THREE.HemisphereLight(0xff0000,0x0000ff,0.3)
//scene.add(hemispherelight)

//point light
const pointLight = new THREE.PointLight('#ff7d46',3,10,2)
pointLight.position.x = 0
pointLight.position.y =6
pointLight.position.z = 0
pointLight.castShadow = true

const pLCH = new THREE.CameraHelper(pointLight.shadow.camera)
//scene.add(pLCH)
scene.add(pointLight)

//rectarea light
const rectArealight = new THREE.RectAreaLight(0x4e00ff,2,3,2)
rectArealight.position.set(-2,0,3)
rectArealight.lookAt(new THREE.Vector3())
//scene.add(rectArealight)

//spot light
const spotLight = new THREE.SpotLight(0xffffff,0.5,10,Math.PI*0.1,0.25,1)
spotLight.position.set(-0,2,2)
spotLight.castShadow = true
//scene.add(spotLight)

spotLight.target.position.x= 2
spotLight.shadow.camera.fov =20
spotLight.shadow.camera.near =1
spotLight.shadow.camera.far =6

scene.add(spotLight.target)
//const sLCH = new THREE.CameraHelper(spotLight.shadow.camera)
//scene.add(sLCH)




// Axis Helper
//const axesHelper = new THREE.AxesHelper(5)
//scene.add(axesHelper)


//canvas
const canvas = document.querySelector('.webgl')

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas 
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio),2)
renderer.setSize(sizes.width, sizes.height)
renderer.setClearColor('#262837')
//for shadows
renderer.shadowMap.enabled= true
//renderer.shadowMap.type = THREE.PCFSoftShadowMap

// controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping =true

// fullscreen


const clock = new THREE.Clock()
//gsap.to(cube.position,{duration:1,delay: 1,x:2})
//gsap.to(cube.position,{duration:1,delay: 2,x:-2})

/**
 * Loop
 */
const loop = () =>
{

    const elapsedTime = clock.getElapsedTime()

    group.rotation.y =0.05 *  elapsedTime 
    group.rotation.x =0.05 *  elapsedTime 
    fireFly.rotation.z =0.05 *  elapsedTime 

    camera.lookAt(head)
    // update controls
    controls.update()
    
    // Render
    renderer.render(scene, camera)

    // Keep looping
    window.requestAnimationFrame(loop)
    
}
loop()


