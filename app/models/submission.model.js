module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        task: {type: mongoose.Types.ObjectId, ref: "products"},
        location: Object,
        province: String,
        ville: String,
        commune: String,
        price: Number,
        user: {type: mongoose.Types.ObjectId, ref: "users"}
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const UserRoles = mongoose.model("submissions", schema);
    return UserRoles;
  };
  