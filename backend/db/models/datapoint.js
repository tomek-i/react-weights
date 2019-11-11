const mongoose = require('mongoose')
//const debug = require('debug')('app:model');

const dataPointSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    value: mongoose.Decimal128
});

const DataPoint = mongoose.model('DataPoint',dataPointSchema);



module.exports = DataPoint;