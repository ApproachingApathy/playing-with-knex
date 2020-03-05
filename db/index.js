const dbConfig = require("../config/config.json");

module.exports = require("knex")({
	client: "mysql2",
	connection: {
		host: dbConfig.DB_ADDRESS,
		user: dbConfig.DB_USER,
		password: dbConfig.DB_PASSWORD,
		database: dbConfig.DB_DATABASE_NAME
	}
});
