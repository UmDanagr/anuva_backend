#!/bin/bash
echo "Stopping application..."

# Stop the app gracefully with PM2
pm2 stop anuva_backend || true
pm2 delete anuva_backend || true

echo "Application stopped."
