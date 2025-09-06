import * as THREE from "three";
export type RowType = "forest" | "car" | "truck";

export type Row =
| {
    type: "forest";
    trees: {tileIndex: number; height: number}[];
}
| {
    type: "car";
    rirection: boolean;
    speed: number;
    vehicles: {
        initialTileIndex: number;
        color: THREE.ColorRepresentation;
    }[];
}
| {
    type: "truck";
    rirection: boolean;
    speed: number;
    vehicles: {
        initialTileIndex: number;
        color: THREE.ColorRepresentation;
    }[];
}