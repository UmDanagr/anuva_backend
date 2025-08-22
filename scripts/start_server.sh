#!/bin/bash
set -e
set -x

cd /var/www/html

# Make sure PATH is correct for SSM (sometimes /usr/local/bin is missing)
export PATH=$PATH:/usr/local/bin

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
