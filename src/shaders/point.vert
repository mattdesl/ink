#pragma glslify: noise = require('glsl-noise/simplex/4d')
#define POINT_SIZE 3.0

attribute vec4 position;
attribute vec3 offset;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;
uniform float iGlobalTime;

varying vec2 uv;

void main() {
  vec3 vpos = position.xyz;
  vec3 mult = offset;
  vec4 npos = vec4(vpos, sin(iGlobalTime * sin(2.85 * offset.x)));
  float fade = 1.0;

  mat4 projModelView = projection * view * model;
  vpos += noise(npos * 0.45) * mult;

  vec4 projected = projModelView * vec4(vpos, 1.0);
  float anim = sin(iGlobalTime*0.1)*0.5+0.5;
  float dist = length(position.zzz);
  // dist = smoothstep(, 0.0, dist);
  gl_PointSize = dist * POINT_SIZE;
  gl_Position = projected;

  vec2 screenPos = projected.xy / projected.w;
  uv = screenPos.xy * 0.5 + 0.5;
  uv.y = 1.0 - uv.y;
  // uv *= 1.5;
}