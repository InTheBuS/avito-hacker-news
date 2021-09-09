const express = require('express');

const PORT = '8080';

const app = express();

app.listen(PORT, () => console.log('project started on port', PORT))
app.get('/', (req, res) => {
	res.status(200).json({FORM_ITEMS: {first: 'first', second: 'second'}})
})

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});