const mongoose = require("mongoose");
const Joi = require("Joi");
//const debug = require('debug')('app:model');

const dataPointSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  value: {
    type: mongoose.Decimal128,
    required: true,
    min: 40, //arbitrary min / max
    max: 99
  }
});

const DataPoint = mongoose.model("DataPoint", dataPointSchema);

function validateDataPoint(dataPoint) {
  const schema = {
    date: Joi.date().optional(),
    value: Joi.number()
      .positive()
      .precision(2)
      .min(40)
      .max(99)
      .required()
  };
  return Joi.validate(dataPoint, schema);
}

exports.DataPointModel = DataPoint;
exports.validate = validateDataPoint;
