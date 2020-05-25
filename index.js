require('dotenv').config();
const debug = require('debug')('app:init');
const config = require('config'); //
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const path = require('path')
const cors = require('cors');

//const _ = require('underscore');

const logger = require('./middleware/logger');
const dataRouter = require('./routes/data');
const connectDB = require('./db/db'); //connect to db

const app = express();
//Connect to DB
connectDB();

debug('Debug Namespaces: ' + config.get('debug'));
debug('App name: ' + config.get('name'));
debug('Mail Server: ' + config.get('mail.host'));
debug('Mail Password: ' + config.get('mail.password'));

// Set up a whitelist and check against it:
var whitelist = [
  'http://localhost:5000',
  'http://localhost:3001',
  'http://localhost:3001/api/data'
];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client/build')))
app.use(express.static('public'));

if (app.get('env') === 'development') {
  debug('Morgan HTTP logging middleware enabled ...');
  app.use(morgan('tiny'));

  debug('Custom logging middleware enabled ...');
  app.use(logger); //custom logger
}

app.use('/api/data', dataRouter);

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
  debug(`listening on port ${port} ...`);
});
