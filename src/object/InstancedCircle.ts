import * as THREE from "three";
import vs from "./glsl/InstancedCircle.vs?raw";
import fs from "./glsl/InstancedCircle.fs?raw";

export class InstancedCircle extends THREE.InstancedMesh<
  THREE.BufferGeometry,
  THREE.RawShaderMaterial
> {
  constructor() {
    const geometry = new THREE.PlaneGeometry(0.5, 0.5, 1, 1);
    const material = new THREE.RawShaderMaterial({
      vertexShader: vs,
      fragmentShader: fs,
      uniforms: {
        uTime: { value: 0 },
      },
    });
    super(geometry, material, 1000);
  }
  init() {
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 100; i++) {
      dummy.position.set(Math.random() * 2 - 1, Math.random() * 2 - 1, 0);
      dummy.updateMatrix();
      this.setMatrixAt(i, dummy.matrix);
    }
    this.instanceMatrix.needsUpdate = true;
  }
}
