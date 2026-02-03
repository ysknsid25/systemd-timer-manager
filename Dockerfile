FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

# Restore man pages (unminimize) and install systemd, man-db, and necessary tools
RUN yes | unminimize && \
    apt-get update && \
    apt-get install -y \
    systemd \
    systemd-sysv \
    curl \
    gnupg \
    man-db \
    manpages \
    manpages-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 24
RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g unbuild jiti

# Remove unnecessary systemd services to run in docker
RUN cd /lib/systemd/system && \
    rm -f multi-user.target.wants/* \
    etc/fstab \
    usermode.service \
    systemd-resolved.service \
    systemd-logind.service

# Set working directory
WORKDIR /app

# The entrypoint must be systemd
STOPSIGNAL SIGRTMIN+3
CMD ["/sbin/init"]
