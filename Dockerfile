# Auto-Co — Autonomous AI Company Runtime
# Single-stage image: Ubuntu + Node.js + Claude Code CLI
FROM ubuntu:24.04

# Avoid interactive prompts during apt
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    jq \
    bash \
    ca-certificates \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 20 LTS
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Install Claude Code CLI globally
RUN npm install -g @anthropic-ai/claude-code

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install watcher dependencies (if any listed in package.json)
RUN npm install --omit=dev 2>/dev/null || true

# Ensure scripts are executable
RUN chmod +x auto-loop.sh stop-loop.sh monitor.sh install-daemon.sh watch.sh 2>/dev/null || true

# Create runtime directories
RUN mkdir -p logs memories docs projects

# Default: run the autonomous loop
CMD ["bash", "auto-loop.sh"]
