//?custom logger
exports.log = (req, res, next) => {
	console.log('A client requested a server: ', req.method);
	next();
};
