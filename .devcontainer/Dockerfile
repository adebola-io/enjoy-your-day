# Base Ubuntu image.
FROM ubuntu:22.04

# Create a new privileged user.
RUN useradd -m -u 1000 sefunmi && \
    usermod -aG sudo sefunmi && \
    echo "root:password" | chpasswd && \
    echo "sefunmi ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers && \
    # Set permissions for necessary directories
    chown -R sefunmi:sefunmi /home

USER root

# Set environment variables
ENV HOME=/home/sefunmi \
    PATH=/home/sefunmi/.local/bin:/home/sefunmi/.deno/bin:$PATH \
    DEBIAN_FRONTEND=noninteractive \
    PATH="/usr/lib/postgresql/14/bin:${PATH}" \
    PGDATA=/var/lib/postgresql/data

# Update package lists and install necessary packages
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    npm \
    unzip \
    curl \
    git \
    systemd \
    postgresql \
    postgresql-client \
    postgresql-contrib \
    postgresql-common \
    zsh \
    redis \
    python3 \
    golang-go && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    # Create PGDATA directory and set permissions
    mkdir -p ${PGDATA} && chown -R postgres:postgres ${PGDATA} && \
    chown -R postgres:postgres /var/run/postgresql && \
    # Install Bun.
    curl -fsSL https://bun.sh/install | bash && \
    # Install Rust.
    curl -fsSL https://deno.land/install.sh | sh && \
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && \
    # Install Node and NVM.
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash && \
    export NVM_DIR="$HOME/.nvm" && \
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
    nvm install 23 && \
    # Install necessary Node dependencies.
    npm install -g --unsafe-perm localtunnel yarn pnpm spa-http-server ngrok eslint 


EXPOSE 7860 3000 8000 8080 5173 4177 5147 5229

RUN chown -R sefunmi:sefunmi /home/sefunmi

# Switch to the postgres user to initialize the database
USER postgres

# Initialize the database
RUN service postgresql start && \
    psql --command "ALTER USER postgres WITH PASSWORD 'password';"

USER sefunmi

RUN mkdir -p /home/sefunmi/projects
