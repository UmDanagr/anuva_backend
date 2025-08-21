#!/bin/bash
echo "Installing dependencies..."
cd /var/www/html

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
    sudo yum install -y nodejs
fi

# Install dependencies
if [ -f "package.json" ]; then
    npm install --production
fi
echo "Dependencies installed"
EOF
