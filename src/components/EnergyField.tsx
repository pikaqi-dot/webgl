import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const EnergyField = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const shaderRef = useRef<THREE.ShaderMaterial>(null)

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color(0x00ffff) },
      uColor2: { value: new THREE.Color(0xff00ff) },
      uSpeed: { value: 0.5 },
      uIntensity: { value: 1.5 },
      uDensity: { value: 5.0 }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;

      void main() {
        vUv = uv;
        vPosition = position;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
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
    `,
    transparent: true,
    side: THREE.DoubleSide,
    wireframe: false
  })

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
      <sphereGeometry args={[2, 64, 64]} />
      <primitive object={shaderMaterial} ref={shaderRef} attach="material" />
    </mesh>
  )
}

export default EnergyField
