import * as THREE from "three";
import vs from "./glsl/NoisePlane1.vs?raw";
import fs from "./glsl/NoisePlane1.fs?raw";

export class NoisePlane1 extends THREE.Mesh<
  THREE.PlaneGeometry,
  THREE.RawShaderMaterial
> {
  timeFps = 0;
  timeGlitchStep = 0;

  constructor() {
    const geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
    const material = new THREE.RawShaderMaterial({
      vertexShader: vs,
      fragmentShader: fs,
      uniforms: {
        uGlitchStep: { value: 0 },
        uTime: { value: 0 },
      },
    });
    super(geometry, material);
  }
  resize(width: number, height: number) {
    this.scale.set(width / height, 1, 1);
  }
  update(time: number) {
    this.timeFps += time;
    if (this.timeFps >= 1 / 60) {
      this.material.uniforms.uTime.value += time;
      this.timeFps = 0;
    };

    this.timeGlitchStep += time;
    if (this.timeGlitchStep >= 1 / 10) {
      this.material.uniforms.uGlitchStep.value = Math.random();
      this.timeGlitchStep = 0;
    }
  }
}
