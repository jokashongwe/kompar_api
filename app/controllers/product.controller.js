const db = require("../models");
const Product = db.Product;
const Price = db.Price;

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "name can not be empty!" });
    return;
  }

  // Create a Product
  const product = new Product({ ...req.body });

  // Save Product in the database
  Product.create(product)
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
    let products = null;
    //return res.json({ id });
    if (id) {
      products = await Product.find({ _id: id });
      //products = [product];
    } else {
      let page = parseInt(_start / 25) + 1;
      products = await Product.find({})
        .limit(_end * 1)
        .skip((page - 1) * _end)
        .sort({ createdAt: -1 });
      res.set("Access-Control-Expose-Headers", "X-Total-Count");
      res.set("X-Total-Count", products.length);
      const count = await Product.countDocuments();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving Prices.",
    });
  }
};

exports.relatedPrices = async (req, res) => {
  try {
    const id = req.body.id;

    const count = await Product.countDocuments();
    const prices = await Product.find({ product: id })
      .limit(limit)
      .sort({ createdAt: 1 });
    res.set("Access-Control-Expose-Headers", "X-Total-Count");
    res.set("X-Total-Count", prices.length);
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving Prices.",
    });
  }
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Product with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Product with id=" + id });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
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
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
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

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
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
};

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
