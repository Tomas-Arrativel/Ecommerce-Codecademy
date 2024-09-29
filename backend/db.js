const { Pool } = require("pg");

const pool = new Pool({
	host: "localhost",
	user: "postgres",
	port: "5432",
	password: "postgres",
	database: "ecommerce",
});

// const pool = new Pool({
// 	connectionString: process.env.DB_URL,
// 	ssl: {
// 		rejectUnauthorized: false, // This will ignore self-signed certificates
// 	},
// });

module.exports = pool;
