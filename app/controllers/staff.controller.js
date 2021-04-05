const Staff = require("../models/staff.model");

exports.create = (req, res) => {
  console.log("create methodu çalıştı");
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Home
  const staff = new Staff({
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    position:req.body.position,
    department:req.body.department,
    jobTitle: req.body.jobTitle,
    additionalInfo: req.body.additionalInfo,
    isActive: req.body.isActive
  });

  // Save Home in the database
  staff
    .save(staff)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Staff.",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

    Staff.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving staffs.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Staff.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Staff with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Staff with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  Staff.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Staff with id=${id}. Maybe Staff was not found!`,
        });
      } else res.send({ message: "Staff was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Staff with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Staff.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Staff with id=${id}. Maybe Staff was not found!`,
        });
      } else {
        res.send({
          message: "Staff was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Staff with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Staff.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Staff were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all staffs.",
      });
    });
};
