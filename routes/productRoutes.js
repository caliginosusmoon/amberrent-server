const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/addproduct", productController.addProduct);
router.put("/update/:productId", productController.updateProductDetails);
router.get("/products", productController.getAllProducts);
router.get("/products/:productId", productController.getSingleProduct);
router.get("/products/user/:userId", productController.getProductByUser);
router.patch(
	"/products/:productId/availability",
	productController.updateProductAvailability
);
router.put("/products/:productId", productController.updateProductDetails);
router.delete("/products/:productId", productController.deleteProduct);

module.exports = router;
