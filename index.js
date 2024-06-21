import * as THREE from 'three';
import { OrbitControls } from './OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
const scene = new THREE.Scene();
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);

document.body.appendChild(renderer.domElement);

const earthGroup = new THREE.Group();
earthGroup.rotation.z = (-23.4 * Math.PI) / 180;
scene.add(earthGroup);

new OrbitControls(camera, renderer.domElement);
const loader = new THREE.TextureLoader();
const detail = 12;
const geo = new THREE.IcosahedronGeometry(1, detail);
const mat = new THREE.MeshStandardMaterial({
  map: loader.load('./earthmap1k.jpg'),
});
const earthMesh = new THREE.Mesh(geo, mat);
earthGroup.add(earthMesh);

const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load('./earthlights1k.jpg'),
  blending: THREE.AdditiveBlending,
  opacity: 0.6,
});

const lightsMesh = new THREE.Mesh(geo, lightsMat);
earthGroup.add(lightsMesh);

const cloudMat = new THREE.MeshStandardMaterial({
  map: loader.load('./earthcloudmap.jpg'),
  transparent: true,
  opacity: 0.6,
});

const cloudMesh = new THREE.Mesh(geo, cloudMat);
earthGroup.add(cloudMesh);

const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2, -0.5, 1.5);
scene.add(sunLight);

function animate() {
  requestAnimationFrame(animate);
  earthMesh.rotation.y += 0.002;
  lightsMesh.rotation.y += 0.002;
  cloudMesh.rotation.y += 0.002;
  renderer.render(scene, camera);
}

animate();
