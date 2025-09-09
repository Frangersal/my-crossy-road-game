import useStore from "../stores/game";
import "./Result.css"

import { useEffect } from "react";

export function Result() {
    const status = useStore((state) => state.status);
    const score = useStore((state) => state.score);
    const reset = useStore((state) => state.reset);

    useEffect(() => {
        if (status !== "over") return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                reset();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [status, reset]);

    if (status === "running") return null;

    return (
        <div id="result-container">
            <div id="result">
                <h1>Game Over</h1>
                <p>Your Score: {score}</p>
                <button onClick={reset}>Retry</button>
            </div>
        </div>
    );
}