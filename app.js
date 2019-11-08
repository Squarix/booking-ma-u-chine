const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter  = require('./routes/auth');
const roomsRouter = require('./routes/rooms');
const rentsRouter = require('./routes/rents');

const bookingsRouter   = require('./routes/bookings');
const countriesRouter = require('./routes/countries');

const app = express();

app.use(logger('dev'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/rooms', roomsRouter);
app.use('/countries', countriesRouter);
app.use('/bookings', bookingsRouter);
app.use('/rents', rentsRouter);

module.exports = app;
