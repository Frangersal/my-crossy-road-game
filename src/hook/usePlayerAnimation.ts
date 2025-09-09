import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { state, stepCompleted } from "../stores/player"
import { tileSize } from "../constants"

export default function usePlayerAnimation(
    ref: React.RefObject<THREE.Group  | null>
) {
    const moveClock = new THREE.Clock(false);

    useFrame( ()=> {
        if(!ref.current) return;
        if(!state.movesQueue.length) return;
        const player = ref.current;

        if(!moveClock.running) {
            moveClock.start();
            // capture the base Z of the visual child so hops are relative
            try {
                (player as any).userData.baseChildZ = player.children[0]?.position.z ?? 0;
            } catch (e) {
                (player as any).userData.baseChildZ = 0;
            }
        }
        
        const stepTime = 0.2;
        const progress = Math.min(1, moveClock.getElapsedTime()/stepTime);

    setPosition(player, progress);
        setRotation(player, progress);

        // Once a step has ended

        if(progress >= 1){
            stepCompleted();
            moveClock.stop();
            // Ensure visual child Z is reset exactly to base after the step
            try {
                const base = (player as any).userData.baseChildZ ?? 0;
                if (player.children[0]) player.children[0].position.z = base;
            } catch (e) {}
        }
    } );
}

function setPosition(player:THREE.Group, progress: number) {
    const startX = state.currentTile* tileSize;
    const startY = state.currentRow* tileSize;
    let endX = startX;
    let endY = startY;

    if (state.movesQueue[0] === "left" ) endX -= tileSize;
    if (state.movesQueue[0] === "right" ) endX += tileSize;
    // CORRECCIÓN: movimiento hacia adelante debe ser relativo al inicio
    if (state.movesQueue[0] === "forward" ) endY = startY + tileSize;
    if (state.movesQueue[0] === "backward" ) endY -= tileSize;

    player.position.x = THREE.MathUtils.lerp(startX, endX, progress);
    player.position.y = THREE.MathUtils.lerp(startY, endY, progress);
    const baseZ = (player as any).userData.baseChildZ ?? 0;
    const jumpHeight = 6; // reduced amplitude to avoid penetrating ground
    const z = baseZ + Math.sin(progress * Math.PI) * jumpHeight;
    player.children[0].position.z = Math.max(baseZ, z);
    
}

function setRotation(player:THREE.Group, progress: number) {
    let endRotation = 0;
    if (state. movesQueue[0] === "forward" ) endRotation = 0;
    if (state. movesQueue[0] === "left" ) endRotation = Math.PI / 2;
    if (state. movesQueue[0] === "right" ) endRotation = -Math.PI / 2;
    if (state. movesQueue[0] === "backward" ) endRotation = Math.PI;

    player.children[0].rotation.z = THREE.MathUtils.lerp(
        player.children[0].rotation.z,
        endRotation,
        progress
    )
}