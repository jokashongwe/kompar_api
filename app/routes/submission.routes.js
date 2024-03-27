module.exports = app => {
    const submissions = require("../controllers/submission.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Basket
    router.post("/", submissions.create);
  
    // Retrieve all submissions
    router.get("/", submissions.findAll);  
  
    // Retrieve a single Basket with id
    router.get("/:id", submissions.findOne);
  
    // Update a Basket with id
    router.put("/:id", submissions.update);
  
    // Delete a Basket with id
    router.delete("/:id", submissions.delete);
  
  
    app.use("/api/submissions", router);
  };
  