precision highp float;

uniform float uTime;
uniform sampler2D uTexture;

varying vec3 vPosition;
varying vec2 vUv;

float calcWhiteNoise(vec2 uv, float scale) {
  return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453 * scale);
}

void main() {
  vec4 color = texture2D(uTexture, vUv);
  vec2 uv = vUv + color.rb * color.g;
  float noise = calcWhiteNoise(vPosition.xy + sin(uTime), 1.0);
  gl_FragColor = vec4(vec3(uv.x, 0.0, uv.y) * 0.8 + vec3(noise) * 0.3, 1.0);
}