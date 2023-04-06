import * as THREE from "three";
import vs from "./glsl/InstancedCircle.vs?raw";
import fs from "./glsl/InstancedCircle.fs?raw";

const AMOUNT = 100;

export class InstancedCircle extends THREE.InstancedMesh<
  THREE.PlaneGeometry,
  THREE.RawShaderMaterial
> {
  currentIndex = 0;

  constructor() {
    const geometry = new THREE.PlaneGeometry(0.1, 0.1, 1, 1);

    geometry.setAttribute(
      "time",
      new THREE.InstancedBufferAttribute(new Float32Array(AMOUNT), 1)
    );

    const material = new THREE.RawShaderMaterial({
      vertexShader: vs,
      fragmentShader: fs,
    });
    super(geometry, material, AMOUNT);
  }
  init() {
    const dummy = new THREE.Object3D();

    for (let i = 0; i < AMOUNT; i++) {
      dummy.position.set(Math.random() * 2 - 1, Math.random() * 2 - 1, 0);
      dummy.updateMatrix();
      this.setMatrixAt(i, dummy.matrix);
    }
    this.instanceMatrix.needsUpdate = true;
  }
  update(time: number) {
    const { time: timeAttribute } = this.geometry.attributes as {
      time: THREE.InstancedBufferAttribute;
    };

    for (let i = 0; i < AMOUNT; i++) {
      timeAttribute.setX(i, timeAttribute.getX(i) + time);
    }
    timeAttribute.needsUpdate = true;
  }
}
