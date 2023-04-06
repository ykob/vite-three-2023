import "./style.css";
import * as THREE from "three";
import { NoisePlane } from "./object";

const canvas = document.getElementById("canvas-webgl") as HTMLCanvasElement;

const renderer = new THREE.WebGLRenderer({ canvas });
const clock = new THREE.Clock();
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 100);
const noisePlane = new NoisePlane();

clock.autoStart = false;

const resize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height, false);
  camera.left = -width / height;
  camera.right = width / height;
  camera.top = 1;
  camera.bottom = -1;
  camera.updateProjectionMatrix();
  noisePlane.resize(width / height);
};

const update = () => {
  const time = clock.getDelta();

  renderer.render(scene, camera);
  noisePlane.update(time);
  requestAnimationFrame(update);
};

const init = () => {
  clock.start();
  scene.add(noisePlane);
  camera.position.z = 2;
  camera.lookAt(0, 0, 0);

  resize();
  update();
};

init();

window.addEventListener("resize", () => {
  resize();
});

const contentDom = document.getElementById("content");

if (contentDom) contentDom.innerHTML = `
<img
  class="vite-logo"
  src="vite.svg"
  width="240"
  height="240"
  decoding="async"
  alt="Vite"
/>
<div class="title">Vite + three.js</div>
`;