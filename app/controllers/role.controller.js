const db = require("../models");
const UserRole = db.UserRole;

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "name can not be empty!" });
    return;
  }

  // Create a Product
  const role = new UserRole({ ...req.body });

  // Save Product in the database
  UserRole.create(role)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product.",
      });
    });
};

// Retrieve all Products from the database.
exports.findAll = async (req, res) => {
  try {
    const { _start = 0, _end = 10, id } = req.query;
    let roles = null;
    //return res.json({ id });
    if (id) {
      roles = await UserRole.find({ _id: id });
      //products = [product];
    } else {
      let page = parseInt(_start / 25) + 1;
      roles = await UserRole.find({})
        .limit(_end * 1)
        .skip((page - 1) * _end)
        .sort({ createdAt: -1 });
      res.set("Access-Control-Expose-Headers", "X-Total-Count");
      res.set("X-Total-Count", roles.length);
      //const count = await UserRole.countDocuments();
    }
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving Prices.",
    });
  }
};


// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  UserRole.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found UserRole with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving UserRole with id=" + id });
    });
};

// Update a Product by the id in the request
/* exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`,
        });
      } else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Product with id=" + id,
      });
    });
}; */

// Delete a Product with the specified id in the request
/* exports.delete = (req, res) => {
  const id = req.params.id;

  Product.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
        });
      } else {
        res.send({
          message: "Product was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id,
      });
    });
};
 */
// Delete all Products from the database.
/* exports.deleteAll = (req, res) => {
  Product.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Products were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products.",
      });
    });
}; */

/* // Find all published Products
exports.findAllPublished = (req, res) => {
  Product.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products."
      });
    });
};
 */
