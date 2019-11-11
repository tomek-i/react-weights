const mongoose = require('mongoose');
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

module.exports = DataPoint;
