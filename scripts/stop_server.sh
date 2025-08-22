#!/bin/bash
set -e
set -x

# Set HOME for PM2
export HOME=/home/ubuntu
mkdir -p $HOME/.pm2
chown -R ubuntu:ubuntu $HOME/.pm2

# Stop and delete PM2 process safely
pm2 stop anuva_backend || true
pm2 delete anuva_backend || true

echo "Server stopped successfully."
exit 0
