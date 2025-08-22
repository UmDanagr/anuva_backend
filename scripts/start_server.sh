#!/bin/bash
set -e
set -x

# Go to app directory
cd /var/www/html

# Ensure PATH includes npm binaries
export PATH=$PATH:/usr/local/bin

# Set HOME for PM2
export HOME=/home/ubuntu
mkdir -p $HOME/.pm2
chown -R ubuntu:ubuntu $HOME/.pm2

# Stop previous PM2 process safely
pm2 stop anuva_backend || true
pm2 delete anuva_backend || true

# Start TypeScript app using ts-node
pm2 start index.ts --name anuva_backend --interpreter $(which ts-node)

# Save PM2 process list
pm2 save

# Health check
if ! curl -f http://localhost:5000; then
    echo "Health check failed"
    exit 1
fi

echo "Server started successfully."
exit 0
