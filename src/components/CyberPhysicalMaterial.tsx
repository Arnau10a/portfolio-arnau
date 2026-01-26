import React from 'react';
import * as THREE from 'three';
import { extend, type ThreeElement } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

const CyberPhysicalMaterialImpl = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color('#ffffff'),
    uDataColor: new THREE.Color('#00f2ff'),
    uOpacity: 0.2,
    uFresnelBias: 0.1,
    uFresnelScale: 1.0,
    uFresnelPower: 2.0,
  },
  // Vertex Shader
  `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec2 vUv;
    varying vec3 vWorldPosition;

    void main() {
      vUv = uv;
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec3 uDataColor;
    uniform float uOpacity;
    uniform float uFresnelBias;
    uniform float uFresnelScale;
    uniform float uFresnelPower;

    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec2 vUv;
    varying vec3 vWorldPosition;

    void main() {
      // Fresnel effect
      vec3 viewDirection = normalize(vViewPosition);
      float fresnel = uFresnelBias + uFresnelScale * pow(1.0 + dot(viewDirection, vNormal), uFresnelPower);
      
      // Moving data lines
      float dataLines = step(0.98, fract(vUv.y * 20.0 - uTime * 0.5));
      dataLines += step(0.98, fract(vUv.x * 20.0 + uTime * 0.3));
      
      // Vertical flow
      float flow = sin(vUv.y * 50.0 - uTime * 2.0) * 0.5 + 0.5;
      float scanline = smoothstep(0.45, 0.5, flow) * smoothstep(0.55, 0.5, flow);
      
      vec3 finalColor = mix(uColor, uDataColor, scanline * 0.5 + dataLines);
      
      float alpha = uOpacity + fresnel * 0.5 + scanline * 0.2 + dataLines * 0.8;
      
      gl_FragColor = vec4(finalColor, alpha);
      
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `
);

extend({ CyberPhysicalMaterialImpl });

// Type declaration for JSX
declare module '@react-three/fiber' {
  interface ThreeElements {
    cyberPhysicalMaterialImpl: ThreeElement<typeof CyberPhysicalMaterialImpl>;
  }
}

export const CyberPhysicalMaterial = React.forwardRef((props: any, ref) => {
  return <cyberPhysicalMaterialImpl ref={ref} transparent {...props} />;
});
