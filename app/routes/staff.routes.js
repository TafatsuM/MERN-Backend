const staff = require("../controllers/staff.controller.js");
let routerStaff = require("express").Router();

routerStaff.post("/", staff.create); // Create a new Collection
routerStaff.get("/", staff.findAll); // Retrieve all Collections
routerStaff.get("/:id", staff.findOne); // Retrieve a single Collection with id
routerStaff.put("/:id", staff.update); // Update a Collection with id
routerStaff.delete("/:id", staff.delete); // Delete a Collection with id
routerStaff.delete("/", staff.deleteAll); // Delete all Collections

module.exports = routerStaff;
