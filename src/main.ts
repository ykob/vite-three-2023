import "./style.css";
import * as THREE from "three";

const canvas = document.getElementById("canvas-webgl") as HTMLCanvasElement;

const renderer = new THREE.WebGLRenderer({ canvas });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);

const resize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

const update = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(update);
};

const init = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
  const cube = new THREE.Mesh(geometry, material);

  scene.add(cube);
  camera.position.z = 2;

  resize();
  update();
};

init();

window.addEventListener("resize", () => {
  resize();
});
