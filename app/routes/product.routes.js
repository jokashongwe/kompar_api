module.exports = (app) => {
  const products = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", products.create);

  // Retrieve all products
  router.get("/", products.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", products.findOne);

  router.get("/:id/prices", products.relatedPrices);

  // Update a Tutorial with id
  router.put("/:id", products.update);

  // Delete a Tutorial with id
  router.delete("/:id", products.delete);

  // Create a new Tutorial
  router.delete("/", products.deleteAll);

  app.use("/api/products", router);
};
