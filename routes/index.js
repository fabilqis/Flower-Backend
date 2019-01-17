const Models = require("../models/index").Models;
module.exports = app => {
  app.get("/", (req, res) => {
    res.send("This is Flower API");
  });

  app.get("/index", (req, res) => {
    Models.find({}, (err, flower) => {
      if (err) return res.send(err);
      res.json(flower);
    })
  });

  app.post("/index/add", (req, res) => {
    Models.findOne({ name: req.body.name }, (err, flower) => {
      if (!flower) {
        const flower = new Models();
        flower.name = req.body.name;
        flower.description = req.body.description;

        if (flower.name) {
          flower.save((err, flower) => {
            if (err) return res.send(err);
            res.json({
              status: "Flower added",
              data: flower
            });
          });
        } else {
          res.status(400).send("Please add Flower Name");
        }
      } else {
        res.status(400).send("This flower name is taken");
      }
    });
  });

  app.post("/index/delete", (req, res) => {
    Models.findById(req.body.id, (err, flower) => {
      console.log(flower);
      if (flower) {
        flower.remove(err => {
          if (err) return res.send(err);
          res.json({ status: "Flower deleted" });
        });
      } else {
        res.status(400).send("Invalid flower id");
      }
    });
  });

};