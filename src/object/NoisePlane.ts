import * as THREE from "three";
import vs from "./glsl/noisePlane.vs";
import fs from "./glsl/noisePlane.fs";

export class NoisePlane extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
    const material = new THREE.RawShaderMaterial({
      vertexShader: vs,
      fragmentShader: fs,
    });
    super(geometry, material);
  }
  resize(width: number) {
    this.scale.set(width, 1, 1);
  }
}
