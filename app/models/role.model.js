module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        description: String,
        action: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const UserRoles = mongoose.model("user_roles", schema);
    return UserRoles;
  };
  