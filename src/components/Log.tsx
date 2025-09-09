import * as THREE from "three";
import { useRef } from "react";
import { tileSize } from "../constants";
import useVehicleAnimation from "../hook/useVehicleAnimation";
import useLogTransport from "../hook/useLogTransport";

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
    // transport the player when they stand on the log (not while jumping)
    useLogTransport(log, rowIndex, direction, speed);

    return (
        <group
            position-x={initialTileIndex * tileSize}
            rotation-z={direction ? 0 : Math.PI}
            ref={log}
        >
            <mesh position={[0,0,0.5]} castShadow receiveShadow>
                <boxGeometry args={[tileSize * 3, tileSize * 0.8, 6]} />
                <meshLambertMaterial color={color} flatShading />
            </mesh>
        </group>
    )
}
