precision highp float;

varying vec3 vPosition;
varying vec2 vUv;

void main() {
  gl_FragColor = vec4(1.0 - vUv, 1.0, 1.0);
}