<p align="center">
    <img src="assets/icon-gray.svg" width="128" height="128" alt="Icon of Enjoy Your Day, a square white outline with dot-circled eyes and a smiley face, slightly tilted to the right.">
</p>

<p align="center">
    <h1 align="center">Enjoy Your Day</h1>
</p>

_Enjoy Your Day_ is a simple offline-supported web app that generates goals to make each day a little more interesting.

## 🚀 Deployment

The application is deployed on [enjoyyourday.live](https://enjoyyourday.live).

## ✨ Features

- 📝 Simple and intuitive interface.
- 📈 Personalized set for each day.
- 📊 Tracks your progress and provides recommendations.
- 📦 Easy to use and customizable

## 🏁 Getting Started

### 🛠️ Prerequisites

The app is a progressive web application. Majority of the functionality lies in the client that runs in the browser. This client is built using the following technologies, among others:

- [Bun](https://bun.sh/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [PGLite](https://github.com/electric-sql/pglite)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [unfinished](https://github.com/adebola-io/unfinished), and
- [cells](https://github.com/adebola-io/cells).

### 🎨 Design

The working UI design is available on Figma [here](https://www.figma.com/design/ANBzTQord4FWzzxzsMzz61/Enjoy-Your-Day?node-id=16-52&t=NpdQhq0snsail8Y7-1).

### 📥 Installation

To get started, you need to clone the repository and install the dependencies.

```sh
git clone https://github.com/adebola-io/enjoy-your-day.git

cd enjoy-your-day

bun setup
```

The last command will run the [setup script](./setup/onboarding.sh) and install the necessary dependencies for both the client and server.

To run the client, run the following command:

```sh
bun run client
```

## 🤝 Contributing

Contributions are welcome! If you have any suggestions or improvements, please open an issue or submit a pull request.

## 📄 License

Enjoy Your Day is licensed under the [Functional Source License, Version 1.1, Apache 2.0 Future License](LICENSE.md).
