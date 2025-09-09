import * as THREE from "three"
import { Bounds } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import usePlayerAnimation from "../hook/usePlayerAnimation";
import { DirectionalLight } from "./DirectionalLight";
import { setRef } from "../stores/player";

export function Player () {
    const player = useRef<THREE.Group>(null);
    const lightRef = useRef<THREE.DirectionalLight>(null)
    const camera =useThree((state)=>state.camera);

    usePlayerAnimation(player);

    useEffect(()=>{
        if (!player.current) return;
        if (!lightRef.current) return;

        //Attach the camera to the player
        player.current.add(camera);
        lightRef.current.target = player.current;

        //Set the player reference in the store
        setRef(player.current)
    }, [camera]); // run once when camera is available

    return(
        <Bounds fit clip observe margin={10}>
            <group ref={player}>
                {/* Square frog model: body, head, eyes and legs built from boxes */}
                <group position={[0, 0, 3]}>
                    {/* Body */}
                    <mesh castShadow receiveShadow>
                        <boxGeometry args={[12, 14, 6]} />
                        <meshLambertMaterial color={0x00CC00} flatShading />
                    </mesh>

                    {/* Head */}
                    <mesh position={[0, 6, 4]} castShadow receiveShadow>
                        <boxGeometry args={[8, 6, 4]} />
                        <meshLambertMaterial color={0x00b84d} flatShading />
                    </mesh>

                    {/* Eyes */}
                    <mesh position={[2.5, 9, 6]}>
                        <boxGeometry args={[1.6, 1.6, 1.6]} />
                        <meshLambertMaterial color={0xffffff} />
                    </mesh>
                    <mesh position={[-2.5, 9, 6]}>
                        <boxGeometry args={[1.6, 1.6, 1.6]} />
                        <meshLambertMaterial color={0xffffff} />
                    </mesh>

                    {/* Pupils */}
                    <mesh position={[2.5, 9.6, 6]}>
                        <boxGeometry args={[0.6, 0.6, 0.6]} />
                        <meshLambertMaterial color={0x000000} />
                    </mesh>
                    <mesh position={[-2.5, 9.6, 6]}>
                        <boxGeometry args={[0.6, 0.6, 0.6]} />
                        <meshLambertMaterial color={0x000000} />
                    </mesh>

                    {/* Front legs */}
                    <mesh position={[5.5, 6, -2]} castShadow receiveShadow>
                        <boxGeometry args={[6, 6, 2]} />
                        <meshLambertMaterial color={0x008833} />
                    </mesh>
                    <mesh position={[-5.5, 6, -2]} castShadow receiveShadow>
                        <boxGeometry args={[6, 6, 2]} />
                        <meshLambertMaterial color={0x008833} />
                    </mesh>

                    {/* Back legs */}
                    <mesh position={[6, -6, -1]} castShadow receiveShadow>
                        <boxGeometry args={[2.8, 6.5, 1.8]} />
                        <meshLambertMaterial color={0x008833} />
                    </mesh>
                    <mesh position={[-6, -6, -1]} castShadow receiveShadow>
                        <boxGeometry args={[2.8, 6.5, 1.8]} />
                        <meshLambertMaterial color={0x008833} />
                    </mesh>
                </group>
                <DirectionalLight ref={lightRef} />
            </group>
        </Bounds>
    );
}