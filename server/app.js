const express = require('express');

const app = express();

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const options = {};
app.use(require('cors')(options));

//?ROUTES
const router = express.Router();
require('./app/routes')(app, router);
app.use('/', (req, res) => {
	res.send('Welcome');
});

//?LOGGER
const logger = require('./app/handlers/logger');
app.use(logger.log);

//?SETUP ERROR HANDLERS
const errorHandlers = require('./app/handlers/errorHandlers');
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongooseErrors);
if (process.env.ENV === 'DEVELOPMENT') {
	app.use(errorHandlers.developmentErrors);
} else {
	app.use(errorHandlers.productionErrors);
}

module.exports = app;
