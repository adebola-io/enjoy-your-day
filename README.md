> **THIS PROJECT IS 60% COMPLETE.**

<p align="center">
    <img src="assets/icon-gray.svg" width="128" height="128" alt="Icon of Enjoy Your Day, a square white outline with dot-circled eyes and a smiley face, slightly tilted to the right.">
</p>

<p align="center">
    <h1 align="center">Enjoy Your Day, Everyday.</h1>
</p>

_Enjoy Your Day_ is a simple offline web app for tracking daily goals. It is a proof-of-concept app for [@adbl/unfinished](https://github.com/adebola-io/unfinished), a lightweight web framework.

## 🚀 Deployment

The stage application is deployed on [dev.enjoyyourday.live/](https://dev.enjoyyourday.live/).

## ✨ Features

- 📝 Simple and intuitive interface.
- 📈 Personalized set for each day.
- 📊 Tracks your progress and provides recommendations.
- 📦 Easy to use and customizable.

## 🏁 Getting Started

### 🛠️ Prerequisites

The app is a progressive web application. Majority of the functionality lies in the client that runs in the browser. This client is built using the following technologies, among others:

- [Bun](https://bun.sh/)
- [Vite](https://vitejs.dev/)
- [Rust](https://www.rust-lang.org/)
- [Axum](https://github.com/tokio-rs/axum)
- [TypeScript](https://www.typescriptlang.org/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [unfinished](https://github.com/adebola-io/unfinished), and
- [cells](https://github.com/adebola-io/cells).

### 🖥️ System Dependencies

Ensure you have the following dependencies installed on your system:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Bun](https://bun.sh/)
- [Rust](https://www.rust-lang.org/tools/install)
- [Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html)
- `pkg-config` and `libssl-dev` (required for building some Rust dependencies)

### 🎨 Design

The draft UI design is available on Figma [here](https://www.figma.com/design/ANBzTQord4FWzzxzsMzz61/Enjoy-Your-Day?node-id=16-52&t=NpdQhq0snsail8Y7-1).

### 📥 Getting Started

To get started, you need to clone the repository and install the dependencies.

```sh
git clone https://github.com/adebola-io/enjoy-your-day.git
```

## 🌐 Environment Variables

The following environment variables are required for the client:

- `VITE_API_URL`: The URL of the Notification Scheduler API server.

The following are required for the server:

- `ADMIN_PASSWORD`: A password for the admin user, for testing notifications.
- `PORT`: The port to run the server on.

Ensure these variables are set in your environment before running the project.

### 🚀 Running the Project

#### Client

To run the client, run the following command in the client folder:

```sh
bun run dev
```

#### Server

To run the server, run the following command in the server folder:

```sh
cargo build
```

To run the server, run the following command in the server folder:

```sh
cargo run
```

## 🤝 Contributing

Contributions are welcome! If you have any suggestions or improvements, please open an issue or submit a pull request.

## 📄 License

Enjoy Your Day is licensed under the [Functional Source License, Version 1.1, Apache 2.0 Future License](LICENSE.md).
