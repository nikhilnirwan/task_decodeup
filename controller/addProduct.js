const catchAsync = require("../utils/catchAsync");
const Product = require("../model/productModel");
const multer = require("multer");
const util = require("../utils/message");

// multer diskStorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}_${file.originalname}`);
  },
});

exports.upload = multer({ storage: storage });

// add product
exports.addProduct = catchAsync(async (req, res, next) => {
  const user = req.user;
  const { event_name, event_title, event_description, event_location } = req.body;
  const file = req.files;
  const images = Promise.all(
    file.map(async (item) => {
      return {
        filename: item?.filename,
        path: item?.path,
      };
    })
  );

  const product = await Product.create({
    event_name: event_name,
    event_title: event_title,
    event_description: event_description,
    event_location: event_location,
    images: await images,
    event_date: new Date(),
    userId: user._id,
  });

  res.message = "You have created event successfully.";
  return util.successResponse(product, res);
});

// if user not create this product so user get unauthorized message.
exports.getProduct = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  const user = req.user;
  const getProduct = await Product.findOne({ _id: id, userId: user._id });

  if (!getProduct) {
    const message = "You are not authorized.";
    return util.unAuthorizedRequest(message, res);
  }
  res.message = "Product get Successfully.";
  return util.successResponse(getProduct, res);
});

// get product using pegination
exports.getAllProduct = catchAsync(async (req, res, next) => {
  const getProducts = await Product.paginate(req.body.query, req.body.options);

  if (!getProducts?.data?.length) {
    res.message = "Product not found.";
    return util.recordNotFound(res);
  }
  res.message = "Product get Successfully.";
  return util.successResponse(getProducts.data, res);
});

// update product only authorized user.
exports.updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.body;
  const user = req.user;

  const prod = await Product.findOne({ _id: id, userId: user._id });

  if (!prod) {
    const message = "You are not authorized.";
    return util.unAuthorizedRequest(message, res);
  }

  await Product.findByIdAndUpdate({ _id: id }, { ...req.body }, { upsert: true, new: true });

  res.message = "Product Update Successfully.";
  return util.successResponse([], res);
});

// delete product only authorized user.
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  const user = req.user;

  const prod = await Product.findOne({ _id: id, userId: user._id });

  if (!prod) {
    const message = "You are not authorized.";
    return util.unAuthorizedRequest(message, res);
  }
  await Product.deleteOne({ _id: id, userId: user._id });
  res.message = "Product delete Successfully.";
  return util.successResponse([], res);
});
