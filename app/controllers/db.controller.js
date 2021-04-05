const Customer = require("../models/customer.model");

exports.create = (req, res) => {
  console.log("create methodu çalıştı");
  //console.log(req.body);
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  } 

    // Create a Home
    const customer = new Customer({
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone || null,
    city:req.body.city || null,
    country:req.body.country || null,
    itemsSold:req.body.itemsSold || null,
    jobProfile: req.body.jobProfile || null,
    additionalInfo: req.body.additionalInfo || null,
    isActive: req.body.isActive || true
  });

  // Save Home in the database
  customer
    .save(customer)
    .then((data) => {
      res.send({ user:data, message: "User was registered successfully!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Customer.",
      });
    });
  
  };
  
  exports.findAll = (req, res) => {
    //console.log(req.query)
    const name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

    Customer.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving customers.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
console.log("getone çalıştı", id)
  Customer.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Customer with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Customer with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  console.log("update çalıştı", req.body);
  const id = req.params.id;
  console.log(id)
  Customer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Customer with id=${id}. Maybe Customer was not found!`,
        });
      } else res.send({ message: "Customer was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Customer with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
console.log(req.params.id, "delete çalıştı")
  Customer.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`,
        });
      } else {
        res.send({
          message: "Customer was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Customer with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Customer.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Customer were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all customers.",
      });
    });
};
