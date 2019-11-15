var router = require("express").Router();

router.use("/api", require("./api"));
//router.use("/auth", require("./api/auth.js"));

router.get("/", (req, res) => {
  res.send("Hi");
});

module.exports = router;
