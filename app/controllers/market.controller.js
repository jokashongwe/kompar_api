const db = require("../models");
const MarketPlace = db.MarketPlace;

// Create and Save a new Product
exports.create = (req, res) => {
  // Create a Product
  const { lat, lng } = req.body;
  const market = new MarketPlace({ ...req.body, location: { lat, lng } });

  // Save Product in the database
  MarketPlace.create(market)
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
    let markets = null;
    //return res.json({ id });
    if (id) {
      markets = await MarketPlace.find({ _id: id });
      //products = [product];
    } else {
      let page = parseInt(_start / 25) + 1;
      markets = await MarketPlace.find({})
        .limit(_end * 1)
        .skip((page - 1) * _end)
        .sort({ createdAt: -1 });
      res.set("Access-Control-Expose-Headers", "X-Total-Count");
      res.set("X-Total-Count", markets.length);
      //const count = await markets.countDocuments();
    }
    res.status(200).json(markets);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving Prices.",
    });
  }
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  MarketPlace.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found markets with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving markets with id=" + id });
    });
};

// Update a markets by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  const { lat, lng } = req.body;
  delete req.body.lat;
  delete req.body.lng;

  MarketPlace.findByIdAndUpdate(
    id,
    { ...req.body, location: { lat, lng } },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update provinces with id=${id}. Maybe Product was not found!`,
        });
      } else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating provinces with id=" + id,
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  MarketPlace.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete markets with id=${id}. Maybe Product was not found!`,
        });
      } else {
        res.send({
          message: "markets was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete markets with id=" + id,
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
