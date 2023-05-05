precision highp float;

uniform float uGlitchStep;
uniform float uTime;

varying vec3 vPosition;
varying vec2 vUv;

float calcWhiteNoise(vec2 uv, float scale) {
  return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453 * scale);
}

void main() {
  float noise = calcWhiteNoise(floor(gl_FragCoord.xy * 0.32) / 1000.0 + sin(uTime), 1.0);
  float noiseV1 = calcWhiteNoise(floor((gl_FragCoord.xy * 0.02) * vec2(0.0, 1.0)) / 1000.0 + sin(uTime), 1.0);
  float noiseV2 = calcWhiteNoise(floor((gl_FragCoord.xy * 0.1) * vec2(0.0, 1.0)) / 1000.0 + cos(uTime), 1.0);
  float noiseL = calcWhiteNoise(floor((gl_FragCoord.xy * (2.0 + sin(uTime * 200.0)) * 0.01 + uTime * 10.0) * vec2(0.14 + cos(uTime * 300.0) * 0.04, 1.0)) / 1000.0 + sin(uTime * 0.1), 1.0);
  float glitchStep = smoothstep(0.9, 0.91, uGlitchStep);
  gl_FragColor = vec4(
    vec3(vUv.x, 0.0, vUv.y) * 0.8
      + noise * 0.18
      + smoothstep(0.99 - glitchStep * 0.1, 1.0, noiseV1) * 0.1
      + smoothstep(0.96 - glitchStep * 0.2, 1.0, noiseV2) * 0.1
      + smoothstep(0.98 - glitchStep * 0.2, 1.0, noiseL) * 0.1,
    1.0
    );
}