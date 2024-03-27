module.exports = app => {
    const tasks = require("../controllers/task.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Basket
    router.post("/", tasks.create);
  
    // Retrieve all tasks
    router.get("/", tasks.findAll);  
  
    // Retrieve a single Basket with id
    router.get("/:id", tasks.findOne);
  
    // Update a Basket with id
    router.put("/:id", tasks.update);
  
    // Delete a Basket with id
    router.delete("/:id", tasks.delete);
  
  
    app.use("/api/tasks", router);
  };
  