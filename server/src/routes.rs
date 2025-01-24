use crate::app_state::AppState;
use crate::dtos::{requests, User};
use axum::extract::Query;
use axum::{http::StatusCode, Extension, Json};
use std::sync::Arc;

pub async fn get_index() -> String {
    String::from("Hello, World!")
}

pub async fn get_users(
    Extension(state): Extension<Arc<AppState>>,
    request: Query<requests::GetAllUsersRequest>,
) -> (StatusCode, Result<Json<Vec<User>>, String>) {
    match state.get_all_users(&request.password) {
        Ok(users) => (StatusCode::OK, Ok(users)),
        Err(e) => (StatusCode::UNAUTHORIZED, Err(e.to_string())),
    }
}

pub async fn post_echo(input: String) -> String {
    input
}

pub async fn post_send_notification_to_user(
    Extension(state): Extension<Arc<AppState>>,
    Json(request): Json<requests::SendNotificationRequest>,
) -> (StatusCode, String) {
    match state.send_notification_to_user(request).await {
        Ok(response) => (StatusCode::OK, response),
        Err(e) => (StatusCode::UNAUTHORIZED, e),
    }
}

pub async fn post_register_user(
    Extension(state): Extension<Arc<AppState>>,
    Json(request): Json<requests::RegisterUserRequest>,
) -> (StatusCode, String) {
    state.add_user(request);
    (StatusCode::OK, String::from("OK"))
}

pub async fn delete_user(
    Extension(state): Extension<Arc<AppState>>,
    Json(request): Json<requests::DeleteUserRequest>,
) -> StatusCode {
    state.delete_user(request);
    StatusCode::NO_CONTENT
}
