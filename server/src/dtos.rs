use crate::utils::{deserialize_timezone, is_valid_hour, is_valid_minute, serialize_timezone};
use serde::{Deserialize, Serialize};

pub mod requests {
    use super::*;

    #[derive(Serialize, Deserialize)]
    pub struct RegisterUserRequest {
        pub uuid: String,
        pub data: User,
    }

    #[derive(Serialize, Deserialize)]
    pub struct DeleteUserRequest {
        pub uuid: String,
    }

    #[derive(Serialize, Deserialize)]
    pub struct GetAllUsersRequest {
        pub password: String,
    }

    #[derive(Serialize, Deserialize)]
    pub struct SendNotificationRequest {
        pub admin_password: String,
        pub user_uuid: String,
        pub notification_data: NotificationDetails,
    }
}

#[derive(Serialize, Deserialize)]
pub struct ScheduledNotification {
    #[serde(deserialize_with = "is_valid_hour")]
    pub hours: u8,
    #[serde(deserialize_with = "is_valid_minute")]
    pub minutes: u8,
    pub notification_data: Option<NotificationDetails>,
}

impl Clone for ScheduledNotification {
    fn clone(&self) -> Self {
        Self {
            hours: self.hours.clone(),
            minutes: self.minutes.clone(),
            notification_data: None,
        }
    }
}

#[derive(Serialize, Deserialize, Clone)]
pub struct NotificationDetails {
    pub title: String,
    pub body: String,
    pub badge: Option<String>,
    pub icon: Option<String>,
    pub image: Option<String>,
    pub actions: Option<Vec<NotificationAction>>,
    pub extra_data: Option<serde_json::Value>,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct SupplementaryNotificationData {
    pub badge: Option<String>,
    pub icon: Option<String>,
    pub image: Option<String>,
    pub actions: Option<Vec<NotificationAction>>,
    pub extra_data: Option<serde_json::Value>,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct NotificationAction {
    pub action: String,
    pub title: String,
    pub icon: String,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct User {
    #[serde(serialize_with = "serialize_timezone")]
    #[serde(deserialize_with = "deserialize_timezone")]
    pub timezone: chrono_tz::Tz,
    pub device_token: String,
    pub scheduled_notifications: Vec<ScheduledNotification>,
}
