#!/bin/bash
set -e
set -x

# Stop PM2 app if exists
pm2 stop anuva_backend || true
pm2 delete anuva_backend || true

echo "Server stopped successfully."
exit 0
