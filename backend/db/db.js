const mongoose = require('mongoose')
const config = require('config');//
const debug = require('debug')('app:db');

const dbname = config.get('db.name')
const dbhost = config.get('db.connection')

debug(`Using Database '${dbname}' at host '${dbhost}'`)

mongoose.connect(`${dbhost}/${dbname}`)
    .then(() => debug('Connected to Database successfully.'))
    .catch(err => {console.error('Could not connect to MongoDB.',err);debug('Connection error',err)});
