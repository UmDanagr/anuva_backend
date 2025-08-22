#!/bin/bash
set -e
set -x

# Example Node.js server with PM2
pm2 stop myapp || true  # ignore error if not running

echo "Server stopped successfully."
exit 0
