const { Pool } = require("pg");

const pool = new Pool({
	host: "localhost",
	user: "postgres",
	port: "5432",
	password: "postgres",
	database: "ecommerce",
});

// const pool = new Pool({
// 	host: process.env.DB_HOSTNAME,
// 	user: process.env.DB_USER,
// 	port: process.env.DB_PORT,
// 	password: process.env.DB_NAME,
// 	database: process.env.DB_PASSWORD,
// });

module.exports = pool;
