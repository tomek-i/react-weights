const mongoose = require("mongoose");
const config = require("config"); //
const debug = require("debug")("app:db");

const dbname = config.get("db.name");
const dbhost = config.get("db.connection");

debug(`Using Database '${dbname}' at host '${dbhost}'`);

module.exports = async () => {
  try {
    await mongoose.connect(`${dbhost}/${dbname}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    debug("Connected to Database successfully.");
    debug("Loading models ..");
    require("../models");
  } catch (error) {
    debug("Connection error", error);
    process.exit(1);
  }
};
