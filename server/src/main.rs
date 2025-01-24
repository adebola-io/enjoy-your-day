mod app_state;
mod checkpoint;
mod dtos;
mod env;
mod routes;
mod utils;

use app_state::AppState;
use axum::{
    routing::{delete, get, post},
    Extension, Router, Server,
};
use dotenv::dotenv;
use env::{get_admin_password, get_service_account_path};
use std::{net::SocketAddr, sync::Arc};

#[tokio::main]
async fn main() {
    match dotenv() {
        Ok(_) => {
            Server::bind(
                &std::env::var("PORT")
                    .map(|port| format!("0.0.0.0:{}", port))
                    .unwrap_or_else(|_| "0.0.0.0:7860".to_string())
                    .parse::<SocketAddr>()
                    .expect("Could not parse SocketAddr."),
            )
            .serve(
                Router::new()
                    .route("/", get(routes::get_index))
                    .route("/notify", post(routes::post_send_notification_to_user))
                    .route("/echo", post(routes::post_echo))
                    .route("/register", post(routes::post_register_user))
                    .route("/delete", delete(routes::delete_user))
                    .route("/users", get(routes::get_users))
                    .layer(Extension(Arc::new(
                        AppState::new(get_service_account_path(), get_admin_password())
                            .await
                            .start_checkpoint_loop(),
                    )))
                    .into_make_service(),
            )
            .await
            .expect("Server could not be started.");
        }
        Err(e) => {
            panic!("Could not read env variables from environment: {:?}", e)
        }
    }
}
