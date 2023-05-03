import "./style.css";
import * as THREE from "three";
import { InstancedCircle, NoisePlane1 } from "./object";
import { debounce, throttle } from "./utils";

const canvas = document.getElementById("canvas-webgl") as HTMLCanvasElement;

const renderer = new THREE.WebGLRenderer({ canvas });
const renderTarget = new THREE.WebGLRenderTarget();
const clock = new THREE.Clock();
const resolution = new THREE.Vector2();
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 100);
const instancedCircle = new InstancedCircle();
const noisePlane1 = new NoisePlane1(renderTarget.texture);

clock.autoStart = false;

const resize = () => {
  renderer.setSize(0, 0, false);

  const width = window.innerWidth;
  const height = document.documentElement.clientHeight;

  renderer.setSize(width, height, false);
  renderTarget.setSize(width, height);
  resolution.set(width, height);

  camera.left = -width / height;
  camera.right = width / height;
  camera.top = 1;
  camera.bottom = -1;
  camera.updateProjectionMatrix();
  noisePlane1.resize(resolution.x, resolution.y);
  instancedCircle.resize(width / height);
};

const update = () => {
  const time = clock.getDelta();

  instancedCircle.update(time);
  noisePlane1.update(time);
  instancedCircle.visible = true;
  noisePlane1.visible = false;
  renderer.setRenderTarget(renderTarget);
  renderer.render(scene, camera);
  instancedCircle.visible = false;
  noisePlane1.visible = true;
  renderer.setRenderTarget(null);
  renderer.render(scene, camera);
  requestAnimationFrame(update);
};

const init = () => {
  noisePlane1.position.setZ(-1);
  scene.add(instancedCircle);
  scene.add(noisePlane1);
  camera.position.z = 2;
  camera.lookAt(0, 0, 0);
  clock.start();

  resize();
  update();
};

init();

window.addEventListener("mousedown", (e: MouseEvent) => {
  e.preventDefault();
});
window.addEventListener(
  "mousemove",
  throttle((e: MouseEvent) => {
    const { clientX, clientY } = e;
    const x =
      ((clientX / resolution.x) * 2 - 1) * (resolution.x / resolution.y);
    const y = -(clientY / resolution.y) * 2 + 1;

    instancedCircle.dropCircle(x, y);
  }, 10)
);
window.addEventListener(
  "touchstart",
  (e: TouchEvent) => {
    e.preventDefault();
  },
  { passive: false }
);
window.addEventListener(
  "touchmove",
  throttle((e: TouchEvent) => {
    const { clientX, clientY } = e.touches[0];
    const x =
      ((clientX / resolution.x) * 2 - 1) * (resolution.x / resolution.y);
    const y = -(clientY / resolution.y) * 2 + 1;

    instancedCircle.dropCircle(x, y);
  }, 10)
);
window.addEventListener("resize", debounce(resize, 100));

const contentDom = document.getElementById("content");

if (contentDom)
  contentDom.innerHTML = `
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

export {};
