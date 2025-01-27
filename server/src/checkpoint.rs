use crate::{
    app_state::AppState,
    dtos::{NotificationDetails, ScheduledNotification, SupplementaryNotificationData},
};
use chrono::Timelike;
use fcm_rs::{
    client::FcmClient,
    models::{Message, Notification},
};
use futures::future::join_all;
use std::time::Duration;
use tokio::time::interval;

pub fn checkpoint_loop(state: AppState) -> AppState {
    let user_snapshots = state.user_snapshots.clone();
    let fcm_client = state.fcm_client.clone();
    let mut interval = interval(Duration::from_secs(60));

    tokio::spawn(async move {
        loop {
            interval.tick().await;
            let current_time = chrono::Utc::now();
            let mut futures = vec![];

            for user in user_snapshots.iter() {
                let current_time = current_time.with_timezone(&user.timezone);
                for ScheduledNotification {
                    notification_data,
                    hours,
                    minutes,
                } in &user.scheduled_notifications
                {
                    if !checkpoint_matches(*hours, *minutes, &current_time) {
                        continue;
                    }

                    if let Some(details) = notification_data {
                        let device_token = user.device_token.clone();
                        let details = details.clone();
                        futures.push(send_message(&fcm_client, device_token, details));
                    }
                }
            }

            let results = join_all(futures).await;
            for result in results {
                if let Err(error) = result {
                    eprintln!("Error sending message {}", error);
                }
            }
        }
    });

    state
}

fn checkpoint_matches(
    hours: u8,
    minutes: u8,
    current_time: &chrono::DateTime<chrono_tz::Tz>,
) -> bool {
    current_time.hour() == hours as u32 && current_time.minute() == minutes as u32
}

pub async fn send_message(
    fcm_client: &FcmClient,
    device_token: String,
    details: NotificationDetails,
) -> Result<String, String> {
    match fcm_client
        .send(Message {
            token: Some(device_token),
            notification: Some(Notification {
                title: Some(details.title),
                body: Some(details.body),
            }),
            data: serde_json::to_value(SupplementaryNotificationData {
                actions: details.actions,
                badge: details.badge,
                icon: details.icon,
                image: details.image,
                url: details.url,
                extra_data: details.extra_data,
            })
            .ok(),
        })
        .await
    {
        Ok(response) => Ok(format!("Successfully sent message: {:?}", response)),
        Err(e) => Err(format!("Error sending message: {}", e)),
    }
}
