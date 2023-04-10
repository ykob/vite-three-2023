import * as THREE from "three";
import vs from "./glsl/InstancedCircle.vs?raw";
import fs from "./glsl/InstancedCircle.fs?raw";

const AMOUNT = 200;
const DURATION = 1.4;

export class InstancedCircle extends THREE.InstancedMesh<
  THREE.PlaneGeometry,
  THREE.RawShaderMaterial
> {
  currentIndex = 0;
  dummy = new THREE.Object3D();
  time = 0;

  constructor() {
    const geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

    geometry.setAttribute(
      "time",
      new THREE.InstancedBufferAttribute(new Float32Array(AMOUNT), 1)
    );

    const material = new THREE.RawShaderMaterial({
      vertexShader: vs,
      fragmentShader: fs,
      uniforms: {
        duration: { value: DURATION },
      },
      transparent: true,
    });

    super(geometry, material, AMOUNT);

    const { time: timeAttribute } = this.geometry.attributes as {
      time: THREE.InstancedBufferAttribute;
    };

    for (let i = 0; i < AMOUNT; i++) {
      timeAttribute.setX(i, DURATION);
    }
  }
  resize(aspect: number) {
    const scale = aspect > 1 ? 1 : 0.75;
    this.scale.set(scale, scale, 1);
  }
  update(time: number) {
    const { time: timeAttribute } = this.geometry.attributes as {
      time: THREE.InstancedBufferAttribute;
    };

    for (let i = 0; i < AMOUNT; i++) {
      timeAttribute.setX(i, timeAttribute.getX(i) + time);
    }
    timeAttribute.needsUpdate = true;
    this.time += time;
  }
  dropCircle(x: number, y: number) {
    const { time: timeAttribute } = this.geometry.attributes as {
      time: THREE.InstancedBufferAttribute;
    };

    timeAttribute.setX(this.currentIndex, 0);
    timeAttribute.needsUpdate = true;
    this.dummy.position.set(
      x + Math.cos(this.time * 10) * 0.1 * this.scale.x,
      y + Math.sin(this.time * 10) * 0.1 * this.scale.y,
      0
    );
    this.dummy.updateMatrix();
    this.setMatrixAt(this.currentIndex, this.dummy.matrix);
    this.instanceMatrix.needsUpdate = true;
    this.currentIndex++;
    if (this.currentIndex >= AMOUNT) {
      this.currentIndex = 0;
    }
  }
}
