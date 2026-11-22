import * as THREE from 'three';
import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const THIN_STROKE = 0.095;

interface LetterDef {
  build: () => THREE.Shape;
}

function makeA(
  w: number,
  apexHalf: number,
  foot: number,
  yBarBottom: number,
  barHeight: number
): THREE.Shape {
  const cx = w / 2;
  const slopeRun = cx - apexHalf;
  const xL = (y: number) => foot + slopeRun * y;
  const xR = (y: number) => w - foot - slopeRun * y;
  const yBarTop = yBarBottom + barHeight;
  const yInnerApex = (w - 2 * foot) / (2 * slopeRun);

  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(foot, 0);
  shape.lineTo(xL(yBarBottom), yBarBottom);
  shape.lineTo(xR(yBarBottom), yBarBottom);
  shape.lineTo(w - foot, 0);
  shape.lineTo(w, 0);
  shape.lineTo(cx + apexHalf, 1);
  shape.lineTo(cx - apexHalf, 1);
  shape.closePath();

  const hole = new THREE.Path();
  hole.moveTo(xL(yBarTop), yBarTop);
  hole.lineTo(cx, yInnerApex);
  hole.lineTo(xR(yBarTop), yBarTop);
  hole.closePath();
  shape.holes.push(hole);

  return shape;
}

function makeR(
  w: number,
  stem: number,
  rOuter: number,
  rInner: number,
  legHorizontal: number
): THREE.Shape {
  const bowlBottom = 1 - rOuter * 2;
  const yc = 1 - rOuter;
  const xc = w - rOuter;

  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(stem, 0);
  shape.lineTo(stem, bowlBottom);
  if (xc - legHorizontal > stem + 1e-4) {
    shape.lineTo(xc - legHorizontal, bowlBottom);
  }
  shape.lineTo(w - legHorizontal, 0);
  shape.lineTo(w, 0);
  shape.lineTo(xc, bowlBottom);
  shape.absarc(xc, yc, rOuter, -Math.PI / 2, Math.PI / 2, false);
  shape.lineTo(0, 1);
  shape.closePath();

  const hole = new THREE.Path();
  hole.moveTo(stem, yc - rInner);
  hole.lineTo(stem, yc + rInner);
  hole.lineTo(xc, yc + rInner);
  hole.absarc(xc, yc, rInner, Math.PI / 2, -Math.PI / 2, true);
  hole.closePath();
  shape.holes.push(hole);

  return shape;
}

function makeN(w: number, stem: number, diagStroke: number): THREE.Shape {
  const dx = w - 2 * stem;
  let dy = diagStroke * 1.9;
  for (let i = 0; i < 6; i++) {
    dy = (diagStroke * Math.hypot(dx, 1 - dy)) / dx;
  }

  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(stem, 0);
  shape.lineTo(stem, 1 - dy);
  shape.lineTo(w - stem, 0);
  shape.lineTo(w, 0);
  shape.lineTo(w, 1);
  shape.lineTo(w - stem, 1);
  shape.lineTo(w - stem, dy);
  shape.lineTo(stem, 1);
  shape.lineTo(0, 1);
  shape.closePath();

  return shape;
}

function makeU(w: number, stroke: number): THREE.Shape {
  const rOuter = w / 2;
  const rInner = rOuter - stroke;

  const shape = new THREE.Shape();
  shape.moveTo(0, 1);
  shape.lineTo(0, rOuter);
  shape.absarc(rOuter, rOuter, rOuter, Math.PI, Math.PI * 2, false);
  shape.lineTo(w, 1);
  shape.lineTo(w - stroke, 1);
  shape.lineTo(w - stroke, rOuter);
  shape.absarc(rOuter, rOuter, rInner, 0, Math.PI, true);
  shape.lineTo(stroke, 1);
  shape.closePath();

  return shape;
}

