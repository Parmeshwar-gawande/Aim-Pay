import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

// JSX wrappers for Three.js primitives
const Group = 'group' as unknown as React.ComponentType<any>;
const Mesh = 'mesh' as unknown as React.ComponentType<any>;
const SphereGeometry = 'sphereGeometry' as unknown as React.ComponentType<any>;
const MeshStandardMaterial = 'meshStandardMaterial' as unknown as React.ComponentType<any>;
const RingGeometry = 'ringGeometry' as unknown as React.ComponentType<any>;
const MeshBasicMaterial = 'meshBasicMaterial' as unknown as React.ComponentType<any>;
const AmbientLight = 'ambientLight' as unknown as React.ComponentType<any>;
const PointLight = 'pointLight' as unknown as React.ComponentType<any>;

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

/* ================= MARKER ================= */
function CurrencyMarker({
  currency,
  data,
  position,
}: {
  currency: string;
  data: CurrencyData;
  position: [number, number, number];
}) {
  const [hovered, setHovered] = useState(false);
  const markerRef = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (!markerRef.current) return;
    const t = clock.getElapsedTime();
    const scale = hovered ? 1.4 : 1 + Math.sin(t * 2 + offset) * 0.12;
    markerRef.current.scale.setScalar(scale);
  });

  return (
    <Group position={position}>
      <Mesh
        ref={markerRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <SphereGeometry args={[0.04, 16, 16]} />
        <MeshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={0.6}
        />
      </Mesh>

      {/* Glow ring */}
      <Mesh rotation={[Math.PI / 2, 0, 0]}>
        <RingGeometry args={[0.05, 0.07, 32]} />
        <MeshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </Mesh>

      {hovered && (
        <Html distanceFactor={8}>
          <div className="bg-black text-black px-4 py-3 rounded-lg shadow-xl border border-amber-500/30 min-w-[200px]">
            <div className="text-sm font-semibold text-amber-400">
              {currency}
            </div>
            <div className="text-xs text-slate-200 mb-2">
              {data.country}
            </div>
            <div className="text-lg font-bold">
              1 USD = {data.rate.toFixed(2)} {currency}
            </div>
          </div>
        </Html>
      )}
    </Group>
  );
}

/* ================= GLOBE ================= */
function Globe({ rates }: GlobeProps) {
  const globeRef = useRef<THREE.Group>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  const earthTexture = useLoader(
    THREE.TextureLoader,
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg'
  );

  const RADIUS = 1.6;

  const latLonToVector3 = (lat: number, lon: number, r: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    return [
      -r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta),
    ] as [number, number, number];
  };

  const markers = useMemo(
    () =>
      Object.entries(rates).map(([currency, data]) => ({
        currency,
        data,
        position: latLonToVector3(data.lat, data.lon, RADIUS + 0.05),
      })),
    [rates]
  );

  useFrame(() => {
    if (globeRef.current && autoRotate) {
      globeRef.current.rotation.y += 0.0008;
    }
  });

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { earthTexture: { value: earthTexture } },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vNormal;
          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D earthTexture;
          varying vec2 vUv;
          varying vec3 vNormal;

          void main() {
            vec4 tex = texture2D(earthTexture, vUv);
            float lum = dot(tex.rgb, vec3(0.299,0.587,0.114));

            vec3 land = vec3(0.96, 0.62, 0.11);   // amber
            vec3 ocean = vec3(0.02, 0.09, 0.18); // slate-950

            vec3 color = mix(ocean, land, smoothstep(0.25, 0.45, lum));

            vec3 lightDir = normalize(vec3(1.0,1.0,1.0));
            float diff = max(dot(vNormal, lightDir), 0.35);

            gl_FragColor = vec4(color * diff, 1.0);
          }
        `,
      }),
    [earthTexture]
  );

  return (
    <>
      <Group ref={globeRef} onPointerDown={() => setAutoRotate(false)}>
        <Sphere args={[RADIUS, 64, 64]} material={material} />

        {/* Atmosphere */}
        <Sphere args={[RADIUS + 0.12, 64, 64]}>
          <MeshStandardMaterial
            color="#f59e0b"
            transparent
            opacity={0.08}
            side={THREE.BackSide}
          />
        </Sphere>

        {markers.map(m => (
          <CurrencyMarker key={m.currency} {...m} />
        ))}
      </Group>

      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={7}
        onStart={() => setAutoRotate(false)}
      />
    </>
  );
}

/* ================= CANVAS ================= */
export default function CurrencyGlobe({ rates }: GlobeProps) {
  return (
    <div className="w-[800px] h-[500px] mx-auto">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <AmbientLight intensity={0.6} />
        <PointLight position={[8, 8, 8]} intensity={1.1} />
        <PointLight position={[-8, -8, -8]} intensity={0.3} />
        <Globe rates={rates} />
      </Canvas>
    </div>
  );
}

export { CurrencyGlobe };
