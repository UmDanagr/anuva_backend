#!/bin/bash
set -e
set -x

# Update packages
sudo apt update

# Install Node.js (example)
sudo apt install -y nodejs npm

# Optional: install app dependencies if you have package.json
cd /var/www/html
if [ -f package.json ]; then
    npm install
fi

echo "Dependencies installed successfully."
exit 0
