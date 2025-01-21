use axum::{routing::get, Router};

async fn index() -> String {
    String::from("homepage")
}

#[tokio::main]
async fn main() {
    let app = Router::new().route("/", get(index));

    axum::Server::bind(&"0.0.0.0:5233".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
