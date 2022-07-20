const mongoose = require("mongoose");
const config = require("config"); //
const debug = require("debug")("app:db");

const dbname = config.get("db.name");
const dbhost = config.get("db.connection");

debug(`Using Database '${dbname}' at host '${dbhost}'`);

const connectDB = async () => {
  try {
    await mongoose.connect(`${dbhost}/${dbname}`, { useUnifiedTopology: true,useNewUrlParser: true });
    debug('Connected to Database successfully.');
  } catch (error) {
    debug("Connection error", error);
    process.exit(1);
  }
};

module.exports = connectDB;
