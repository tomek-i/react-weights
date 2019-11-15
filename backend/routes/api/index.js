var router = require("express").Router();

// url: api/*

router.use("/data", require("./data"));

//router.use("/profiles", require("./profiles"));

module.exports = router;
