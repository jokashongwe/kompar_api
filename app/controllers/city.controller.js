const db = require("../models");
const City = db.City;

// Create and Save a new Product
exports.create = (req, res) => {
  // Create a Product
  const { lat, lng } = req.body;
  delete req.body.lat;
  delete req.body.lng;
  const city = new City({ ...req.body, location: { lat, lng } });

  // Save Product in the database
  City.create(city)
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
    let cities = null;
    //return res.json({ id });
    if (id) {
      cities = await City.find({ _id: id });
      //products = [product];
    } else {
      let page = parseInt(_start / 25) + 1;
      cities = await City.find({})
        .limit(_end * 1)
        .skip((page - 1) * _end)
        .sort({ createdAt: -1 });
      res.set("Access-Control-Expose-Headers", "X-Total-Count");
      res.set("X-Total-Count", cities.length);
      //const count = await cities.countDocuments();
    }
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving Prices.",
    });
  }
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  City.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found cities with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving cities with id=" + id });
    });
};

// Update a cities by the id in the request
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

  City.findByIdAndUpdate(
    id,
    { ...req.body, location: { lat, lng } },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update cities with id=${id}. Maybe Product was not found!`,
        });
      } else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating cities with id=" + id,
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  City.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete cities with id=${id}. Maybe Product was not found!`,
        });
      } else {
        res.send({
          message: "cities was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete cities with id=" + id,
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
