#!/bin/bash
echo "Installing dependencies..."

cd /var/www/html

# Ensure Node.js 18 is installed
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install npm packages (production only for server)
if [ -f "package.json" ]; then
    npm install --production --legacy-peer-deps
fi

echo "Dependencies installed."
