use serde::{Deserialize, Deserializer};
use std::str::FromStr;

pub fn deserialize_timezone<'de, D>(deserializer: D) -> Result<chrono_tz::Tz, D::Error>
where
    D: Deserializer<'de>,
{
    let timezone = String::deserialize(deserializer)?;
    chrono_tz::Tz::from_str(timezone.as_str())
        .map_err(|_| serde::de::Error::custom(format!("Invalid timezone: {}", timezone)))
}

pub fn serialize_timezone<S>(timezone: &chrono_tz::Tz, serializer: S) -> Result<S::Ok, S::Error>
where
    S: serde::Serializer,
{
    serializer.serialize_str(timezone.name())
}

pub fn is_valid_hour<'de, D>(deserializer: D) -> Result<u8, D::Error>
where
    D: Deserializer<'de>,
{
    let hour = u8::deserialize(deserializer)?;
    if hour > 23 {
        return Err(serde::de::Error::custom(format!("Invalid hour: {}", hour)));
    }
    return Ok(hour);
}

pub fn is_valid_minute<'de, D>(deserializer: D) -> Result<u8, D::Error>
where
    D: Deserializer<'de>,
{
    let minute = u8::deserialize(deserializer)?;
    if minute > 59 {
        return Err(serde::de::Error::custom(format!(
            "Invalid minute: {}",
            minute
        )));
    }
    return Ok(minute);
}
