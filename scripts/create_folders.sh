#!/bin/bash

# ------------------------------
# Script: create_folders.sh
# Purpose: Ensure deployment directories exist
#          with correct permissions to prevent
#          CodeDeploy rollback.
# ------------------------------

# Set variables
DEPLOY_DIR="/var/www/html"
OWNER="ubuntu"
GROUP="ubuntu"
PERMISSIONS=755

# Create the directory if it doesn't exist
if [ ! -d "$DEPLOY_DIR" ]; then
    echo "Creating deployment directory: $DEPLOY_DIR"
    mkdir -p "$DEPLOY_DIR"
else
    echo "Deployment directory already exists: $DEPLOY_DIR"
fi

# Set ownership
echo "Setting ownership to $OWNER:$GROUP"
chown -R $OWNER:$GROUP "$DEPLOY_DIR"

# Set permissions
echo "Setting permissions to $PERMISSIONS"
chmod -R $PERMISSIONS "$DEPLOY_DIR"

# Exit successfully
echo "Folder setup completed successfully."
exit 0
