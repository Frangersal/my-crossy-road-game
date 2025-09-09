import { create } from "zustand";
import { generateRows } from "../utilities/generateRows";
import type { Row } from "../types";

interface StoreState {
    rows: Row[];
    score: number;  // lo pongo porque es que si no me marca error en Score.tsx
    addRows: () => void;
    reset: () => void; 
}

const useStore = create<StoreState>((set) => ({
    rows: generateRows(20),
    score:0,  // lo pongo porque es que si no me marca error en Score.tsx
    addRows: () => {
        const newRows = generateRows(20);
        set((state)=> ({rows: [...state.rows, ...newRows] }));
    },
        reset: () => { set({ rows: generateRows(20) }); },
}));

export default useStore;