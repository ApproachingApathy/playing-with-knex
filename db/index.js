const dbConfig = require("../config/db.json");
console.log(dbConfig);
const mysql = require("mysql2");

const knex = require("knex")({
	client: "mysql2",
	connection: {
		host: dbConfig.DB_ADDRESS,
		user: dbConfig.DB_USER,
		port: dbConfig.DB_PORT,
		password: dbConfig.DB_PASSWORD,
		database: dbConfig.DB_DATABASE_NAME
	}
});

const data = knex("Characters")
	.select("*")
	.then(rows => console.log(rows));

module.exports = data;
