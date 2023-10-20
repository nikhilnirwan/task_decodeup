const express = require("express");
const userAuthController = require("../controller/userAuthController");
const addProductCon = require("../controller/addProduct");
const router = express.Router();

// protect route
router.use(userAuthController.protect);

router.post("/events", addProductCon.upload.array("images", 4), addProductCon.addProduct);
router.get("/getProduct", addProductCon.getProduct);
router.get("/getAllProd", addProductCon.getAllProduct);
router.put("/updateProduct", addProductCon.updateProduct);
router.delete("/deleteProduct", addProductCon.deleteProduct);

module.exports = router;
