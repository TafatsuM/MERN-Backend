const customers = require("../controllers/db.controller.js");
let router = require("express").Router();

router.post("/", customers.create); // Create a new Collection
router.get("/", customers.findAll); // Retrieve all Collections
router.get("/:id", customers.findOne); // Retrieve a single Collection with id
router.put("/:id", customers.update); // Update a Collection with id
router.delete("/:id", customers.delete); // Delete a Collection with id
router.delete("/", customers.deleteAll); // Delete all Collections
 
module.exports = router;
