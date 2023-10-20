const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { myCustomLabels } = require("../helpers/common");
const Schema = mongoose.Schema;

mongoosePaginate.paginate.options = {
  customLabels: myCustomLabels,
};
const productModel = new Schema({
  event_name: {
    type: String,
    required: true,
  },
  event_title: {
    type: String,
    required: true,
  },
  event_description: {
    type: String,
    required: true,
  },
  images: [
    {
      filename: String,
      path: String,
    },
  ],
  event_location: {
    type: String,
    required: true,
  },
  event_date: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

productModel.plugin(mongoosePaginate);

const Product = mongoose.model("Product", productModel);
module.exports = Product;
