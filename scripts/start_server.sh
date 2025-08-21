#!/bin/bash
echo "Starting application..."
cd /var/www/html

# Start the application
if [ -f "app.js" ]; then
    nohup node app.js > app.log 2>&1 &
elif [ -f "server.js" ]; then
    nohup node server.js > app.log 2>&1 &
elif [ -f "index.js" ]; then
    nohup node index.js > app.log 2>&1 &
else
    nohup npm start > app.log 2>&1 &
fi

echo "Application started"
EOF
