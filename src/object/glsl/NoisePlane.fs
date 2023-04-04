precision highp float;

varying vec3 vPosition;
varying vec2 vUv;

float calcWhiteNoise(vec2 uv, float scale) {
  return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453 * scale);
}

void main() {
  float noise = calcWhiteNoise(vUv, 1.0);
  gl_FragColor = vec4(vec3(noise), 1.0);
}