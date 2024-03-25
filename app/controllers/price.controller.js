const db = require("../models");
const Price = db.Price;
const Product = db.Product;

// Create and Save a new Price
exports.create = (req, res) => {
  // Validate request
  if (!req.body.amount) {
    res.status(400).send({ message: "amount can not be empty!" });
    return;
  }
  /**
   * Find the related products
   */
  Product.findById(req.body.product_id)
    .then((product) => {
      if (!product) {
        res.status(404).send({ message: "Not found Product with id " + id });
      }
      // Create a Prices
      let price = new Price({ ...req.body, product: product });

      // Save Price in the database
      Price.create(price)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Price.",
          });
        });
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: "Error retrieving Product with id=" + id });
    });
};

// Retrieve all Prices from the database.
exports.findAll = (req, res) => {
  const location_name = req.query.location_name;
  var condition = location_name
    ? { location_name: { $regex: new RegExp(location_name), $options: "i" } }
    : {};

  Price.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Prices.",
      });
    });
};

// Find a single Price with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Price.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Price with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Price with id=" + id });
    });
};

// Update a Price by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Price.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Price with id=${id}. Maybe Price was not found!`,
        });
      } else res.send({ message: "Price was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Price with id=" + id,
      });
    });
};

// Delete a Price with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Price.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Price with id=${id}. Maybe Price was not found!`,
        });
      } else {
        res.send({
          message: "Price was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Price with id=" + id,
      });
    });
};

// Delete all Prices from the database.
exports.deleteAll = (req, res) => {
  Price.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Prices were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Prices.",
      });
    });
};

exports.findFiltered = (req, res) => {
  const { name, query } = req.query;
  let condition = {};
  condition[name] = query;
  if (!name || !query) {
    res.status(400).send({ message: "name or query can not be empty!" });
    return;
  }
  Price.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Price.",
      });
    });
};
