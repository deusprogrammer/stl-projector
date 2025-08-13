# STL Projector

This tool converts an STL file into an SVG outline by projecting the mesh onto a chosen Cartesian plane (`xy`, `xz`, or `yz`). It uses [polygon-clipping](https://www.npmjs.com/package/polygon-clipping) to union all projected triangles, capturing the true 2D outline (including holes).

## Installation

**Mac/Linux:**

```sh
sudo ./install-projector.sh
```

**Windows:**
Run `install-projector.bat` as Administrator.

## Usage

After installation, you can run the projector from anywhere:

```
stl-projector input.stl [xy|xz|yz]
```

- `input.stl`: Path to your STL file.
- `[xy|xz|yz]`: (Optional) Projection plane. Defaults to `xy`.

This will create an SVG file with the same name as your STL file in the same directory.

## Requirements

- Node.js
- npm

## Output

- The SVG file will have the same name as your STL file, but with a `.svg` extension.
- The outline will be projected onto the specified plane.

## Disclaimer

The install scripts will place a wrapper script in `/usr/local/bin` (Mac/Linux) or `C:\Windows\System32` (Windows) so you can run `stl-projector` from any directory.  
**This requires administrator privileges.**  
If you prefer not to modify your system path, you can run the tool directly from the project
