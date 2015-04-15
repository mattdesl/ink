#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 iResolution;
uniform vec3 tint;
varying vec2 uv;

void main() {
  // vec2 uv = gl_FragCoord.xy / iResolution.xy;
  vec3 color = vec3(0.25);
  gl_FragColor.rgb = tint;
  gl_FragColor.a = 1.0;
   // gl_FragColor = vec4(1.0) * tint;
}
