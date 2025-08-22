#!/bin/bash
set -e
set -x

# Update packages
sudo apt update
sudo apt install -y curl build-essential

# Install Node.js LTS properly (recommended over apt default)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install global npm packages
sudo npm install -g typescript ts-node pm2

# Install app dependencies
cd /var/www/html
if [ -f package.json ]; then
    npm install
fi

echo "Dependencies installed successfully."
exit 0
