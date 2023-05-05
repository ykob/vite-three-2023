precision highp float;

uniform sampler2D uTextureNoise;
uniform sampler2D uTextureTarget1;
uniform sampler2D uTextureTarget2;
uniform float uTime;

varying vec3 vPosition;
varying vec2 vUv;

void main() {
  float ready = clamp(0.0, 1.0, uTime / 0.8);
  float noise1 = texture2D(uTextureNoise, vec2(0.0, gl_FragCoord.y * 0.001 + uTime * 5.0)).r;
  float noise2 = texture2D(uTextureNoise, vec2(0.0, gl_FragCoord.y * 0.01 - uTime * 6.0)).g;
  float diff = (noise1 * 2.0 - 1.0) * 0.8 + (noise2 * 2.0 - 1.0) * 0.2;
  vec4 color1 = texture2D(uTextureTarget1, vUv);
  vec4 color2 = texture2D(uTextureTarget2, vUv + vec2(diff * 0.2, 0.0));
  vec4 colorAmount = color2 + color1 * ready;
  gl_FragColor = vec4(colorAmount.rgb * ready, ready);
}