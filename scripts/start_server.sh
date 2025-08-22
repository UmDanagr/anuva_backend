#!/bin/bash
set -e
set -x

cd /var/www/html

# Start TypeScript app with ts-node
pm2 start index.ts --name anuva_backend --interpreter ts-node

# Save PM2 process list
pm2 save

# Optional health check
curl -f http://localhost:5000 || exit 1

echo "Server started successfully."
exit 0
