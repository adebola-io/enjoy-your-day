# Use the official Rust image as the build environment
# This stage is named "builder"
# The slim version of the Rust image is used to reduce the image size
FROM rust:1.75-slim as builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the entire project directory into the container
COPY . .

# Build the Rust project in release mode
RUN cargo build --release

# Use the official Debian image as the runtime environment
# The slim version of the Debian image is used to reduce the image size
FROM debian:bookworm-slim

# Update the package list and install necessary dependencies
# - libssl-dev: SSL library required by the Rust application
# - ca-certificates: Common CA certificates
# Clean up the package list to reduce the image size
RUN apt-get update && apt-get install -y libssl-dev ca-certificates && rm -rf /var/lib/apt/lists/*

# Copy the compiled Rust binary from the builder stage to the runtime environment
COPY --from=builder /usr/src/app/target/release/enjoy_your_day_server /usr/local/bin/

# Set an environment variable for Rust logging
ENV RUST_LOG=info

# Expose port 8000 for the application
EXPOSE 8000

# Set the default command to run the Rust application
CMD ["enjoy_your_day_server"]