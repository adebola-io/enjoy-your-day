use axum::{
    extract::Json,
    routing::{get, post},
    Router,
};
use dotenv::dotenv;
use fcm_rs::{
    client::FcmClient,
    models::{Message, Notification},
};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;
use std::{fs, io};

#[derive(Serialize, Deserialize)]
struct SendMessage {
    device_token: String,
    message_title: String,
    message_body: String,
}

async fn index() -> String {
    String::from("Hello, World!")
}

async fn send_message(Json(payload): Json<SendMessage>) -> String {
    let service_account_path = "./service-account.json";
    let client = match FcmClient::new(service_account_path).await {
        Ok(client) => client,
        Err(error) => return format!("Error creating FCM client: {}", error),
    };

    let message = Message {
        token: Some(payload.device_token),
        notification: Some(Notification {
            title: Some(payload.message_title),
            body: Some(payload.message_body),
        }),
        data: None,
    };

    match client.send(message).await {
        Ok(response) => format!("Successfully sent message: {:?}", response),
        Err(e) => format!("Error sending message: {}", e),
    }
}

fn create_service_account_file() -> io::Result<()> {
    let service_account_content = std::env::var("FIREBASE_SERVICE_ACCOUNT_JSON")
        .expect("FIREBASE_SERVICE_ACCOUNT_JSON is not set as an environment variable");
    fs::write("./service-account.json", service_account_content)
}

#[tokio::main]
async fn main() {
    dotenv().ok();
    create_service_account_file().unwrap();

    let app = Router::new()
        .route("/", get(index))
        .route("/message", post(send_message));

    let port: SocketAddr = std::env::var("PORT")
        .map(|port| format!("0.0.0.0:{}", port))
        .unwrap_or_else(|_| "0.0.0.0:7860".to_string())
        .parse()
        .unwrap();

    axum::Server::bind(&port)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
