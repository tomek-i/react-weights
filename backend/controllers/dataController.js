const debug = require("debug")("controller:data");
const { DataPointModel, validate } = require("../models/datapoint");

exports.create = async (req, res, next) => {
  const { error } = validate(req.body);

  if (error) {
    // respond back with '400 Bad Request' with error details
    //return res.status(400).send(error.details[0].message);
    next(error);
    return;
  }

  let obj = {
    value: req.body.value
  };

  if (!req.body.date) {
    debug("No date submitted.");
  } else {
    debug(`Request body date: ${req.body.date}`);
    obj.date = new Date(req.body.date);
  }

  const dataPoint = new DataPoint(obj);

  dataPoint
    .save()
    .then(result => {
      debug(`Saved to database: ${result}`);
      res.send(result);
    })
    .catch(err => {
      debug("Error while saving to database.", err);
      next(err);
    });
};

exports.index = async (req, res, next) => {
  DataPointModel.find()
    .then(result => res.send(result))
    .catch(err => {
      debug("Error while retrieving data.", err);
      next(err);
    });
};
