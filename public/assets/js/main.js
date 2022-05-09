import * as THREE from "./three.js";
import { GLTFLoader } from "./GLTFLoader.js";
const loader = new GLTFLoader();

gsap.registerPlugin(ScrollTrigger);
console.log(THREE);
console.log(gsap);
const COLORS = {
  background: "#8888ff",
  light: "##526b9c",
  sky: "#aaaaff",
  ground: "#88ff88",
};

let size = { width: 0, height: 0 };

const PI = Math.PI;
const scene = new THREE.Scene();
scene.background = new THREE.Color(COLORS.background);
scene.fog = new THREE.Fog(COLORS.background, 150, 200);
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 5;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const container = document.querySelector(".canvas-container");
container.appendChild(renderer.domElement);

// --- CAMERA

const camera = new THREE.PerspectiveCamera(
  40,
  size.width / size.height,
  0.1,
  100
);
camera.position.set(0, 1, 2);
let cameraTarget = new THREE.Vector3(0, 1, 0);

scene.add(camera);

// --- LIGHTS

const directionalLight = new THREE.DirectionalLight(COLORS.light, 1);
directionalLight.castShadow = true;
directionalLight.shadow.camera.far = 10;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(2, 1, 2);

// scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(
  COLORS.sky,
  COLORS.ground,
  0.5
);

const light = new THREE.PointLight(COLORS.light, 0.5, 10);
light.position.set(2, 1, 3);
scene.add(light);
// scene.add(hemisphereLight);


// --- ON RESIZE

const onResize = () => {
  size.width = container.clientWidth;
  size.height = container.clientHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

window.addEventListener("resize", onResize);
onResize();

// --- TICK

const tick = () => {
  camera.lookAt(cameraTarget);
  renderer.render(scene, camera);
  window.requestAnimationFrame(() => tick());
};

tick();

let modal;

loader.load(
  "./assets/js/test.glb",
  function (gltf) {
      modal = gltf.scene;
      modal.position.set(0.7, 0, -3);
    scene.add(modal);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);




      let section = 0;
      animate();


     

      console.log(tl)
      
			function animate() {
        requestAnimationFrame(animate);

        //     // modal.rotation.x += 0.01;
        //     modal.rotation.y += 0.01;
        // modal.position.z -= 0.05;
        //     // modal.position.y += 0.01;

        //     // modal.scale.x += 0.01;
 const tl = new gsap.timeline({
   scrollTrigger: {
     trigger: ".content",
     start: "top top",
     end: "bottom bottom",
     scrub: true,
     markers: false,
     reversed: true,
     paused: true,
   },
   default: {
     duration: 1,
     ease: "power2.inOut",
   },
 });
        tl.to(camera.position, { x: -2 }, section);
        section += 1;
        // tl.to(modal.scale, { z: 2, x: 2, y: 2 }, section);
        // section += 1;
        tl.to(camera.rotation, { y: 1 }, section);
        section += 1;
        // tl.to(camera.position, { z: -10 }, section);

        

        renderer.render(scene, camera);
      }

      
      console.log("test")






