import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { state as playerState } from "../stores/player";
import { tileSize } from "../constants";
import useGameStore from "../stores/game";

// Transport player when they are standing on a log (not while airborne).
export default function useLogTransport(
    logRef: React.RefObject<THREE.Group | null>,
    rowIndex: number,
    direction: boolean,
    speed: number
) {
    useFrame((_, delta) => {
        if (!logRef.current) return;
        if (!playerState.ref) return;
        // don't transport if game over
        if (useGameStore.getState().status === "over") return;

        // Only consider transport when player is on the same row
        if (rowIndex !== playerState.currentRow) return;

        // If the player is mid-jump (visual child above base), do not transport
        try {
            const visualZ = playerState.ref.children[0]?.position.z ?? 0;
            const baseZ = (playerState.ref as any).userData.baseChildZ ?? 0;
            const EPS = 0.1;
            if (visualZ > baseZ + EPS) return;
        } catch (e) {
            // ignore and continue
        }

        const logBox = new THREE.Box3().setFromObject(logRef.current);
        const playerBox = new THREE.Box3().setFromObject(playerState.ref);

        if (playerBox.intersectsBox(logBox)) {
            // Move the player along X according to log movement
            const move = (direction ? 1 : -1) * speed * delta;
            playerState.ref.position.x += move;
            // Keep logical tile roughly in sync
            const approxTile = Math.round(playerState.ref.position.x / tileSize);
            playerState.currentTile = approxTile;
        }
    });
}
