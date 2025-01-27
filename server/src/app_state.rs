use crate::{
    checkpoint::{checkpoint_loop, send_message},
    dtos::{requests, User},
};
use axum::Json;
use dashmap::DashMap;
use fcm_rs::client::FcmClient;
use std::sync::Arc;

pub struct AppState {
    password: String,
    pub fcm_client: Arc<FcmClient>,
    pub user_snapshots: Arc<DashMap<String, User>>,
}

impl AppState {
    pub async fn new(service_account_path: String, password: String) -> Self {
        Self {
            password,
            fcm_client: FcmClient::new(&service_account_path)
                .await
                .map(Arc::new)
                .expect("Error creating FCM client"),
            user_snapshots: Arc::new(DashMap::new()),
        }
    }

    pub fn add_user(&self, request: requests::RegisterUserRequest) {
        println!(
            "Adding UUID: {} with token {}",
            &request.uuid, &request.data.device_token
        );
        self.user_snapshots.insert(request.uuid, request.data);
    }

    pub fn delete_user(&self, request: requests::DeleteUserRequest) {
        self.user_snapshots.remove(&request.uuid);
    }

    pub fn get_all_users(&self, password: &str) -> Result<Json<Vec<User>>, String> {
        if password != self.password {
            return Err(format!("Unauthorized."));
        }
        Ok(Json(
            self.user_snapshots
                .iter()
                .map(|u| u.clone())
                .collect::<Vec<User>>(),
        ))
    }

    pub async fn send_notification_to_user(
        &self,
        request: requests::SendNotificationRequest,
    ) -> Result<String, String> {
        if self.password != request.admin_password {
            return Err(format!("Unauthorized."));
        }
        send_message(
            &self.fcm_client,
            self.user_snapshots
                .get(request.user_uuid.as_str())
                .ok_or_else(|| format!("User not found."))
                .map(|user| user.device_token.clone())?,
            request.notification_data,
        )
        .await
        .map_err(|e| format!("Error sending message: {}", e))
    }

    pub fn start_checkpoint_loop(self) -> Self {
        checkpoint_loop(self)
    }
}
