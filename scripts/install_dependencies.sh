#!/bin/bash
set -e
set -x

# Update packages
sudo apt update
sudo apt install -y curl build-essential

# Install Node.js LTS (latest stable)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install global npm packages
sudo npm install -g typescript ts-node pm2

# Ensure proper permissions for deployment directory
sudo chown -R ubuntu:ubuntu /var/www/html

# Install app dependencies
cd /var/www/html
if [ -f package.json ]; then
    npm install
fi

echo "Dependencies installed successfully."
exit 0
