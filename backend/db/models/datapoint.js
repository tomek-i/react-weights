const mongoose = require('mongoose')
const debug = require('debug')('app:model');

const dataPointSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    value: mongoose.Decimal128
});

const DataPoint = mongoose.model('DataPoint',dataPointSchema);

async function createDataPoint(){
    const dataPoint = new DataPoint({
        date:new Date().toLocaleDateString(),
        value:99.4
    })
    const result = await dataPoint.save();
    debug(`Created Data: ${result}`)
}

async function getDataPoints(){
    await DataPoint.find();
}
getDataPoints();
//createDataPoint();

module.exports = DataPoint;