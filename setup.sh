#!/usr/bin/env bash

# CivicConnect full‑stack scaffold (React frontend + Express backend)
# Run inside d:/CivicConnect after pulling the repo.

set -e

# Install all workspace packages
npm run install-all

# Start development servers (client on 5173, server on 5000)
npm run dev

# You can also build the client for production:
# npm run build
