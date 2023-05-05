import "./style.css";
import * as THREE from "three";
import { InstancedCircle, NoisePlane1, NoisePlane2 } from "./object";
import { debounce, throttle } from "./utils";

const canvas = document.getElementById("canvas-webgl") as HTMLCanvasElement;

const renderer = new THREE.WebGLRenderer({ canvas });
const renderTarget1 = new THREE.WebGLRenderTarget();
const renderTarget2 = new THREE.WebGLRenderTarget();
const clock = new THREE.Clock();
const resolution = new THREE.Vector2();
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 100);
const texLoader = new THREE.TextureLoader();
const instancedCircle = new InstancedCircle();
const noisePlane1 = new NoisePlane1();
const noisePlane2 = new NoisePlane2(
  renderTarget1.texture,
  renderTarget2.texture
);

let isReady = false;

clock.autoStart = false;
renderer.setClearColor(0x000000, 0.0);

const resize = () => {
  renderer.setSize(0, 0, false);

  const width = window.innerWidth;
  const height = document.documentElement.clientHeight;

  renderer.setSize(width, height, false);
  renderTarget1.setSize(width, height);
  renderTarget2.setSize(width, height);
  resolution.set(width, height);

  camera.left = -width / height;
  camera.right = width / height;
  camera.top = 1;
  camera.bottom = -1;
  camera.updateProjectionMatrix();
  noisePlane1.resize(resolution.x, resolution.y);
  noisePlane2.resize(resolution.x, resolution.y);
  instancedCircle.resize(width / height);
};

const update = () => {
  if (isReady) {
    const time = clock.getDelta();

    instancedCircle.update(time);
    noisePlane1.update(time);
    noisePlane2.update(time);
    instancedCircle.visible = true;
    noisePlane1.visible = false;
    noisePlane2.visible = false;
    renderer.setRenderTarget(renderTarget1);
    renderer.render(scene, camera);
    instancedCircle.visible = false;
    noisePlane1.visible = true;
    renderer.setRenderTarget(renderTarget2);
    renderer.render(scene, camera);
    noisePlane1.visible = false;
    noisePlane2.visible = true;
    renderer.setRenderTarget(null);
    renderer.render(scene, camera);
  }
  requestAnimationFrame(update);
};

const init = () => {
  noisePlane1.position.setZ(-1);
  noisePlane2.position.setZ(-1);
  scene.add(instancedCircle);
  scene.add(noisePlane1);
  scene.add(noisePlane2);
  camera.position.z = 2;
  camera.lookAt(0, 0, 0);
  clock.start();
  texLoader.loadAsync("noise.jpg").then((texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    noisePlane2.setNoiseTexture(texture);
    isReady = true;
  });
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

    if (!isReady) return;
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

    if (!isReady) return;
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
