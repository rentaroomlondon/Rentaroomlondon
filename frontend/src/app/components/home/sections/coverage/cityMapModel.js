// Geometry for the illustrated 3D city map (static — computed once).
// The plane is 1100×880px: a 6×5 grid of 150×140 blocks with 28px streets.

const BLOCK_X = (col) => 28 + 178 * col;
const BLOCK_Y = (row) => 28 + 168 * row;
const PARKS = { "2,0": true, "1,2": true, "5,1": true };

export const BLOCKS = [];
for (let col = 0; col < 6; col++) {
  for (let row = 0; row < 5; row++) {
    BLOCKS.push({ x: BLOCK_X(col), y: BLOCK_Y(row), park: Boolean(PARKS[`${col},${row}`]) });
  }
}

// [col, row, offsetX, offsetY, width, depth, height] — the last one is the orange landmark.
const BUILDING_DEFS = [
  [0, 0, 20, 20, 60, 50, 70], [0, 0, 92, 72, 40, 44, 40], [1, 1, 20, 16, 110, 40, 30], [1, 1, 30, 76, 40, 44, 90],
  [3, 1, 24, 28, 50, 84, 55], [3, 1, 92, 28, 36, 36, 120], [4, 0, 20, 30, 110, 76, 35], [4, 1, 56, 40, 52, 52, 80],
  [2, 2, 20, 20, 52, 52, 60], [3, 2, 40, 30, 70, 70, 45], [5, 2, 30, 30, 90, 44, 50], [0, 4, 30, 44, 60, 56, 50],
  [5, 4, 40, 40, 60, 60, 70], [4, 4, 26, 64, 50, 40, 40], [5, 3, 60, 40, 30, 30, 150],
];

export const BUILDINGS = BUILDING_DEFS.map(([col, row, ox, oy, w, d, h], n) => {
  const landmark = n === BUILDING_DEFS.length - 1;
  return {
    x: BLOCK_X(col) + ox,
    y: BLOCK_Y(row) + oy,
    w,
    d,
    h,
    top: landmark ? "#F26A36" : "#FFFFFF",
    side: landmark ? "#C4501F" : "#D3D9E1",
    side2: landmark ? "#E05E2A" : "#E7EAEF",
  };
});

const TREE_SPOTS = [[40, 60, 1], [92, 100, 0.8], [118, 46, 0.9], [60, 118, 0.7]];
export const TREES = Object.keys(PARKS).flatMap((key) => {
  const [col, row] = key.split(",").map(Number);
  return TREE_SPOTS.map(([ox, oy, scale]) => ({
    x: BLOCK_X(col) + ox,
    y: BLOCK_Y(row) + oy,
    w: Math.round(30 * scale * 1.3),
    h: Math.round(46 * scale * 1.3),
  }));
});

/** L-shaped route from the Central London marker to a pin. */
export function routePath([fromX, fromY], [toX, toY]) {
  return `M ${fromX} ${fromY} L ${fromX} ${toY} L ${toX} ${toY}`;
}
