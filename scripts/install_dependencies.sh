echo '#!/bin/bash' > scripts/install_dependencies.sh
echo 'echo "Installing dependencies..."' >> scripts/install_dependencies.sh
echo 'cd /var/www/html' >> scripts/install_dependencies.sh
echo '' >> scripts/install_dependencies.sh
echo 'if ! command -v node &> /dev/null; then' >> scripts/install_dependencies.sh
echo '    curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -' >> scripts/install_dependencies.sh
echo '    sudo yum install -y nodejs' >> scripts/install_dependencies.sh
echo 'fi' >> scripts/install_dependencies.sh
echo '' >> scripts/install_dependencies.sh
echo 'if [ -f "package.json" ]; then' >> scripts/install_dependencies.sh
echo '    npm install --production' >> scripts/install_dependencies.sh
echo 'fi' >> scripts/install_dependencies.sh
echo 'echo "Dependencies installed"' >> scripts/install_dependencies.sh
