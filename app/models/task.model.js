module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        product: {type: mongoose.Types.ObjectId, ref: "products"},
        marketplace: {type: mongoose.Types.ObjectId, ref: "markets"},
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const UserRoles = mongoose.model("tasks", schema);
    return UserRoles;
  };
  