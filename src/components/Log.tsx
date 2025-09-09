import * as THREE from "three";
import { useRef } from "react";
import { tileSize } from "../constants";
import useVehicleAnimation from "../hook/useVehicleAnimation";

type Props = {
    rowIndex: number;
    initialTileIndex: number;
    direction: boolean;
    speed: number;
    color?: THREE.ColorRepresentation;
}

export function Log({rowIndex, initialTileIndex, direction, speed, color=0x8B5A2B}: Props){
    const log = useRef<THREE.Group>(null);
    useVehicleAnimation(log, direction, speed);

    return (
        <group
            position-x={initialTileIndex * tileSize}
            rotation-z={direction ? 0 : Math.PI}
            ref={log}
        >
            <mesh position={[0,0,6]} castShadow receiveShadow>
                <boxGeometry args={[tileSize * 3, tileSize * 0.8, 6]} />
                <meshLambertMaterial color={color} flatShading />
            </mesh>
        </group>
    )
}
