const express = require('express')
const router= express.Router();
const Joi = require('joi');
const DataPoint = require('../db/models/datapoint')
const debug = require('debug')('app:crud');


router.get('/', (req, res) => {
    DataPoint.find().then(result=> res.send(result));
});

router.post('/',(req,res) => {
    //object deconstructing, same as `const result = validateDataPoint(req.body);` and then calling/using `result.error`
    const { error } = validateDataPoint(req.body);

    if(error) {
        // respond back with '400 Bad Request' with error details
        return res.status(400).send(error.details[0].message);
    }

    let obj = {
        value:req.body.value
    };

    if(!req.body.date){
        debug("No date submitted.");
    }else{
        debug(`Request body date: ${req.body.date}`)
        obj.date = new Date(req.body.date);
    }
    // parse the date and/or create a new Date() object
    //const date = new Date(req.body.date || defaultDate)

    const dataPoint = new DataPoint(obj);

    dataPoint.save().then(result=>{
        debug(`Saved to database: ${result}`);
        res.send(result);
    });
});


function validateDataPoint(dataPoint) {
    const schema = {
        date:Joi.date().optional(),
        value:Joi.number().positive().precision(2).required(),
    }
    return Joi.validate(dataPoint,schema);
}




router.get('/:year/:month', (req, res) => {

    DataPoint.find({
        date: {
            $gte: new Date(req.params.year, req.params.month, 1),
            $lt: new Date(req.params.year, req.params.month+1, 1)
        }
    }).then(result=>{
        res.send(result);
    });


});

router.get('/:year', (req, res) => {

    DataPoint.find({
        date: {
            $gte: new Date(req.params.year, 1, 1),
            $lt: new Date(req.params.year+1, 1, 1)
        }
    }).then(result=>{
        res.send(result);
    });

});


module.exports = router;

/* NOT REQUIRED/IMPLEMENTED, FOR REFERENCE
router.delete('/:id',(req,res) => {
    const dataPoint = dataPoints.find(c=> c.id === parseInt(req.params.id));

    if(!dataPoint) {
        return res.status(404).send('No data point with that ID was found.');
    }

    const index = dataPoints.indexOf(dataPoint);
    dataPoints.splice(index,1);

    res.send(dataPoint);
});



*/
