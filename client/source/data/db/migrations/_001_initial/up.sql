CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    name character varying(32) NOT NULL,
    image_url VARCHAR(50),
    email VARCHAR(255),
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS categories (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    name VARCHAR(50) NOT NULL,
    icon_name VARCHAR(50) NOT NULL,
    creator UUID
);

CREATE TABLE IF NOT EXISTS preferred_categories (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    user_uuid UUID NOT NULL,
    category_uuid UUID NOT NULL
);



