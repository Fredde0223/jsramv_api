$(> db/testUsers.sqlite)
cat db/migrate.sql | sqlite3 db/testUsers.sqlite

$(> db/testReports.sqlite)
cat db/migrateReports.sql | sqlite3 db/testReports.sqlite
