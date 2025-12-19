import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

interface CurrencyData {
  rate: number;
  country: string;
  lat: number;
  lon: number;
}

interface CurrencyRates {
  [key: string]: CurrencyData;
}

interface GlobeProps {
  rates: CurrencyRates;
}

function CurrencyMarker({ 
  currency, 
  data, 
  position 
}: { 
  currency: string; 
  data: CurrencyData; 
  position: [number, number, number] 
}) {
  const [hovered, setHovered] = useState(false);
  const markerRef = useRef<THREE.Mesh>(null);
  
  // Random offset for staggered animation
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (markerRef.current) {
      // Pulsing scale animation
      const pulseScale = hovered ? 1.5 : 1 + Math.sin(time * 2 + offset) * 0.15;
      markerRef.current.scale.setScalar(pulseScale);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={markerRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial 
          color={hovered ? "#ef4444" : "#dc2626"}
          emissive={hovered ? "#ef4444" : "#dc2626"}
          emissiveIntensity={0.6}
        />
      </mesh>
      
      {/* Glowing ring effect */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.06, 0.08, 32]} />
        <meshBasicMaterial 
          color="#ff6b35" 
          transparent 
          opacity={0.3 + Math.random() * 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-gray-900/95 backdrop-blur-sm text-white px-4 py-3 rounded-lg shadow-xl border border-orange-500/30 min-w-[200px]">
            <div className="text-sm font-semibold text-orange-400 mb-1">{currency}</div>
            <div className="text-xs text-gray-300 mb-2">{data.country}</div>
            <div className="text-lg font-bold">1 USD = {data.rate.toFixed(2)} {currency}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

function Globe({ rates }: GlobeProps) {
  const globeGroupRef = useRef<THREE.Group>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  // Load earth texture
  const earthTexture = useLoader(
    THREE.TextureLoader,
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg'
  );

  // Convert lat/lon to 3D coordinates
  const latLonToVector3 = (lat: number, lon: number, radius: number): [number, number, number] => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return [x, y, z];
  };

  const markers = useMemo(() => {
    return Object.entries(rates).map(([currency, data]) => {
      const position = latLonToVector3(data.lat, data.lon, 2.01);
      return { currency, data, position };
    });
  }, [rates]);

  useFrame(() => {
    if (globeGroupRef.current && autoRotate) {
      globeGroupRef.current.rotation.y += 0.001;
    }
  });

  // Create custom material with orange land and white ocean
  const customMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        earthTexture: { value: earthTexture },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D earthTexture;
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          vec4 texColor = texture2D(earthTexture, vUv);
          float luminance = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
          
          // If bright (land), use orange; if dark (ocean), use white
          vec3 landColor = vec3(1.0, 0.5, 0.2); // Orange
          vec3 oceanColor = vec3(1.0, 1.0, 1.0); // White
          
          // Threshold to distinguish land from ocean
          float threshold = 0.3;
          vec3 finalColor = mix(oceanColor, landColor, smoothstep(threshold - 0.1, threshold + 0.1, luminance));
          
          // Add some lighting
          vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
          float diffuse = max(dot(vNormal, lightDir), 0.3);
          
          gl_FragColor = vec4(finalColor * diffuse, 1.0);
        }
      `,
    });
  }, [earthTexture]);

  return (
    <>
      <group ref={globeGroupRef} onPointerDown={() => setAutoRotate(false)}>
        <Sphere args={[2, 64, 64]} material={customMaterial} />
        
        {/* Atmosphere glow */}
        <Sphere args={[2.15, 64, 64]}>
          <meshStandardMaterial
            color="#ffa500"
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </Sphere>

        {markers.map(({ currency, data, position }) => (
          <CurrencyMarker 
            key={currency} 
            currency={currency} 
            data={data} 
            position={position} 
          />
        ))}
      </group>

      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        autoRotate={false}
        onStart={() => setAutoRotate(false)}
      />
    </>
  );
}

export default function CurrencyGlobe({ rates }: GlobeProps) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} />
        <Globe rates={rates} />
      </Canvas>
    </div>
  );
}
