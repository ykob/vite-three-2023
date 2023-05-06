import * as THREE from "three";
import vs from "./glsl/NoisePlane2.vs?raw";
import fs from "./glsl/NoisePlane2.fs?raw";

export class NoisePlane2 extends THREE.Mesh<
  THREE.PlaneGeometry,
  THREE.RawShaderMaterial
> {
  timeFps = 0;

  constructor(texture1: THREE.Texture, texture2: THREE.Texture) {
    const geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
    const material = new THREE.RawShaderMaterial({
      vertexShader: vs,
      fragmentShader: fs,
      uniforms: {
        uGlitchStep: { value: 0 },
        uTextureNoise: { value: null },
        uTextureTarget1: { value: texture1 },
        uTextureTarget2: { value: texture2 },
        uTime: { value: 0 },
      },
      transparent: true,
    });
    super(geometry, material);
  }
  setNoiseTexture(texture: THREE.Texture) {
    this.material.uniforms.uTextureNoise.value = texture;
  }
  resize(width: number, height: number) {
    this.scale.set(width / height, 1, 1);
  }
  update(time: number) {
    this.timeFps += time;
    if (this.timeFps < 1 / 60) return;
    this.material.uniforms.uTime.value += time;
    this.timeFps = 0;
  }
}
