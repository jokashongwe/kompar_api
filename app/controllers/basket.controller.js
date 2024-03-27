const db = require("../models");
const Price = db.Price;
const Product = db.Product;
const Basket = db.Basket;

// Create and Save a new Price
exports.create = (req, res) => {
  /**
   * Find the related products
   */
  Product.find({ _id: req.body.products })
    .then((products) => {
      if (!products) {
        res.status(404).send({ message: "Not found Product with IDS " });
      }
      // Create a Prices
      let basket = new Basket({ ...req.body, products: req.body.products });

      // Save Price in the database
      Basket.create(basket)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Basket.",
          });
        });
    })
    .catch((error) => {
      res
        .status(500)
        .send({
          message: error.message,
        });
    });
};

// Retrieve all Prices from the database.
exports.findAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, id, products } = req.query;

    const count = await Basket.countDocuments();
    let baskets = [];
    if (products) {
        baskets = await Basket.find({ products }).sort({ createdAt: 1 });
    } else if (id) {
        baskets = await Basket.findById(id);
    } else {
        baskets = await Basket.find({}).sort({ createdAt: -1 });
    }
    res.set("Access-Control-Expose-Headers", "X-Total-Count");
    res.set("X-Total-Count", baskets.length);
    res.status(200).json(baskets);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving Prices.",
    });
  }
};

// Find a single Price with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Basket.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Basket with id " + id });
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

  Basket.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Price with id=${id}. Maybe Price was not found!`,
        });
      } else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Delete a Price with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Basket.findByIdAndRemove(id, { useFindAndModify: false })
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
        message: err.message,
      });
    });
};

// Delete all Prices from the database.
exports.deleteAll = (req, res) => {
 Basket.deleteMany({})
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
