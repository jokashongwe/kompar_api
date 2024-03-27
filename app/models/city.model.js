module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        tarification: Number,
        location: Object,
        population: Number,
        province: {type: mongoose.Types.ObjectId, ref: "provinces"},
        communes: [String]
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const UserRoles = mongoose.model("cities", schema);
    return UserRoles;
  };
  