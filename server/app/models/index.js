const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.todos = require('./todo.model')(mongoose);
const ATLAS_URI = process.env.ATLAS_URI;

const connect = async () => {
	return await db.mongoose.connect(ATLAS_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		autoIndex: false,
	});
};

db.mongoose.connection.on('connected', () => {
	console.log('====DATABASE CONNECTION ESTABLISHED====');
});

db.mongoose.connection.on('reconnected', () => {
	console.log('====DATABASE CONNECTION REESTABLISHED====');
});

db.mongoose.connection.on('disconnected', () => {
	console.log('====DATABASE CONNECTION DISCONNECTED====');
});

db.mongoose.connection.on('close', () => {
	console.log('====DATABASE CONNECTION CLOSED====');
});

db.mongoose.connection.on('error', (error) => {
	console.log('====DATABASE CONNECTION ERROR====');
	console.log('====ERROR: ', error.message);
});

module.exports.db = db;
module.exports.connect = connect;
