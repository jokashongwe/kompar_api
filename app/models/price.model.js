module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        amount: Number,
        location_name: String,
        curreny: String,
        product: {type: mongoose.Types.ObjectId, ref: "products"}
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Price = mongoose.model("prices", schema);
    return Price;
  };
  