const express = require('express')
const router= express.Router();
const Joi = require('joi');
const DataPoint = require('../db/models/datapoint')
const debug = require('debug')('app:crud');
// demo data points - will come from database
const dataPoints = [
    {
        id: 1,
        date:'05/11/2019',
        value:91
    },
    {
        id: 2,
        date:'06/11/2019',
        value:89
    },
    {
        id: 3,
        date:'07/11/2019',
        value:87
    },
];

router.get('/', (req, res) => {
    res.send(dataPoints);
});

router.get('/:id', (req, res) => {

      const dataPoint = dataPoints.find(c=> c.id === parseInt(req.params.id));

      if(!dataPoint) {
          res.status(404).send('No data point with that ID was found.');
      }

      res.send(dataPoint);
  });

  router.get('/:year/:month', (req, res) => {
      res.send(req.params);
});


router.put('/:id',(req,res) => {
    const dataPoint = dataPoints.find(c=> c.id === parseInt(req.params.id));

    if(!dataPoint) {
          return res.status(404).send('No data point with that ID was found.');
      }

     //object deconstructing, same as `const result = validateDataPoint(req.body);` and then calling/using `result.error`
     const { error } = validateDataPoint(req.body);

     if(error) {
          return res.status(400).send(error.details[0].message);
      }

      dataPoint.value = req.body.value;
      dataPoint.date = new Date(req.body.date || new Date(dataPoint.date).toLocaleDateString()).toLocaleDateString();

      res.send(dataPoint);
});

router.post('/',(req,res) => {

      //object deconstructing, same as `const result = validateDataPoint(req.body);` and then calling/using `result.error`
      const { error } = validateDataPoint(req.body);

      if(error) {
          // respond back with '400 Bad Request' with error details
          return res.status(400).send(error.details[0].message);
      }

      // parse the date and/or create a new Date() object
      const date = new Date(req.body.date || new Date().toLocaleDateString())

      const dataPoint = new DataPoint({
          date: date.toLocaleDateString(),
          value:req.body.value
      });

      dataPoint.save().then(result=>{
          debug(`Saved to database: ${result}`);
          res.send(result);
      });




});


router.delete('/:id',(req,res) => {
      const dataPoint = dataPoints.find(c=> c.id === parseInt(req.params.id));

      if(!dataPoint) {
          return res.status(404).send('No data point with that ID was found.');
      }

      const index = dataPoints.indexOf(dataPoint);
      dataPoints.splice(index,1);

      res.send(dataPoint);
});

function validateDataPoint(dataPoint) {
      const schema = {
          date:Joi.date().optional(),
          value:Joi.number().positive().precision(2).required(),
      }
      return Joi.validate(dataPoint,schema);
}

module.exports = router;