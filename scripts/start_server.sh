#!/bin/bash
set -e
set -x

# Go to app directory
cd /var/www/html

# Ensure PATH includes npm binaries
export PATH=$PATH:/usr/local/bin

# Set HOME for PM2 (SSM often runs without HOME)
export HOME=/home/ubuntu

# Ensure PM2 has a directory it can write
mkdir -p $HOME/.pm2
chown -R ubuntu:ubuntu $HOME/.pm2

# Stop previous PM2 process if exists
pm2 stop anuva_backend || true
pm2 delete anuva_backend || true

# Start TypeScript app with ts-node
pm2 start index.ts --name anuva_backend --interpreter $(which ts-node)

# Save PM2 process list
pm2 save

# Optional health check
curl -f http://localhost:5000 || exit 1

echo "Server started successfully."
exit 0
