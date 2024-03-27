module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        username: String,
        password: String,
        roles: [String],
        email: String,
        phone: String,
        picture: String,
        first_name: String,
        last_name: String,
        card_no: String,
        card_picture: String,
        address: String,
        province: String,
        ville: String,
        commune: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      object.password = null; //master le password
      return object;
    });
  
    const User = mongoose.model("users", schema);
    return User;
  };
  