module.exports = (mongoose) => {
	const Schema = mongoose.Schema;
	const todoSchema = mongoose.model(
		'todos',
		Schema(
			{
				title: {
					type: String,
					required: [true, 'Todo title is required'],
				},
				description: {
					type: String,
					required: [true, 'Todo description is required'],
				},
				completed: {
					type: Boolean,
					defaultValue: false,
				},
			},
			{
				timestamps: true,
			}
		)
	);
	return todoSchema;
};
