import * as THREE from "three";

export class NoisePlane extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
    super(geometry, material);
  }
  resize(width: number) {
    this.scale.set(width, 1, 1);
  }
}
