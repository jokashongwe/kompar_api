module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        location: Object,
        population: Number,
        province: String,
        ville: String,
        commune: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const UserRoles = mongoose.model("markets", schema);
    return UserRoles;
  };
  