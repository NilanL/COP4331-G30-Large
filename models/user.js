const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  FirstName: {
    type: String
  },
  LastName: {
    type: String
  },
  Username: {
    type: String,
    required: true
  },
  Phone: {
    type: String
  },
  Email: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  Verified: {
    type: Boolean,
    required: true
  },
  NewUser: {
    type: Boolean,
    required: true
  }
});

module.exports = User = mongoose.model("user", UserSchema);