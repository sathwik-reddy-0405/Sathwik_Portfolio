import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';
import FloatingCode from './FloatingCode';

const ParticleField = ({ count = 2000 }) => {
    const points = useMemo(() => random.inSphere(new Float32Array(count * 3), { radius: 1.5 }), [count]);
    const ref = useRef<THREE.Points>(null);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 30;
            ref.current.rotation.y -= delta / 40;

            // Mouse reaction
            const { x, y } = state.mouse;
            ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, x * 0.05, 0.1);
            ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, y * 0.05, 0.1);
        }
    });

    return (
        <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#6366f1"
                size={0.003}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.6}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
};

const Stars = (props: Record<string, unknown>) => {
    const ref = useRef<THREE.Points>(null);
    const sphere = useMemo(() => random.inSphere(new Float32Array(5000), { radius: 2.5 }), []);

    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 20;
            ref.current.rotation.y -= delta / 25;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.0015}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.3}
                />
            </Points>
        </group>
    );
};

interface ThreeBackgroundProps {
    started: boolean;
    isFullscreen: boolean;
}

const ThreeBackground = ({ started, isFullscreen }: ThreeBackgroundProps) => {
    return (
        <div className={`fixed inset-0 z-0 transition-colors duration-1000 ${started ? 'bg-[#00040a]' : 'bg-black'}`}>
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ambientLight intensity={0.5} />
                <Stars />
                {started && <ParticleField count={isFullscreen ? 3000 : 1500} />}
                {started && <FloatingCode />}

                {/* Visual feedback for fullscreen state */}
                {started && (
                    <pointLight
                        position={[1, 1, 1]}
                        intensity={isFullscreen ? 2 : 1}
                        color="#6366f1"
                    />
                )}
            </Canvas>
        </div>
    );
};

export default ThreeBackground;
