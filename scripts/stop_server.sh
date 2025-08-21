#!/bin/bash
echo "Stopping application..."
sudo pkill -f "node" || true
sudo pkill -f "npm" || true
echo "Application stopped"
EOF
