const db = require("../models");
const Submission = db.Submission;

// Create and Save a new Product
exports.create = (req, res) => {
  // Create a Product
  const submission = new Submission({ ...req.body });

  // Save Product in the database
  Submission.create(submission)
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
    let submissions = null;
    //return res.json({ id });
    if (id) {
        submissions = await Submission.find({ _id: id });
      //products = [product];
    } else {
      let page = parseInt(_start / 25) + 1;
      submissions = await Submission.find({})
        .limit(_end * 1)
        .skip((page - 1) * _end)
        .sort({ createdAt: -1 });
      res.set("Access-Control-Expose-Headers", "X-Total-Count");
      res.set("X-Total-Count", submissions.length);
      //const count = await submissions.countDocuments();
    }
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving Prices.",
    });
  }
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Submission.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found submissions with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving submissions with id=" + id });
    });
};

// Update a submissions by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Submission.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update submissions with id=${id}. Maybe Product was not found!`,
        });
      } else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating submissions with id=" + id,
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Submission.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete submissions with id=${id}. Maybe Product was not found!`,
        });
      } else {
        res.send({
          message: "submissions was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete submissions with id=" + id,
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
