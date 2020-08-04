const debug = require('debug')('app:startup');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const authentication = require('./middleware/authentication');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/courses', courses);
app.use('/', home);

if(app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug(app.get('env') );
}

app.set('view engine', 'pug');
app.set('views', './views'); //default

app.listen('3000', () => console.log('listening...'));

