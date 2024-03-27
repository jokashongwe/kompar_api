const db = require("../models");
const Price = db.Price;
const Product = db.Product;
const Basket = db.Basket;
const User = db.User;

exports.findAll = async (req, res) => {
  try {
    const countBaskets = await Basket.countDocuments();
    const countPrices = await Price.countDocuments();
    const countProducts = await Product.countDocuments();
    const countUsers = await User.countDocuments();
    /**
     * Panier, Produits, Prix par province/ville, commune du panier
     */

    let baskets = await Basket.find({});
    let rest = [];
    for (let index = 0; index < baskets.length; index++) {
      let element = baskets[index];
      const resProducts = await Product.find({ _id: element.products });
      let products = [];
      resProducts.forEach((element) => {
        products.push(element.toJSON());
      });
      //baskets[index]["products"] = products;
      const condition = element.commune
        ? {
            product: element.products,
            province: element.province,
            ville: element.province,
            commune: element.commune,
          }
        : {
            product: element.products,
            province: element.province,
            ville: element.province,
          };
      const resPrices = await Price.find(condition);
      let prices = [];
      let totalAmount = 0;
      resPrices.forEach((element) => {
        prices.push(element.toJSON());
        totalAmount += element.amount;
      });
      //baskets[index]["prices"] = prices;
      let newItem = {
        ...element.toJSON(),
        products,
        prices,
        total: totalAmount
      };
      rest.push(newItem);
    }

    //res.set("Access-Control-Expose-Headers", "X-Total-Count");
    //res.set("X-Total-Count", baskets.length);
    res.status(200).json({
      counts: {
        baskets: countBaskets,
        prices: countPrices,
        products: countProducts,
        users: countUsers,
      },
      baskets: rest,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving Prices.",
    });
  }
};
