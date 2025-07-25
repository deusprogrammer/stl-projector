import fs from 'fs';
import stl from 'stl-parser';
import polygonClipping from 'polygon-clipping';
import path from 'path';

// Usage: node index.js input.stl [xy|xz|yz]
const inputFile = process.argv[2];
const PLANE = process.argv[3] || 'xy';

if (!inputFile) {
  console.error('Usage: node index.js input.stl [xy|xz|yz]');
  process.exit(1);
}

const triangles = [];

const stream = fs.createReadStream(inputFile).pipe(stl());

stream.on('data', (facet) => {
  if (facet.vertices && facet.vertices.length === 3 &&
      facet.vertices.every(v => v && typeof v.x === 'number' && typeof v.y === 'number' && typeof v.z === 'number')) {
    triangles.push(facet.vertices);
  }
});

stream.on('end', () => {
  function project({ x, y, z }) {
    if (PLANE === 'xy') return [x, y];
    if (PLANE === 'xz') return [x, z];
    if (PLANE === 'yz') return [y, z];
    throw new Error('Invalid plane');
  }

  const polygons = triangles.map(tri =>
    [[project(tri[0]), project(tri[1]), project(tri[2]), project(tri[0])]]
  );

  const unioned = polygonClipping.union(...polygons);

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  unioned.forEach(multiPoly => {
    multiPoly.forEach(ring => {
      ring.forEach(([x, y]) => {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      });
    });
  });

  const shiftX = minX;
  const shiftY = minY;
  const width = maxX - minX;
  const height = maxY - minY;

  let groupContent = '';
  unioned.forEach(multiPoly => {
    multiPoly.forEach(ring => {
      const path = ring.map(([x, y], i) =>
        (i === 0 ? 'M' : 'L') + (x - shiftX) + ',' + (y - shiftY)
      ).join(' ') + ' Z';
      groupContent += `<path d="${path}" stroke="black" fill="none"/>`;
    });
  });

  const outputFile = path.basename(inputFile, path.extname(inputFile)) + '.svg';
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">` +
    `<g>${groupContent}</g></svg>`;

  fs.writeFileSync(outputFile, svg);
  console.log(`SVG outline (with holes) created as ${outputFile} on the ${PLANE} plane.`);
});