#!/bin/bash
set -e
set -x

DEPLOY_DIR="/var/www/html"
OWNER="ubuntu"
GROUP="ubuntu"
PERMISSIONS=755

mkdir -p "$DEPLOY_DIR"
chown -R $OWNER:$GROUP "$DEPLOY_DIR"
chmod -R $PERMISSIONS "$DEPLOY_DIR"

echo "Folder setup completed successfully."
exit 0
