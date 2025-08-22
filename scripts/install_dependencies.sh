#!/bin/bash
set -e
set -x

# Update packages
sudo apt update

# Install Node.js, npm, ts-node, PM2
sudo apt install -y nodejs npm
sudo npm install -g typescript ts-node pm2

# Optional: install dependencies from package.json
cd /var/www/html
if [ -f package.json ]; then
    npm install
fi

echo "Dependencies installed successfully."
exit 0
