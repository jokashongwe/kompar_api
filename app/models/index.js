const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false)

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.Product = require("./product.model.js")(mongoose);
db.Price = require("./price.model.js")(mongoose);
db.Basket = require("./basket.model.js")(mongoose);
db.UserRole = require("./role.model.js")(mongoose);
db.User = require("./user.model.js")(mongoose);
db.Province = require("./province.model.js")(mongoose);
db.City = require("./city.model.js")(mongoose);
db.MarketPlace = require("./marketplace.model.js")(mongoose);
db.Task = require("./task.model.js")(mongoose);
db.Submission = require("./submission.model.js")(mongoose);

module.exports = db;
