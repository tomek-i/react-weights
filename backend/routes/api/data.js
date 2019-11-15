const express = require("express");
const { DataPoint } = require("../../models/datapoint");
const router = express.Router();
const controller = require("../../controllers/dataController");
//TODO: for readability maybe split the routes from the logic (controller?) to read: router.get('/', Controller.GET), router.post('/', Controller.POST), router.get('/:year', Controller.ByYear)

router.get("/", controller.index);

router.post("/", controller.create);

router.get("/:year/:month", (req, res) => {
  DataPoint.find({
    date: {
      $gte: new Date(req.params.year, req.params.month, 1),
      $lt: new Date(req.params.year, req.params.month + 1, 1)
    }
  }).then(result => {
    res.send(result);
  });
});

router.get("/:year", (req, res) => {
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
