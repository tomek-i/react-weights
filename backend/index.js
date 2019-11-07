require('dotenv').config();
const debug = require('debug')('app:init');
require('./db/db'); //connect to db

const config = require('config');//
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');

//const _ = require('underscore');


const logger = require('./middleware/logger');
const dataRouter = require('./routes/data')

const app = express();


debug('Debug: '+ config.get('debug'));
debug('App name: '+ config.get('name'));
debug('Mail Server: '+ config.get('mail.host'));
debug('Mail Password: '+ config.get('mail.password'));


app.use(helmet());
app.use(express.json());
//app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

if(app.get('env') ==='development'){
    debug('Morgan HTTP logging middleware enabled ...');
    app.use(morgan('tiny'));

    debug('Custom logging middleware enabled ...');
    app.use(logger);//custom logger
};

app.use('/api/data',dataRouter);


app.get('/', (req, res) => {
  res.send('Hello World');
});





const port = process.env.PORT || 3000;
app.listen(port, () => {
    debug(`listening on port ${port} ...`);
});
