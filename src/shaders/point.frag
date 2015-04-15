precision mediump float;

uniform vec2 iResolution;
uniform vec3 tint;
uniform sampler2D iChannel0;
varying vec2 uv;

void main() {
  float dist = length(uv - 0.5);
  dist = smoothstep(0.4, 0.5, dist);

  vec3 color = texture2D(iChannel0, uv).rgb;

  if (tint == vec3(0.0)) {
    gl_FragColor.rgb = color;
  }
  else {
    gl_FragColor.rgb = tint;
  }
  gl_FragColor.a = 1.0;
   // gl_FragColor = vec4(1.0) * tint;
}
