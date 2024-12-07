-- Drop relationship tables first
DROP TABLE IF EXISTS user_favorite_goals CASCADE;

DROP TABLE IF EXISTS user_badges CASCADE;

DROP TABLE IF EXISTS goal_set_goals CASCADE;

DROP TABLE IF EXISTS user_goal_sets CASCADE;

DROP TABLE IF EXISTS categories_goals CASCADE;

DROP TABLE IF EXISTS user_categories CASCADE;

-- Then drop core tables
DROP TABLE IF EXISTS goal_sets CASCADE;

DROP TABLE IF EXISTS journeys CASCADE;

DROP TABLE IF EXISTS badges CASCADE;

DROP TABLE IF EXISTS categories CASCADE;

DROP TABLE IF EXISTS goals CASCADE;

-- Finally drop the users table
DROP TABLE IF EXISTS users CASCADE;