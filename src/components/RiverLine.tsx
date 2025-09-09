import * as THREE from "three";
import type { Row } from "../types";
import { Log } from "./Log";
import { tilesPerRow, tileSize } from "../constants";
import { useFrame } from "@react-three/fiber";
import { state as playerState } from "../stores/player";
import useGameStore from "../stores/game";
import { useRef } from "react";

type Props = {
    rowIndex: number;
    rowData: Extract<Row, {type: "river"}>;
}

export function RiverLine({rowIndex, rowData}: Props){
    const groupRef = useRef<THREE.Group>(null);
    const endGame = useGameStore((s) => s.endGame);

    useFrame(() => {
        if (!playerState.ref) return;
        if (useGameStore.getState().status === "over") return;

        // Only consider drowning if player is exactly on this row
        if (playerState.currentRow !== rowIndex) return;

        // If visual child is in the air (jumping), the player is invulnerable to water
        try {
            const visualChildZ = playerState.ref.children[0]?.position.z ?? 0;
            const baseZ = (playerState.ref as any).userData.baseChildZ ?? 0;
            const EPS = 0.1;
            if (visualChildZ > baseZ + EPS) return; // invulnerable while jumping
        } catch (e) {
            // ignore errors and continue
        }

        // Build player bounding box
        const playerBox = new THREE.Box3().setFromObject(playerState.ref);

        // Check intersection against each log (children: 0 = water plane, logs start at 1)
        const anyIntersecting = rowData.logs.some((_, i) => {
            const logObject = groupRef.current?.children[i + 1];
            if (!logObject) return false;
            const box = new THREE.Box3().setFromObject(logObject as THREE.Object3D);
            return playerBox.intersectsBox(box);
        });

        if (!anyIntersecting) {
            endGame();
        }
    });

    return (
        <group position-y={rowIndex * tileSize} ref={groupRef}>
            {/* Water plane */}
            <mesh receiveShadow>
                <planeGeometry args={[tilesPerRow * tileSize, tileSize]} />
                <meshLambertMaterial color={0x3ea0ff} flatShading />
            </mesh>

            {/* Logs on the river */}
            {rowData.logs.map((log, index) => (
                <Log
                    key={index}
                    rowIndex={rowIndex}
                    initialTileIndex={log.initialTileIndex}
                    direction={rowData.direction}
                    speed={rowData.speed}
                    color={log.color}
                />
            ))}
        </group>
    )
}
