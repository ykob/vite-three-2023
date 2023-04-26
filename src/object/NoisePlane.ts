import * as THREE from "three";
import vs from "./glsl/NoisePlane.vs?raw";
import fs from "./glsl/NoisePlane.fs?raw";

export class NoisePlane extends THREE.Mesh<
  THREE.PlaneGeometry,
  THREE.RawShaderMaterial
> {
  constructor(texture: THREE.Texture) {
    const geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
    const material = new THREE.RawShaderMaterial({
      vertexShader: vs,
      fragmentShader: fs,
      uniforms: {
        uResolution: { value: new THREE.Vector2() },
        uTime: { value: 0 },
        uTexture: { value: texture },
      },
    });
    super(geometry, material);
  }
  resize(width: number, height: number) {
    this.scale.set(width / height, 1, 1);
    this.material.uniforms.uResolution.value.set(width, height);
  }
  update(time: number) {
    this.material.uniforms.uTime.value += time;
  }
}
