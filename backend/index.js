// app.js

/**
 * Required External Modules
 */
require("dotenv").config();
const debug = require("debug")("app:init");
const config = require("config"); //
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");

/**
 * App Variables
 */

const app = express();

<<<<<<< Updated upstream
//Connect to DB
connectDB();

debug('Debug: ' + config.get('debug'));
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
=======
debug("Debug: " + config.get("debug"));
debug("App name: " + config.get("name"));
debug("Mail Server: " + config.get("mail.host"));
debug("Mail Password: " + config.get("mail.password"));
>>>>>>> Stashed changes

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

if (app.get("env") === "development") {
  debug("Morgan HTTP logging middleware enabled ...");
  app.use(morgan("debug"));
}

/**
 * Database Activation
 */
const db = require("./database/db"); //connect to db
db().catch(err => {
  debug("Unable to connect to database.", err);
  process.exit(1);
});

/**
 * Routes
 */
app.use(require("./routes"));

/**
 * Server
 */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  debug(`listening on port ${port} ...`);
});
