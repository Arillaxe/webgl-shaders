precision mediump float;
uniform vec2 u_screenResolution;
uniform float u_time;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t * d));
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  vec2 uv = (fragCoord * 2.0 - u_screenResolution) / u_screenResolution.y;
  vec2 uv0 = uv;
  vec3 finalColor = vec3(0.0);

  for (float i = 0.0; i < 4.0; i++) {
    uv = fract(uv * 2.) - .5;

    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 dd = vec3(0.5, 0.33, 0.67);

    float d = length(uv) * exp(-length(uv0 * 2.)) - 3.;

    vec3 col = palette(length(uv0) + u_time * 0.2 + i * .4, a, b, c, dd);

    d = sin(d * 8. + u_time * 1.) / 8.;
    d = abs(d);

    d = 0.01 / d;

    d = pow(d, 1.4);

    finalColor += col *= d;
  }

  gl_FragColor = vec4(finalColor, 1.0);
}
