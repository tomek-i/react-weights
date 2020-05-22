const express = require('express');
const debug = require('debug')('app:crud');
const { DataPoint, validate } = require('../db/models/datapoint');
const router = express.Router();

//TODO: for readability maybe split the routes from the logic (controller?) to read: router.get('/', Controller.GET), router.post('/', Controller.POST), router.get('/:year', Controller.ByYear)

router.get('/', (req, res) => {
  DataPoint.find()
    .then(result => 
      {
        debug("Data: "+ result);
        res.send(result);
      })
    .catch(err => debug('Error while retrieving data.', err));
});

router.post('/', (req, res) => {
  const { error } = validate(req.body);
  debug(req.body)
  if (error) {
    // respond back with '400 Bad Request' with error details
    return res.status(400).send(error.details[0].message);
  }

  let obj = {
    value: req.body.value
  };

  if (!req.body.date) {
    debug('No date submitted.');
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
    .catch(err => debug('Error while saving to database.', err));
});

router.get('/:year/:month', (req, res) => {
  DataPoint.find({
    date: {
      $gte: new Date(req.params.year, req.params.month, 1),
      $lt: new Date(req.params.year, req.params.month + 1, 1)
    }
  }).then(result => {
    res.send(result);
  });
});

router.get('/:year', (req, res) => {
  DataPoint.find({
    date: {
      $gte: new Date(req.params.year, 1, 1),
      $lt: new Date(req.params.year + 1, 1, 1)
    }
  }).then(result => {
    res.send(result);
  });
});

module.exports = router;
