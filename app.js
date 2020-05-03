import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import logger from "morgan";
import cors from "cors";
import { sequelize } from "./models";
import passport from './lib/authentication';


import indexRouter from "./routes";
import usersRouter from "./routes/users";
import authRouter from "./routes/auth";
import roomsRouter from "./routes/rooms";
import rentsRouter from "./routes/rents";
import searchRouter from "./routes/search";
import adminRouter from "./routes/admin";
import bookingsRouter from "./routes/bookings";
import countriesRouter from "./routes/countries";

sequelize.sync();

const app = express();

// app.use(logger('dev'));

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/rooms', roomsRouter);
app.use('/countries', countriesRouter);
app.use('/bookings', bookingsRouter);
app.use('/rents', rentsRouter);
app.use('/admin', adminRouter);
app.use('/search', searchRouter);

app.listen(3000);
