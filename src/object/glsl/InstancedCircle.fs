precision highp float;

uniform float uTime;

varying vec3 vPosition;
varying vec2 vUv;
varying float vTime;

void main() {
  gl_FragColor = vec4(vec3(vTime), 1.0);
}