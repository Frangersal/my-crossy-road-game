import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { state as playerState } from "../stores/player";
import { tileSize } from "../constants";
import useGameStore from "../stores/game";

// Transport player when standing on a log: if player intersects log bounding box,
// move player's ref by the log's delta movement each frame.
export default function useLogTransport(
    logRef: React.RefObject<THREE.Group | null>,
    rowIndex: number,
    direction: boolean,
    speed: number
) {
    useFrame((state, delta) => {
        if (!logRef.current) return;
        if (!playerState.ref) return;
        // don't transport if game over
        if (useGameStore.getState().status === "over") return;

        const logBox = new THREE.Box3().setFromObject(logRef.current);
        const playerBox = new THREE.Box3().setFromObject(playerState.ref);

        // Only consider transport when player is on the same row
        if (rowIndex !== playerState.currentRow) return;

    // If player's bounding box intersects the log, transport them along X.
    // NOTE: we intentionally transport even if the visual child is mid-jump so the
    // player can walk along moving logs without slipping off during the hop.
        if (playerBox.intersectsBox(logBox)) {
            // Move the player along X according to log movement
            const move = (direction ? 1 : -1) * speed * delta;
            playerState.ref.position.x += move;
            // Also update logical tile position approximately (only when center crosses tile boundaries)
            // This keeps currentTile consistent enough for collision checks
            const approxTile = Math.round(playerState.ref.position.x / tileSize);
            playerState.currentTile = approxTile;
            // mark that the player is standing on a log
            playerState.onLog = true;
        }
    });
}
