import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const CODE_SNIPPETS = [
    'const innovation = true;',
    'function build() {',
    'import { Fullscreen } from "API";',
    'if (user.isCool) enter();',
    'std::cout << "Future";',
    '01101010 01101011',
    'while(true) { lead(); }',
    'Pavan Rapolu v2.0',
    'docker compose up',
    'go run main.go'
];

const FloatingCodeItem = ({ snippet, position, speed }: { snippet: string, position: [number, number, number], speed: number }) => {
    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (ref.current) {
            ref.current.position.y += Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.001;
            ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + position[1]) * 0.1;

            // Mouse parallax
            const { x, y } = state.mouse;
            ref.current.position.x = position[0] + x * 0.2;
            ref.current.position.y = position[1] + y * 0.2;
        }
    });

    return (
        <group ref={ref} position={position}>
            <Text
                fontSize={0.04}
                color="#6366f1"
                font="https://fonts.gstatic.com/s/robotomono/v12/L0tkDFI8S0CDzP7K_vpsNYG-jEw.woff"
                anchorX="center"
                anchorY="middle"
                fillOpacity={0.15}
            >
                {snippet}
            </Text>
        </group>
    );
};

const FloatingCode = () => {
    const items = useMemo(() => {
        return Array.from({ length: 12 }).map((_, i) => ({
            id: i,
            snippet: CODE_SNIPPETS[i % CODE_SNIPPETS.length],
            position: [
                ((i * 1.7) % 1 - 0.5) * 4,
                ((i * 2.3) % 1 - 0.5) * 4,
                ((i * 3.1) % 1 - 1) * 2
            ] as [number, number, number],
            speed: 0.2 + ((i * 4.7) % 1) * 0.5
        }));
    }, []);

    return (
        <group>
            {items.map((item) => (
                <FloatingCodeItem key={item.id} {...item} />
            ))}
        </group>
    );
};

export default FloatingCode;
