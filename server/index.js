require('dotenv').config();
const database = require('./app/models');
const app = require('./app');
const HTTP_PORT = process.env.HTTP_PORT || 5000;

const main = async () => {
	//?SERVER
	app.listen(HTTP_PORT, async () => {
		console.log(`====SERVER STARTED ON PORT ${HTTP_PORT}====`);

		//?DATABASE
		await database.connect().then(() => {
			console.log('System: Do something after database connection.');
		});
	});
};

main();
