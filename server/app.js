const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const helmet = require('helmet');
const compression = require('compression');
const { rateLimit } = require('express-rate-limit');

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

const app = express();
app.set('trust proxy', 1);
app.get('/ip', (request, response) => response.send(request.ip));

// Set up mongoose connection.
mongoose.set('strictQuery', false);

const mongoDB = process.env.PRODDB_URI || process.env.DEVDB_URI;
main().catch((err) => {
	console.log(err);
});
async function main() {
	await mongoose.connect(mongoDB);
}

// Apply rate limiter to all requests.
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 20,
});

app.use(limiter);
app.use(helmet());
app.use(compression());
app.use(
	cors({
		origin: [`${process.env.FRONT_URL}`, 'http://localhost:5173'],
		credentials: true,
		exposedHeaders: ['set-cookie'],
	})
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/post', postsRouter);
app.use('/api/user', usersRouter);
app.use('/api/comment', commentsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.sendStatus(err.status || 500);
});

module.exports = app;
