<p align="center">
    <img src="assets/icon-gray.svg" width="128" height="128" alt="Icon of Enjoy Your Day, a square white outline with dot-circled eyes and a smiley face, slightly tilted to the right.">
</p>

<p align="center">
    <h1 align="center">Enjoy Your Day</h1>
</p>

Enjoy Your Day is a simple progressive web application that provides and generates itineraries for your day to make it more enjoyable.

## 🚀 Deployment

The application is deployed on [enjoyyourday.live](https://enjoyyourday.live).

## ✨ Features

- 📝 Simple and intuitive interface
- 📈 Generates a personalized itinerary for your day
- 📊 Tracks your progress and provides recommendations
- 📦 Easy to use and customizable

## 🏁 Getting Started

### 🛠️ Prerequisites

- The frontend client is built with [Bun](https://bun.sh/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/) and [unfinished](https://github.com/adebola-io/unfinished).

- The server is built with Rust, using [Actix](https://actix.rs/) and [SQLx](https://github.com/launchbadge/sqlx).

### 🎨 Design

The working UI design is available on Figma [here](https://www.figma.com/design/ANBzTQord4FWzzxzsMzz61/Enjoy-Your-Day?node-id=16-52&t=NpdQhq0snsail8Y7-1).

### 📥 Installation

To get started, you need to clone the repository and install the dependencies.

```sh
git clone https://github.com/adebola-io/enjoy-your-day.git

cd enjoy-your-day

bun setup
```

The last command will run the [setup script](./setup/start.sh) and install the necessary dependencies for both the client and server.

#### 🔧 Environment Variables

You will need to set up the following environment variables in your `.env` file of the server:

- `DATABASE_URL`: The URL of your database.
- `JWT_SECRET`: A secret key for your JWT.
- `JWT_EXPIRES_IN`: The expiration time for your JWT tokens.

For the client, you will need to set up the following environment variables in your `.env` file:

- `VITE_API_URL`: The URL of your backend.

#### 💾 Database

You will need to create a Postgres database and set up the necessary tables in your database. To run the migrations, run the following command:

bun run db:migrate

#### 🔄 Running the Backend

To run the client, run the following command:

bun run client

#### 🖥️ Running the Frontend

To run the server, run the following command:

bun run server

## 🤝 Contributing

Contributions are welcome! If you have any suggestions or improvements, please open an issue or submit a pull request.

## 📄 License

Enjoy Your Day is licensed under the [Functional Source License, Version 1.1, Apache 2.0 Future License](LICENSE.md).
