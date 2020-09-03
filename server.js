if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const homeRouter = require('./routes/home');
const quotationRouter = require('./routes/quotation');
const contactRouter = require('./routes/contact');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(helmet());

app.use(cookieParser());

app.use(expressLayouts);
app.use(express.static('public'));

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true,  useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log("DB Connected"));

app.use('/', homeRouter);
app.use('/quotation', quotationRouter);
app.use('/contact', contactRouter);

app.listen(process.env.PORT || 12555);