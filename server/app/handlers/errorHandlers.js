exports.catchErrors = (fn) => {
	return function (req, res, next) {
		fn(req, res, next).catch((err) => {
			if (typeof err === 'string') {
				res.status(400).send(err);
			} else {
				next(err);
			}
		});
	};
};

exports.mongooseErrors = (err, req, res, next) => {
	let result = {
		success: false,
		failure: false,
		invalid: false,
		error: true,
		message: '',
	};
	if (!err.errors) return next(err);
	const errorKeys = Object.keys(err.errors);
	let message = '';
	errorKeys.forEach((key) => (message += err.errors[key].message + ' | '));

	message = message.substr(0, message.length - 2);
	result = {
		...result,
		message: message,
	};
	res.send(result);
};

exports.developmentErrors = (err, req, res, next) => {
	let result = {
		success: false,
		failure: false,
		invalid: false,
		error: true,
		message: '',
	};
	err.stack = err.stack || '';
	const errorDetails = {
		message: err.message,
		status: err.status,
		stack: err.stack,
	};
	result = {
		...result,
		message: err.message,
	};
	res.status(err.status || 500).send(result);
};

exports.productionErrors = (err, req, res, next) => {
	let result = {
		success: false,
		failure: false,
		invalid: false,
		error: true,
		message: '',
	};
	result = {
		...result,
		message: 'Internal server error!',
	};
	res.send(result);
};

exports.notFound = (req, res, next) => {
	let result = {
		success: false,
		failure: false,
		invalid: false,
		error: true,
		message: '',
	};
	result = {
		...result,
		message: 'Route not found!',
	};
	res.status(404).send(result);
};
