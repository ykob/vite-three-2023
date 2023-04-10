import "./style.css";
import * as THREE from "three";
import { InstancedCircle, NoisePlane } from "./object";

const canvas = document.getElementById("canvas-webgl") as HTMLCanvasElement;

const renderer = new THREE.WebGLRenderer({ canvas });
const renderTarget = new THREE.WebGLRenderTarget();
const clock = new THREE.Clock();
const resolution = new THREE.Vector2();
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 100);
const instancedCircle = new InstancedCircle();
const noisePlane = new NoisePlane(renderTarget.texture);

clock.autoStart = false;

const debounce = (func: () => void, wait: number) => {
  let timeout: number;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
};

const throttle = (func: (e?: any) => void, wait: number) => {
  let timeout: number;
  return (e: any) => {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = 0;
        func(e);
      }, wait);
    }
  };
};

const resize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height, false);
  renderTarget.setSize(width, height);
  resolution.set(width, height);
  camera.left = -width / height;
  camera.right = width / height;
  camera.top = 1;
  camera.bottom = -1;
  camera.updateProjectionMatrix();
  noisePlane.resize(width / height);
};

const update = () => {
  const time = clock.getDelta();

  instancedCircle.update(time);
  noisePlane.update(time);
  instancedCircle.visible = true;
  noisePlane.visible = false;
  renderer.setRenderTarget(renderTarget);
  renderer.render(scene, camera);
  instancedCircle.visible = false;
  noisePlane.visible = true;
  renderer.setRenderTarget(null);
  renderer.render(scene, camera);
  requestAnimationFrame(update);
};

const init = () => {
  noisePlane.position.setZ(-1);
  scene.add(instancedCircle);
  scene.add(noisePlane);
  camera.position.z = 2;
  camera.lookAt(0, 0, 0);
  clock.start();

  resize();
  update();
};

init();

window.addEventListener(
  "mousemove",
  throttle((e: MouseEvent) => {
    const { clientX, clientY } = e;
    const x =
      ((clientX / resolution.x) * 2 - 1) * (resolution.x / resolution.y);
    const y = -(clientY / resolution.y) * 2 + 1;

    instancedCircle.dropCircle(x, y);
  }, 20)
);
window.addEventListener(
  "touchmove",
  throttle((e: TouchEvent) => {
    const { clientX, clientY } = e.touches[0];
    const x =
      ((clientX / resolution.x) * 2 - 1) * (resolution.x / resolution.y);
    const y = -(clientY / resolution.y) * 2 + 1;

    instancedCircle.dropCircle(x, y);
  }, 20)
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
