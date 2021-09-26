module.exports = (app, router) => {
	const todos = require('../controllers/todo.controllers');
	router.get('/', todos.getTodos);
	router.get('/:todoId', todos.getTodo);
	router.post('/new', todos.createTodo);
	router.patch('/:todoId/update', todos.updateTodo);
	router.delete('/:todoId/delete', todos.deleteTodo);

	app.use('/api/todos', router);
};
