precision highp float;

uniform float uTime;

varying vec3 vPosition;
varying vec2 vUv;
varying float vStep1;
varying float vStep2;

void main() {
  vec2 p = vUv / 0.5 - 1.0;
  float alpha = 1.0 - (length(p) + (1.0 - vStep1) + vStep2);
  gl_FragColor = vec4(vec3(1.0), alpha * 0.4);
}