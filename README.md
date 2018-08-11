# DotnDashServer
DotnDash

1) npm install
2) npm install sequelize-cli
3) Configure ./config/config.json
4) sequelize db:create
5) sequelize db:migrate
6) execute INSERT INTO "UserProfiles"
(id, "userId", password, "permissionId", status, "effectiveFromDate", "effectiveTillDate", "emailId", "phoneNumber", "createdAt", "updatedAt")
VALUES(3, 'admin1', '$2b$08$B8xoFSUAQz/kJSXUVcs5EOZNV2THu5u6V18DjJEhSrtKcH5AIGGg2', 'admin', 'Active', NULL, NULL, 'vigneshj6@gmail.com', '9999999999', '2018-08-08 02:52:17.758', '2018-08-08 02:52:17.758'); for default login
7) visit http://hostname:port/api-docs/
8) Default Credential UserId : admin1 and Passwd : hi