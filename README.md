# STL Projector

This tool converts an STL file into an SVG outline by projecting the mesh onto a chosen Cartesian plane (`xy`, `xz`, or `yz`). It uses [polygon-clipping](https://www.npmjs.com/package/polygon-clipping) to union all projected triangles, capturing the true 2D outline (including holes).

## Usage

```
node index.js input.stl [xy|xz|yz]
```

- `input.stl`: Path to your STL file.
- `[xy|xz|yz]`: (Optional) Projection plane. Defaults to `xy`.

**Example:**

```
node index.js guitar_body.stl xy
```

This will create `guitar_body.svg` in the same directory.

## Requirements

- Node.js
- Install dependencies:
  ```
  npm i
  ```

## Output

- The SVG file will have the same name as your STL file, but with a `.svg` extension.
- The outline will be projected onto the specified plane.

## License

MIT
