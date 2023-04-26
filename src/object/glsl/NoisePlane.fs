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
  vec2 uv = vUv + (color.rb * 2.0 - 1.0) * color.g;
  float noise = calcWhiteNoise(floor(gl_FragCoord.xy * 0.15) / 1000.0 + sin(uTime), 1.0);
  float noiseV1 = calcWhiteNoise(floor((gl_FragCoord.xy * 0.02) * vec2(0.0, 1.0)) / 1000.0 + sin(uTime), 1.0);
  float noiseV2 = calcWhiteNoise(floor((gl_FragCoord.xy * 0.1) * vec2(0.0, 1.0)) / 1000.0 + cos(uTime), 1.0);
  gl_FragColor = vec4(vec3(uv.x, 0.0, uv.y) * 0.8 + vec3(noise * 0.2 + smoothstep(0.99, 1.0, noiseV1) * 0.1 + smoothstep(0.95, 1.0, noiseV2) * 0.1), 1.0);
}