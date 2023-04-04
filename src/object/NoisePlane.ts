import * as THREE from "three";
import vs from "./glsl/NoisePlane.vs?raw";
import fs from "./glsl/NoisePlane.fs?raw";

export class NoisePlane extends THREE.Mesh<
  THREE.BufferGeometry,
  THREE.RawShaderMaterial
> {
  constructor() {
    const geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
    const material = new THREE.RawShaderMaterial({
      vertexShader: vs,
      fragmentShader: fs,
      uniforms: {
        time: { value: 0 },
      },
    });
    super(geometry, material);
  }
  resize(width: number) {
    this.scale.set(width, 1, 1);
  }
  update(time: number) {
    this.material.uniforms.time.value += time;
  }
}