function buildP(): THREE.Shape {
  const w = 0.58;
  const rOuter = 0.28;
  const bowlBottom = 1 - rOuter * 2;
  const yc = 1 - rOuter;
  const xc = w - rOuter;

  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(THIN_STROKE, 0);
  shape.lineTo(THIN_STROKE, bowlBottom);
  shape.lineTo(xc, bowlBottom);
  shape.absarc(xc, yc, rOuter, -Math.PI / 2, Math.PI / 2, false);
  shape.lineTo(0, 1);
  shape.closePath();

  const rInner = rOuter - THIN_STROKE;
  const hole = new THREE.Path();
  hole.moveTo(THIN_STROKE, yc - rInner);
  hole.lineTo(THIN_STROKE, yc + rInner);
  hole.lineTo(xc, yc + rInner);
  hole.absarc(xc, yc, rInner, Math.PI / 2, -Math.PI / 2, true);
  hole.closePath();
  shape.holes.push(hole);

  return shape;
}

function buildO(): THREE.Shape {
  const w = 0.7;
  const rOuter = w / 2;
  const rInner = rOuter - THIN_STROKE;

  const shape = new THREE.Shape();
  shape.moveTo(0, rOuter);
  shape.absarc(rOuter, rOuter, rOuter, Math.PI, Math.PI * 2, false);
  shape.lineTo(w, 1 - rOuter);
  shape.absarc(rOuter, 1 - rOuter, rOuter, 0, Math.PI, false);
  shape.closePath();

  const hole = new THREE.Path();
  hole.moveTo(THIN_STROKE, 1 - rOuter);
  hole.absarc(rOuter, 1 - rOuter, rInner, Math.PI, 0, true);
  hole.lineTo(w - THIN_STROKE, rOuter);
  hole.absarc(rOuter, rOuter, rInner, 0, Math.PI, true);
  hole.closePath();
  shape.holes.push(hole);

  return shape;
}

function buildT(): THREE.Shape {
  const w = 0.64;
  const cx = w / 2;
  const x0 = cx - THIN_STROKE / 2;
  const x1 = cx + THIN_STROKE / 2;

  const shape = new THREE.Shape();
  shape.moveTo(x0, 0);
  shape.lineTo(x1, 0);
  shape.lineTo(x1, 1 - THIN_STROKE);
  shape.lineTo(w, 1 - THIN_STROKE);
  shape.lineTo(w, 1);
  shape.lineTo(0, 1);
  shape.lineTo(0, 1 - THIN_STROKE);
  shape.lineTo(x0, 1 - THIN_STROKE);
  shape.closePath();

  return shape;
}

function buildF(): THREE.Shape {
  const w = 0.54;
  const midW = 0.42;
  const midY = 0.5;

  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(THIN_STROKE, 0);
  shape.lineTo(THIN_STROKE, midY - THIN_STROKE / 2);
  shape.lineTo(midW, midY - THIN_STROKE / 2);
  shape.lineTo(midW, midY + THIN_STROKE / 2);
  shape.lineTo(THIN_STROKE, midY + THIN_STROKE / 2);
  shape.lineTo(THIN_STROKE, 1 - THIN_STROKE);
  shape.lineTo(w, 1 - THIN_STROKE);
  shape.lineTo(w, 1);
  shape.lineTo(0, 1);
  shape.closePath();

  return shape;
}

function buildL(): THREE.Shape {
  const w = 0.54;

  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(w, 0);
  shape.lineTo(w, THIN_STROKE);
  shape.lineTo(THIN_STROKE, THIN_STROKE);
  shape.lineTo(THIN_STROKE, 1);
  shape.lineTo(0, 1);
  shape.closePath();

  return shape;
}

function buildI(): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(THIN_STROKE, 0);
  shape.lineTo(THIN_STROKE, 1);
  shape.lineTo(0, 1);
  shape.closePath();

  return shape;
}

const THIN_LETTERS: Record<string, LetterDef> = {
  A: { build: () => makeA(0.72, 0.032, 0.066, 0.3, THIN_STROKE) },
  R: { build: () => makeR(0.6, THIN_STROKE, 0.27, 0.27 - THIN_STROKE, 0.11) },
  N: { build: () => makeN(0.66, THIN_STROKE, THIN_STROKE) },
  U: { build: () => makeU(0.66, THIN_STROKE) },
  P: { build: buildP },
  O: { build: buildO },
  T: { build: buildT },
  F: { build: buildF },
  L: { build: buildL },
  I: { build: buildI },
};

