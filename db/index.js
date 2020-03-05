const dbConfig = require("../config/db.json");
console.log(dbConfig);

module.exports = require("knex")({
	client: "mysql2",
	connection: {
		host: dbConfig.DB_ADDRESS,
		user: dbConfig.DB_USER,
		port: dbConfig.DB_PORT,
		password: dbConfig.DB_PASSWORD,
		database: dbConfig.DB_DATABASE_NAME
	}
});
