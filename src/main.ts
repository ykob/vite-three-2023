import "./style.css";
import * as THREE from "three";
import { NoisePlane } from "./object";

const canvas = document.getElementById("canvas-webgl") as HTMLCanvasElement;

const renderer = new THREE.WebGLRenderer({ canvas });
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 100);
const noisePlane = new NoisePlane();

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
  renderer.render(scene, camera);
  requestAnimationFrame(update);
};

const init = () => {
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
