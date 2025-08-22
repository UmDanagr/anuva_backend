echo '#!/bin/bash' > scripts/stop_server.sh
echo 'echo "Stopping application..."' >> scripts/stop_server.sh
echo 'sudo pkill -f "node" || true' >> scripts/stop_server.sh
echo 'sudo pkill -f "npm" || true' >> scripts/stop_server.sh
echo 'echo "Application stopped"' >> scripts/stop_server.sh