// Heavy geometric Outfit-ExtraBold proportions with clean single-contour shapes
const BOLD_LETTERS: Record<string, LetterDef> = {
  A: { build: () => makeA(0.84, 0.11, 0.225, 0.2, 0.18) },
  R: { build: () => makeR(0.74, 0.195, 0.3, 0.11, 0.235) },
  N: { build: () => makeN(0.8, 0.2, 0.195) },
  U: { build: () => makeU(0.78, 0.21) },
};

export interface CarvedSlabOptions {
  mainWord: string;
  mainScale: number;
  mainLetterSpacing: number;
  mainZ: number;
  subWord: string;
  subScale: number;
  subLetterSpacing: number;
  subZ: number;
  depth?: number;
  slabSize?: number;
}

export interface CarvedSlabResult {
  topCapGeometry: THREE.ShapeGeometry;
  slabGeometry: THREE.ExtrudeGeometry;
  islandGeometries: THREE.ExtrudeGeometry[];
}

function dedupeClosingPoint(pts: THREE.Vector2[]): THREE.Vector2[] {
  if (pts.length > 2 && pts[0].distanceToSquared(pts[pts.length - 1]) < 1e-10) {
    return pts.slice(0, -1);
  }
  return pts;
}

function orientPoints(pts: THREE.Vector2[], clockwise: boolean): THREE.Vector2[] {
  const copy = pts.map((p) => p.clone());
  if (THREE.ShapeUtils.isClockWise(copy) !== clockwise) {
    copy.reverse();
  }
  return copy;
}

interface PlacedContours {
  outers: THREE.Vector2[][];
  inners: THREE.Vector2[][];
}

function buildWordShapes(word: string, dict: Record<string, LetterDef>): THREE.Shape[] {
  return word
    .toUpperCase()
    .split('')
    .map((ch) => {
      const def = dict[ch];
      if (!def) {
        throw new Error(`Unsupported character "${ch}" in hero word "${word}"`);
      }
      return def.build();
    });
}

function layoutWordContours(
  glyphShapes: THREE.Shape[],
  letterSpacing: number,
  targetZ: number,
  scaleFactor: number
): PlacedContours {
  const placedGlyphs: Array<{
    dx: number;
    outer: THREE.Vector2[];
    inners: THREE.Vector2[][];
  }> = [];

  let cursorX = 0;
  let globalMinY = Infinity;
  let globalMaxY = -Infinity;

  for (const shape of glyphShapes) {
    const extracted = shape.extractPoints(16);
    const outer = dedupeClosingPoint(extracted.shape).map(
      (p) => new THREE.Vector2(p.x * scaleFactor, p.y * scaleFactor)
    );

    let minX = Infinity;
    let maxX = -Infinity;
    for (const p of outer) {
      minX = Math.min(minX, p.x);
      maxX = Math.max(maxX, p.x);
      globalMinY = Math.min(globalMinY, p.y);
      globalMaxY = Math.max(globalMaxY, p.y);
    }

    const inners = extracted.holes
      .map((hole) =>
        dedupeClosingPoint(hole).map(
          (p) => new THREE.Vector2(p.x * scaleFactor, p.y * scaleFactor)
        )
      )
      .filter((pts) => pts.length >= 3);

    placedGlyphs.push({
      dx: cursorX - minX,
      outer,
      inners,
    });
    cursorX += maxX - minX + letterSpacing;
  }

  const totalWidth = placedGlyphs.length > 0 ? Math.max(0, cursorX - letterSpacing) : 0;
  const wordOffsetX = -totalWidth / 2;
  const wordCenterY = Number.isFinite(globalMinY) ? (globalMinY + globalMaxY) / 2 : 0;
  // After rotateX(-PI/2), 2D y maps to -z, so offsetting by -targetZ centers the word at z = targetZ.
  const wordOffsetY = -wordCenterY - targetZ;

  const outers: THREE.Vector2[][] = [];
  const inners: THREE.Vector2[][] = [];

  for (const glyph of placedGlyphs) {
    const shiftX = glyph.dx + wordOffsetX;
    outers.push(glyph.outer.map((p) => new THREE.Vector2(p.x + shiftX, p.y + wordOffsetY)));
    for (const inner of glyph.inners) {
      inners.push(inner.map((p) => new THREE.Vector2(p.x + shiftX, p.y + wordOffsetY)));
    }
  }

  return { outers, inners };
}

