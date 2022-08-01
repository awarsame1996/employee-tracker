const mysql = require('mysql2/promise');

const initDatabase = async (config) => {
	const db = await mysql.createConnection(config);

	const executeQuery = async (query, values) => {
		if (values) {
			const [results] = await db.query(query, values);

			return results;
		}

		const [results] = await db.query(query);

		return results;
	};

	const closeConnection = async () => {
		await db.end();
	};

	return {
		executeQuery,
		closeConnection,
	};
};

module.exports = initDatabase;
