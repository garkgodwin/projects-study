const db = require('../models').db;
const Todo = db.todos;
const { mongooseErrors } = require('../handlers/errorHandlers');

//!GET
exports.getTodos = async (req, res) => {
	let status = 500;
	let result = {
		success: false,
		failure: false,
		invalid: false,
		error: false,
		message: '',
		todos: [],
	};
	await Todo.find({})
		.then((data) => {
			result = {
				...result,
				success: true,
				message: 'Successfully retrieved all todos.',
				todos: data,
			};
			status = 200;
		})
		.catch((error) => {
			result = {
				...result,
				error: true,
				message: 'Some error occured while retrieving all todos.',
			};
			status = 500;
		});
	res.status(status).send(result);
};

exports.getTodo = async (req, res, next) => {
	let result = {
		success: false,
		failure: false,
		invalid: false,
		error: false,
		message: '',
		todo: null,
	};
	const todoId = req.params.todoId;
	await Todo.findById(todoId)
		.then((data) => {
			if (data) {
				result = {
					...result,
					todo: data,
					success: true,
					message: 'Successfully retrieved a todo.',
				};
			} else {
				result = {
					...result,
					invalid: true,
					message: 'There is no such todo with this ID.',
				};
			}

			res.send(result);
		})
		.catch((error) => {
			mongooseErrors(error, req, res, next);
		});
};

//!post
exports.createTodo = async (req, res, next) => {
	let result = {
		success: false,
		failure: false,
		invalid: false,
		error: false,
		message: '',
		todo: null,
	};
	const todoData = req.body.data;
	const todo = {
		title: todoData.title,
		description: todoData.description,
	};
	await Todo.create(todo)
		.then((data) => {
			result = {
				...result,
				success: true,
				message: 'Successfully created a new todo.',
				todo: data,
			};
			res.send(result);
		})
		.catch((error) => {
			mongooseErrors(error, req, res, next);
		});
};

exports.updateTodo = async (req, res, next) => {
	let result = {
		success: false,
		failure: false,
		invalid: false,
		error: false,
		message: '',
		todo: null,
	};

	//?update all, or update completion
	const todoId = req.params.todoId;
	const data = req.body.data;
	const type = req.body.type;
	let update = {};
	if (type === 1) {
		//?update all
		update = {
			title: data.title,
			description: data.description,
		};
	} else {
		//?update completion
		update = {
			completed: data.completed,
		};
	}
	await Todo.findByIdAndUpdate(todoId, update, { new: true })
		.then((data) => {
			if (data) {
				result = {
					...result,
					success: true,
					message: 'Successfully updated a todo.',
					todo: data,
				};
			} else {
				result = {
					...result,
					failure: true,
					message: 'System failed to update a todo item.',
				};
			}
			res.send(result);
		})
		.catch((error) => {
			mongooseErrors(error, req, res, next);
		});
};

exports.deleteTodo = async (req, res, next) => {
	let result = {
		success: false,
		failure: false,
		invalid: false,
		error: false,
		message: '',
	};
	const todoId = req.params.todoId;
	await Todo.findByIdAndDelete(todoId)
		.then(() => {
			result = {
				...result,
				success: true,
				message: 'Successfully deleted a todo.',
			};
			res.send(result);
		})
		.catch((error) => {
			mongooseErrors(error, req, res, next);
		});
};
