var Userdb = require("../model/model");

//create and save new user

exports.create = (req, res) => {
  //validate request

  if (!req.body) {
    res.status(400).send({ message: "No content found" });
    return;
  }

  //new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  //save user in DB
  user
    .save(user)
    .then((data) => {
      //res.send(data);
      res.redirect("/add-user");
    })
    .catch((err) => {
      res.status(500);
      message: err.message || "Some error occured while adding the user";
    });
};

//retrieve and return all/single user/s

exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "User not found" });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error Fetching User" });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error occured while retriving information",
        });
      });
  }
};

//update new user by id

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "No Data Found to Update" });
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "User not found" });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error while updating user" });
    });
};

//delete user by id

exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Cannot delete the selected user" });
      } else {
        res.send({
          message: "User deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "User could not be deleted",
      });
    });
};
