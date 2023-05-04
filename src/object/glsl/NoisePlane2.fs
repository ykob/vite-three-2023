precision highp float;

uniform float uTime;
uniform sampler2D uTextureNoise;
uniform sampler2D uTextureTarget1;
uniform sampler2D uTextureTarget2;

varying vec3 vPosition;
varying vec2 vUv;

void main() {
  float ready = clamp(0.0, 1.0, uTime / 0.8);
  float power = smoothstep(0.0, 1.0, (sin(uTime * 40.0) + cos(uTime * 200.0) * 0.4 + sin(uTime * 333.0) * 0.2) / 1.6);
  float noise1 = texture2D(uTextureNoise, vec2(0.0, vUv.y + uTime)).r;
  float noise2 = texture2D(uTextureNoise, vec2(
    0.0, vUv.y - uTime)).g;
  float diff = smoothstep(0.2, 1.0, noise1) + smoothstep(0.4, 1.0, noise2) * -1.0;
  vec4 color1 = texture2D(uTextureTarget1, vUv);
  vec4 color2 = texture2D(uTextureTarget2, vUv + vec2(diff * power * 0.2, 0.0));
  vec4 colorAmount = color2 + color1 * ready;
  gl_FragColor = vec4(colorAmount.rgb * ready, ready);
}