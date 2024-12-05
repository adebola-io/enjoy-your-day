CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE
    IF NOT EXISTS goals (
        title CHARACTER VARYING NOT NULL,
        instruction CHARACTER VARYING NOT NULL,
        info CHARACTER VARYING,
        theme_color CHARACTER VARYING DEFAULT '#4d284c',
        icon_name CHARACTER VARYING DEFAULT 'generic',
        is_recommendable BOOLEAN DEFAULT FALSE,
        involvement_level INT DEFAULT 0,
        week_day_affinity INT,
        repeat_rate VARCHAR(32)
    );

CREATE TABLE
    IF NOT EXISTS users (
        uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4 () NOT NULL,
        name CHARACTER VARYING(32) NOT NULL,
        image_url VARCHAR(50),
        email VARCHAR(255),
        is_admin BOOLEAN DEFAULT FALSE
    );

CREATE TABLE
    IF NOT EXISTS categories (
        uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4 () NOT NULL,
        name VARCHAR(50) NOT NULL,
        icon_name VARCHAR(50) NOT NULL,
        creator UUID
    );

CREATE TABLE
    IF NOT EXISTS preferred_categories (
        uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4 () NOT NULL,
        user_uuid UUID NOT NULL,
        category_uuid UUID NOT NULL
    );