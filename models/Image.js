const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ImageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Image = mongoose.model("image", ImageSchema);
