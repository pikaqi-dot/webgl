uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uSpeed;
uniform float uIntensity;
uniform float uDensity;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

float random (vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise (in vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) + 
          (c - a)* u.y * (1.0 - u.x) + 
          (d - b) * u.x * u.y;
}

void main() {
  vec2 uv = vUv * uDensity;
  uv.x += uTime * 0.1 * uSpeed;
  uv.y += uTime * 0.05 * uSpeed;
  
  float n = noise(uv);
  n = pow(n, 3.0) * uIntensity;
  
  vec3 color = mix(uColor1, uColor2, n);
  
  float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
  color *= fresnel;
  
  gl_FragColor = vec4(color, 1.0);
}
