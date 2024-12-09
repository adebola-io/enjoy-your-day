CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------
-- CORE TABLES
-- --------------------
CREATE TABLE
    IF NOT EXISTS users (
        user_uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4 () NOT NULL,
        name CHARACTER VARYING(32) NOT NULL,
        image_url VARCHAR(50),
        email VARCHAR(255),
        is_admin BOOLEAN DEFAULT FALSE
    );

CREATE TABLE
    IF NOT EXISTS goals (
        goal_uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4 () NOT NULL,
        user_uuid UUID NOT NULL,
        title CHARACTER VARYING NOT NULL,
        instruction CHARACTER VARYING NOT NULL,
        info CHARACTER VARYING,
        theme_color CHARACTER VARYING DEFAULT '#4d284c',
        icon_name CHARACTER VARYING DEFAULT 'generic',
        is_recommendable BOOLEAN DEFAULT FALSE,
        involvement_level INT DEFAULT 0,
        week_day_affinity INT,
        repeat_rate VARCHAR(32),
        CONSTRAINT fk_goal_user FOREIGN KEY (user_uuid) REFERENCES users (user_uuid) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS categories (
        category_uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4 () NOT NULL,
        user_uuid UUID NOT NULL,
        name VARCHAR(50) NOT NULL,
        icon_name VARCHAR(50) NOT NULL,
        theme_color CHARACTER VARYING DEFAULT '#4d284c',
        CONSTRAINT fk_category_user FOREIGN KEY (user_uuid) REFERENCES users (user_uuid) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS badges (
        badge_uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4 () NOT NULL,
        icon CHARACTER VARYING NOT NULL,
        name CHARACTER VARYING NOT NULL,
        description CHARACTER VARYING NOT NULL,
        color CHARACTER VARYING NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS journeys (
        journey_uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4 () NOT NULL,
        name VARCHAR(50) NOT NULL,
        info CHARACTER VARYING,
        theme_colors CHARACTER VARYING DEFAULT 'red, green, blue',
        user_uuid UUID NOT NULL,
        CONSTRAINT fk_journey_user FOREIGN KEY (user_uuid) REFERENCES users (user_uuid) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS goal_sets (
        goal_set_uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4 () NOT NULL,
        date DATE NOT NULL,
        user_uuid UUID NOT NULL,
        CONSTRAINT fk_goal_set_user FOREIGN KEY (user_uuid) REFERENCES users (user_uuid) ON DELETE CASCADE ON UPDATE CASCADE
    );

-- --------------------
-- RELATIONSHIP TABLES
-- --------------------
-- One -> Many Relationship between a user and preferred categories.
CREATE TABLE
    IF NOT EXISTS user_categories (
        user_category_uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4 () NOT NULL,
        user_uuid UUID NOT NULL,
        category_uuid UUID NOT NULL,
        CONSTRAINT fk_user_categories_user FOREIGN KEY (user_uuid) REFERENCES users (user_uuid) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_user_category_category FOREIGN KEY (category_uuid) REFERENCES categories (category_uuid) ON DELETE CASCADE ON UPDATE CASCADE
    );

-- Many -> Many Relationship between Categories and Goals.
CREATE TABLE
    IF NOT EXISTS categories_goals (
        categories_goals_uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4 () NOT NULL,
        category_uuid UUID NOT NULL,
        goal_uuid UUID NOT NULL,
        CONSTRAINT fk_categories_goals_goal FOREIGN KEY (goal_uuid) REFERENCES goals (goal_uuid) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_categories_goals_category FOREIGN KEY (category_uuid) REFERENCES categories (category_uuid) ON DELETE CASCADE ON UPDATE CASCADE
    );

-- One -> Many Relationship between a user and their goal sets.
CREATE TABLE
    IF NOT EXISTS user_goal_sets (
        user_goal_set_uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4 () NOT NULL,
        user_uuid UUID NOT NULL,
        goal_set_uuid UUID NOT NULL,
        CONSTRAINT fk_user_goal_sets_user FOREIGN KEY (user_uuid) REFERENCES users (user_uuid) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_user_goal_sets_goal_set FOREIGN KEY (goal_set_uuid) REFERENCES goal_sets (goal_set_uuid) ON DELETE CASCADE ON UPDATE CASCADE
    );

-- One -> Many Relationship between a goal set and its goals.
CREATE TABLE
    IF NOT EXISTS goal_set_goals (
        goal_set_goal_uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4 () NOT NULL,
        goal_set_uuid UUID NOT NULL,
        goal_uuid UUID NOT NULL,
        CONSTRAINT fk_goal_set_goals_goal_set FOREIGN KEY (goal_set_uuid) REFERENCES goal_sets (goal_set_uuid) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_goal_set_goals_goal FOREIGN KEY (goal_uuid) REFERENCES goals (goal_uuid) ON DELETE CASCADE ON UPDATE CASCADE
    );

-- One -> Many Relationship between a user and their badges.
CREATE TABLE
    IF NOT EXISTS user_badges (
        user_badge_uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4 () NOT NULL,
        user_uuid UUID NOT NULL,
        badge_uuid UUID NOT NULL,
        CONSTRAINT fk_user_badges_user FOREIGN KEY (user_uuid) REFERENCES users (user_uuid) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_user_badges_badge FOREIGN KEY (badge_uuid) REFERENCES badges (badge_uuid) ON DELETE CASCADE ON UPDATE CASCADE
    );

-- One -> Many Relationship between a user and their favorite goals.
CREATE TABLE
    IF NOT EXISTS user_favorite_goals (
        user_favorite_goal_uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4 () NOT NULL,
        user_uuid UUID NOT NULL,
        goal_uuid UUID NOT NULL,
        CONSTRAINT fk_user_favorite_goals_user FOREIGN KEY (user_uuid) REFERENCES users (user_uuid) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_user_favorite_goals_goal FOREIGN KEY (goal_uuid) REFERENCES goals (goal_uuid) ON DELETE CASCADE ON UPDATE CASCADE
    );

-- --------------------
-- SETUP
-- --------------------
-- Creates the system user for goal creation.
INSERT INTO
    users (name, is_admin)
VALUES
    ('system', true);