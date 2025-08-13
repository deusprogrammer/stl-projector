#!/bin/bash
# Install stl-projector scripts with hardcoded project directory and dependencies

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Check for node
if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js is not installed. Please install Node.js first."
  exit 1
fi

# Check for npm
if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm is not installed. Please install npm first."
  exit 1
fi

# Install dependencies
echo "Installing npm dependencies in $SCRIPT_DIR..."
cd "$SCRIPT_DIR"
npm i

# Create bash wrapper with hardcoded project path
cat > /usr/local/bin/stl-projector <<EOF
#!/bin/bash
# Usage: stl-projector input.stl [xy|xz|yz]
node "$SCRIPT_DIR/index.js" "\$@"
EOF
chmod +x /usr/local/bin/stl-projector

echo "Installed stl-projector to /usr/local/bin."
echo "You can now run 'stl-projector input.stl [xy|xz|yz]' from anywhere."