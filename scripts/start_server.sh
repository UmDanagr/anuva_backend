echo '#!/bin/bash' > scripts/start_server.sh
echo 'echo "Starting application..."' >> scripts/start_server.sh
echo 'cd /var/www/html' >> scripts/start_server.sh
echo '' >> scripts/start_server.sh
echo 'if [ -f "app.js" ]; then' >> scripts/start_server.sh
echo '    nohup node app.js > app.log 2>&1 &' >> scripts/start_server.sh
echo 'elif [ -f "server.js" ]; then' >> scripts/start_server.sh
echo '    nohup node server.js > app.log 2>&1 &' >> scripts/start_server.sh
echo 'elif [ -f "index.ts" ]; then' >> scripts/start_server.sh
echo '    nohup node index.ts > app.log 2>&1 &' >> scripts/start_server.sh
echo 'else' >> scripts/start_server.sh
echo '    nohup npm start > app.log 2>&1 &' >> scripts/start_server.sh
echo 'fi' >> scripts/start_server.sh
echo '' >> scripts/start_server.sh
echo 'echo "Application started"' >> scripts/start_server.sh
