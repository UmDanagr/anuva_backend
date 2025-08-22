#!/bin/bash
echo "Starting application..."

cd /var/www/html

# Kill existing app (just in case) before starting fresh
pm2 delete anuva_backend || true

# Start compiled JS from dist/
if [ -f "dist/index.js" ]; then
    pm2 start dist/index.js --name anuva_backend
else
    echo "dist/index.js not found. Did the build run?"
    exit 1
fi

pm2 save
echo "Application started with PM2."
