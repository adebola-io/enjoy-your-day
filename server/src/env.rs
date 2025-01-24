pub fn get_service_account_path() -> String {
    std::env::var("FIREBASE_SERVICE_ACCOUNT_JSON_PATH").unwrap_or_else(|_| {
        eprintln!("FIREBASE_SERVICE_ACCOUNT_JSON_PATH environment variable not set");
        std::process::exit(1);
    })
}

pub fn get_admin_password() -> String {
    std::env::var("ADMIN_PASSWORD").unwrap_or_else(|_| {
        eprintln!("ADMIN_PASSWORD environment variable not set");
        std::process::exit(1);
    })
}
