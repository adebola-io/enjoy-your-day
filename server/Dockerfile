# Use the official Rust image as the build environment
FROM rust:latest as builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the entire project directory into the container
COPY . .

# Update the package list and install necessary dependencies
# - pkg-config: Required for building the Rust application
RUN apt-get update && \
    apt install pkg-config -y && \
    rm -rf /var/lib/apt/lists/*

# Build the Rust project in release mode
RUN cargo build --release

# Use the official Debian image as the runtime environment
# The slim version of the Debian image is used to reduce the image size
FROM debian:bookworm-slim

# Update the package list and install necessary dependencies
# - libssl-dev: SSL library required by the Rust application
# - ca-certificates: Common CA certificates
# Clean up the package list to reduce the image size
RUN apt-get update && \
    apt-get install -y libssl-dev ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Copy the compiled Rust binary from the builder stage to the runtime environment
COPY --from=builder /usr/src/app/target/release/enjoy_your_day_server /usr/local/bin/

# Expose the secret SECRET_EXAMPLE at buildtime and use its value as git remote URL
RUN --mount=type=secret,id=FIREBASE_SERVICE_ACCOUNT_JSON,mode=0444,required=true \
    touch ./service_account.json && \
    cat /run/secrets/FIREBASE_SERVICE_ACCOUNT_JSON > ./service_account.json

# Set an environment variable for Rust logging
ENV RUST_LOG=info

# Expose port 7860 for the application
EXPOSE 7860

# Set the default command to run the Rust application
CMD ["enjoy_your_day_server"]