import * as THREE from "three";
import { maxTileIndex, minTileIndex } from "../constants";
import { type Row, type RowType } from "../types"

export function generateRows(amount:number): Row[] {
    const rows: Row[] = [];
    for (let i = 0; i < amount; i++) {
        let type: RowType;
        // Probabilidad: bosque-carretera más común que bosque-río
        if (i === 0) {
            type = randomElement(["forest", "car", "truck"]);
        } else {
            const prev = rows[i-1]?.type;
            // Si la anterior es bosque, puede ser río o carretera, pero carretera es más probable
            if (prev === "forest") {
                type = Math.random() < 0.7 ? randomElement(["car", "truck"]) : "river";
            } else if (prev === "river") {
                // Ahora es más probable que venga otro río (rio-rio), pero nunca río-carretera
                type = Math.random() < 0.6 ? "river" : randomElement(["forest", "truck"]);
            } else {
                // Si la anterior es carretera o camión, solo bosque o carretera
                type = randomElement(["forest", "car", "truck"]);
            }
        }

        // Si el tipo es río, fuerza que la anterior y la siguiente sean bosque
        if (type === "river") {
            // Si la anterior no es bosque, cambia a bosque
            if (rows[i-1]?.type !== "forest") {
                rows[i-1] = generateForesMetadata();
            }
            // Generar mínimo dos ríos seguidos
            let riverCount = 2;
            while (riverCount > 0 && i < amount) {
                rows.push(generateLogLaneMetadata());
                riverCount--;
                i++;
            }
            // Después de los ríos, fuerza bosque si no es la última fila
            if (i < amount) {
                rows.push(generateForesMetadata());
                i++;
            }
            continue;
        }

        let rowData: Row;
        if (type === "car") rowData = generateCarLaneMetadata();
        else if (type === "truck") rowData = generateTruckLaneMetadata();
        else rowData = generateForesMetadata();

        rows.push(rowData);
    }
    return rows;
}

function generateRow(): Row {
    const type: RowType = randomElement(["car","truck","forest","river"]);
    if (type === "car") return generateCarLaneMetadata();
    if (type === "truck") return generateTruckLaneMetadata();
    if (type === "river") return generateLogLaneMetadata();
    return generateForesMetadata();
}

function randomElement<T>(array:T[]):T {
    return array[Math.floor(Math.random() * array.length)];
}

function generateForesMetadata(): Row {
    const occupiedTiles = new Set<number>();
    const trees = Array.from({ length: 4 }, () => {
        let tileIndex;
        do{
            tileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex);
        } while (occupiedTiles.has(tileIndex));           
        occupiedTiles.add(tileIndex);

        const height = randomElement([20, 45, 60]);

        return {tileIndex, height};
    });

    return { type: "forest", trees };
    
}

function generateCarLaneMetadata(): Row {
    const direction = randomElement([true, false]);
    const speed =     randomElement([125, 156, 188]);
    
    const occupiedTiles = new Set<number>();
    const vehicles = Array.from({length: 3}, () => {
        let initialTileIndex;
        do {
            initialTileIndex = THREE.MathUtils.randInt(
                minTileIndex,
                maxTileIndex
            );
        } while (occupiedTiles.has(initialTileIndex));
        occupiedTiles.add(initialTileIndex - 1);
        occupiedTiles.add(initialTileIndex );
        occupiedTiles.add(initialTileIndex + 1);

        const color: THREE.ColorRepresentation = randomElement([
            0xF83800, 0xbdb638, 0x00CC00,
        ]);
        return { initialTileIndex, color };
    });
    return { type: "car" , direction, speed, vehicles };
}

function generateTruckLaneMetadata(): Row {
    const direction = randomElement([true, false]);
    const speed = randomElement([125, 156, 188]);

    const occupiedTiles = new Set<number>();

    const vehicles = Array.from({length: 2}, () => {
        let initialTileIndex;
        do {
            initialTileIndex = THREE.MathUtils.randInt(
                minTileIndex,
                maxTileIndex
            );
        } while (occupiedTiles.has(initialTileIndex));
        occupiedTiles.add(initialTileIndex - 2);
        occupiedTiles.add(initialTileIndex - 1);
        occupiedTiles.add(initialTileIndex );
        occupiedTiles.add(initialTileIndex + 1);
        occupiedTiles.add(initialTileIndex + 2);

        const color: THREE.ColorRepresentation = randomElement([
            0xF83800, 0xbdb638, 0x00CC00, 
        ]);
        return { initialTileIndex, color };
    });
    return { type: "truck" , direction, speed, vehicles };

}

function generateLogLaneMetadata(): Row {
    const direction = randomElement([true, false]);
    const speed = randomElement([60, 90, 120]);

    const occupiedTiles = new Set<number>();

    const logs = Array.from({length: 3}, () => {
        let initialTileIndex;
        do {
            initialTileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex);
        } while (occupiedTiles.has(initialTileIndex));
        occupiedTiles.add(initialTileIndex - 1);
        occupiedTiles.add(initialTileIndex);
        occupiedTiles.add(initialTileIndex + 1);

        const color: THREE.ColorRepresentation = 0x8B5A2B;
        return { initialTileIndex, color };
    });

    return { type: "river", direction, speed, logs };
}