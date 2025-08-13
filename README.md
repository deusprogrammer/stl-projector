# STL Projector

This tool converts an STL file into SVG outlines by projecting the mesh onto one or more Cartesian planes (`xy`, `xz`, or `yz`). It uses [polygon-clipping](https://www.npmjs.com/package/polygon-clipping) to union all projected triangles, capturing the true 2D outline (including holes).

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
- `[xy|xz|yz]`: (Optional) Projection plane. If omitted, SVGs for all three planes will be generated.

This will create SVG files with the same name as your STL file (e.g. `model.xy.svg`, `model.xz.svg`, `model.yz.svg`) in the same directory as your STL file.

## Requirements

- Node.js and npm must be installed.  
  Download and install from: [https://nodejs.org/](https://nodejs.org/)

## Output

- The SVG files will have the same name as your STL file, but with a `.xy.svg`, `.xz.svg`, or `.yz.svg` extension.
- The outline will be projected onto the specified plane(s) and sized in millimeters.

## Disclaimer

The install scripts will place a wrapper script in `/usr/local/bin` (Mac/Linux) or `C:\Windows\System32` (Windows) so you can run `stl-projector` from any directory.  
**This requires administrator privileges.**  
If you prefer not to modify your system path, you can run the tool directly from the project folder.

## License
