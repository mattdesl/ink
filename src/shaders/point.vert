#pragma glslify: noise = require('glsl-noise/simplex/4d')
#pragma glslify: audio = require('gl-audio-analyser')
#pragma glslify: ease = require('glsl-easings/sine-in-out')

#define POINT_SIZE 2.2

attribute vec4 position;
attribute vec3 offset;

uniform sampler2D iWaveform;
uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;
uniform float iGlobalTime;

varying vec2 uv;

void main() {
  vec3 vpos = position.xyz;
  vec3 mult = offset;
  

  float audioCoord = vpos.x;
  float amplitude = max(0.0, audio(iWaveform, audioCoord));
  amplitude = smoothstep(0.0, 3.0, amplitude*3.0);
  amplitude = ease(amplitude);

  vec4 npos = vec4(vpos, sin(iGlobalTime * sin(2.85 * mult.x)));
  npos.x += amplitude*0.3;

  float fade = 1.0;

  mat4 projModelView = projection * view * model;
  vpos += noise(npos * 0.45) * mult;



  vec4 projected = projModelView * vec4(vpos, 1.0);
  float anim = sin(iGlobalTime*0.1)*0.5+0.5;
  float dist = length(position.zzz);
  // dist = smoothstep(, 0.0, dist);
  gl_Position = projected;

  vec2 screenPos = projected.xy / projected.w;
  vec2 sUv = screenPos.xy * 0.5 + 0.5;
  uv = sUv;
  uv.y = 1.0 - sUv.y;

  gl_PointSize = dist * POINT_SIZE + amplitude*0.05;
  // uv *= 1.5;
}