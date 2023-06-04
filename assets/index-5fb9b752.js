(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function g(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(t){if(t.ep)return;t.ep=!0;const n=g(t);fetch(t.href,n)}})();var p=`precision mediump float;
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
}`,h=`attribute vec2 a_position;

void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
}`;const s=document.querySelector("canvas");s.width=window.innerWidth;s.height=window.innerHeight;const e=s.getContext("webgl2"),u=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(u,p);e.compileShader(u);const d=e.createShader(e.VERTEX_SHADER);e.shaderSource(d,h);e.compileShader(d);const o=e.createProgram();e.attachShader(o,d);e.attachShader(o,u);e.linkProgram(o);const m=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,m);const _=[-1,-1,1,-1,-1,1,-1,1,1,-1,1,1];e.bufferData(e.ARRAY_BUFFER,new Float32Array(_),e.STATIC_DRAW);const f=e.getAttribLocation(o,"a_position"),A=e.getUniformLocation(o,"u_time"),R=e.getUniformLocation(o,"u_screenResolution");let a=NaN;function v(i){a||(a=i);const r=(i-a)*.001;e.useProgram(o),e.bindBuffer(e.ARRAY_BUFFER,m),e.enableVertexAttribArray(f),e.vertexAttribPointer(f,2,e.FLOAT,!1,0,0),e.uniform1f(A,r),e.uniform2f(R,window.innerWidth,window.innerHeight),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLES,0,6),requestAnimationFrame(v)}requestAnimationFrame(v);
