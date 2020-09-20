CREATE TABLE IF NOT EXISTS reports (
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    UNIQUE(title)
);
