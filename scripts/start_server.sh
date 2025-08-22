#!/bin/bash
set -e
set -x
cd /var/www/html

# Stop old PM2 process if exists
pm2 stop anuva_backend || true

# Start TypeScript app with ts-node
pm2 start index.ts --name anuva_backend --interpreter ts-node

# Save PM2 process list
pm2 save

exit 0
