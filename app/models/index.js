const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.Product = require("./product.model.js")(mongoose);
db.Price = require("./price.model.js")(mongoose);
db.Basket = require("./basket.model.js")(mongoose);

module.exports = db;
