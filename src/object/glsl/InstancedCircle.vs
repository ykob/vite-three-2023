attribute vec3 position;
attribute vec2 uv;
attribute mat4 instanceMatrix;
attribute float time;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float duration;

varying vec3 vPosition;
varying vec2 vUv;
varying float vStep1;
varying float vStep2;

void main(void) {
  float s1 = clamp(time, 0.0, duration * 0.05) / (duration * 0.05);
  float s2 = clamp(time - duration * 0.2, 0.0, duration * 0.8) / (duration * 0.8);
  vec4 mPosition = modelMatrix * instanceMatrix * vec4(position, 1.0);

  vPosition = mPosition.xyz;
  vUv = uv;
  vStep1 = s1;
  vStep2 = s2;

  gl_Position = projectionMatrix * viewMatrix * mPosition;
}
