module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        marque: String,
        model: String,
        conteneur: String,
        progress: Number
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Product = mongoose.model("products", schema);
    return Product;
  };
  