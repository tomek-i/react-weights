const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
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

const DataPoint = mongoose.model('DataPoint', dataPointSchema);

function validateDataPoint(dataPoint) {
  const schema = Joi.object({
    date: Joi.date().optional(),
    value: Joi.number()
      .positive()
      .precision(2)
      .min(40)
      .max(99)
      .required()
  });
  return schema.validate(dataPoint);
}

exports.DataPoint = DataPoint;
exports.validate = validateDataPoint;
