const db = require("../models");
const Province = db.Province;

// Create and Save a new Product
exports.create = (req, res) => {
  // Create a Product
  const { lat, lng } = req.body;
  delete req.body.lat;
  delete req.body.lng;
  const province = new Province({ ...req.body, location: { lat, lng } });

  // Save Product in the database
  Province.create(province)
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
    let provinces = null;
    //return res.json({ id });
    if (id) {
      provinces = await Province.find({ _id: id });
      //products = [product];
    } else {
      let page = parseInt(_start / 25) + 1;
      provinces = await Province.find({})
        .limit(_end * 1)
        .skip((page - 1) * _end)
        .sort({ createdAt: -1 });
      res.set("Access-Control-Expose-Headers", "X-Total-Count");
      res.set("X-Total-Count", provinces.length);
      //const count = await provinces.countDocuments();
    }
    res.status(200).json(provinces);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving Prices.",
    });
  }
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Province.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found provinces with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving provinces with id=" + id });
    });
};

// Update a provinces by the id in the request
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

  Province.findByIdAndUpdate(
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

  Province.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete provinces with id=${id}. Maybe Product was not found!`,
        });
      } else {
        res.send({
          message: "provinces was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete provinces with id=" + id,
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