attribute vec3 position;
attribute vec2 uv;
attribute mat4 instanceMatrix;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

varying vec3 vPosition;
varying vec2 vUv;

void main(void) {
  vec4 mPosition = modelMatrix * instanceMatrix * vec4(position, 1.0);

  vPosition = mPosition.xyz;
  vUv = uv;

  gl_Position = projectionMatrix * viewMatrix * mPosition;
}
