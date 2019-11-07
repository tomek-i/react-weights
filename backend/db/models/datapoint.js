const mongoose = require('mongoose')
const debug = require('debug')('app:model');

const dataPointSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    value: mongoose.Decimal128
});

const DataPoint = mongoose.model('DataPoint',dataPointSchema);

async function createDataPoint(){

    const date = new Date(2020,11,7);

    const dataPoint = new DataPoint({
        date: date,
        value:39.4
    })
    //const result = await dataPoint.save();
    //debug(`Created Data: ${result}`)
}

async function getDataPoints(){
    const courses = await DataPoint.find();
    console.log(courses);
}
//getDataPoints();
createDataPoint();

module.exports = DataPoint;