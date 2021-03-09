#!/bin/sh

# Add:
# COPY docker-entrypoint.sh ./
# ENTRYPOINT ["/bin/sh", "./docker-entrypoint.sh"]
# to the Dockerfile


#  Exit immediately if a future command exits with a non-zero status.
set -e

echo "[Entrypoint Script] Initializing Environment."

# Initialize the Database
node ./bin/init_db.js

echo "[Entrypoint Script] Initialization Complete. Running command."

# Run the command defined as CMD
exec "$@"
