#!/bin/bash
# JobPortalScout runner - for manual execution or future cron
set -e
cd "$(dirname "$0")/.."
exec node src/index.js
