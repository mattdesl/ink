precision mediump float;

uniform vec2 iResolution;
uniform vec3 tint;
uniform sampler2D iChannel0;
varying vec2 uv;

#pragma glslify: luma = require('glsl-luma')
// #pragma glslify: audio = require('gl-audio-analyser')

void main() {
  float dist = length(uv - 0.5);
  dist = smoothstep(0.4, 0.5, dist);

  vec3 color = texture2D(iChannel0, uv + vec2(0.0, 0.05)).rgb;

  // color += max(0., +amplitude) * vec3(0.5, 1.0, 0.2);
  // color += max(0., -amplitude) * vec3(0.9, 0.1, 0.4);


  if (tint == vec3(0.0)) {
    gl_FragColor.rgb = vec3(luma(color));
  }
  else {
    gl_FragColor.rgb = tint;
  }
  gl_FragColor.a = 1.0;
   // gl_FragColor = vec4(1.0) * tint;
}
