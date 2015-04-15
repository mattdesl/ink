attribute vec4 position;
attribute vec3 offset;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;
uniform float iGlobalTime;

#pragma glslify: noise = require('glsl-noise/simplex/4d')

void main() {
  vec3 vpos = position.xyz;
  vec3 mult = offset;
  vec4 npos = vec4(vpos, sin(iGlobalTime * cos(offset.x)));
  float fade = 1.0;

  vpos += noise(npos * 0.45 * offset.x) * mult;
  gl_Position = projection * view * model * vec4(vpos, 1.0);
  float dist = length(position.zzz);
  gl_PointSize = dist * 3.0;
}