module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        commune: String,
        ville: String,
        province: String,
        products: [String],
        total: Number,
        progress: Number
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Price = mongoose.model("baskets", schema);
    return Price;
  };
  