/**
 * Applies smooth creased normals across bevels and curved walls while clamping the flat
 * top and bottom extrusion caps strictly to +/-Y so large flat surfaces show zero streaks.
 */
function applySmoothNormalsKeepFlatCaps(
  geometry: THREE.ExtrudeGeometry,
  creaseAngle = Math.PI / 2.5
): void {
  toCreasedNormals(geometry, creaseAngle);

  const capGroup = geometry.groups[0];
  const posAttr = geometry.getAttribute('position');
  const normAttr = geometry.getAttribute('normal');
  if (!capGroup || !posAttr || !normAttr) return;

  const end = capGroup.start + capGroup.count;
  for (let i = capGroup.start; i < end; i++) {
    const ny = posAttr.getY(i) > -0.1 ? 1 : -1;
    normAttr.setXYZ(i, 0, ny, 0);
  }
  normAttr.needsUpdate = true;
}

/**
 * Builds a solid slab with beveled, smooth-shaded carved letter cavities and matching
 * counter-island geometries, plus an invisible shadow-casting roof tucked just under y = 0.
 */
export function createCarvedSlabGeometries(options: CarvedSlabOptions): CarvedSlabResult {
  const {
    mainWord,
    mainScale,
    mainLetterSpacing,
    mainZ,
    subWord,
    subScale,
    subLetterSpacing,
    subZ,
    depth = 0.62,
    slabSize = 80,
  } = options;

  const half = slabSize / 2;
  const slabShape = new THREE.Shape();
  slabShape.moveTo(-half, -half);
  slabShape.lineTo(half, -half);
  slabShape.lineTo(half, half);
  slabShape.lineTo(-half, half);
  slabShape.closePath();

  const mainPlaced = layoutWordContours(
    buildWordShapes(mainWord, BOLD_LETTERS),
    mainLetterSpacing,
    mainZ,
    mainScale
  );
  const subPlaced = layoutWordContours(
    buildWordShapes(subWord, THIN_LETTERS),
    subLetterSpacing,
    subZ,
    subScale
  );

  for (const contour of [...mainPlaced.outers, ...subPlaced.outers]) {
    slabShape.holes.push(new THREE.Path(orientPoints(contour, true)));
  }

  const islandShapes = [...mainPlaced.inners, ...subPlaced.inners].map(
    (contour) => new THREE.Shape(orientPoints(contour, false))
  );

  const topCapGeometry = new THREE.ShapeGeometry([slabShape, ...islandShapes], 16);
  topCapGeometry.rotateX(-Math.PI / 2);
  topCapGeometry.translate(0, -0.008, 0);
  topCapGeometry.computeVertexNormals();

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.014,
    bevelSegments: 4,
    curveSegments: 16,
  };

  const alignTopFlushAndSmooth = (geom: THREE.ExtrudeGeometry) => {
    geom.rotateX(-Math.PI / 2);
    geom.computeBoundingBox();
    const maxY = geom.boundingBox ? geom.boundingBox.max.y : 0;
    geom.translate(0, -maxY, 0);
    applySmoothNormalsKeepFlatCaps(geom);
    return geom;
  };

  const slabGeometry = alignTopFlushAndSmooth(
    new THREE.ExtrudeGeometry(slabShape, extrudeSettings)
  );

  const islandGeometries = islandShapes.map((islandShape) =>
    alignTopFlushAndSmooth(new THREE.ExtrudeGeometry(islandShape, extrudeSettings))
  );

  return { topCapGeometry, slabGeometry, islandGeometries };
}
