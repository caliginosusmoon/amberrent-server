const Product = require("../models/productModel");
const mongoose = require("mongoose");

//add Product
exports.addProduct = async (req, res) => {
	try {
		const {
			userId,
			title,
			location,
			description,
			price,
			image,
			category,
			beds,
			baths,
			balcony,
			details,
			features,

			photos,
			owner,
		} = req.body;
		const product = new Product({
			userId,

			title,
			location,
			price,
			image,
			category,
			beds,
			baths,
			balcony,
			details,
			features,
			description,
			photos,
			owner,
		});

		await product.save();
		res.status(201).json({
			message: "Product created successfully",
			product,
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//get product by user
exports.getProductByUser = async (req, res) => {
	try {
		const userId = req.params.userId;
		const products = await Product.find({ userId });
		console.log("userid is", userId, products);
		res.status(200).json(products);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//get single product
exports.getSingleProduct = async (req, res) => {
	try {
		const productId = req.params.productId;
		const product = await Product.findById(productId).populate("userId");
		if (!product) {
			return res.status(404).send("Product not found");
		}
		res.status(200).json(product);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//fetch all products
exports.getAllProducts = async (req, res) => {
	try {
		const products = await Product.find().populate("userId");
		res.status(200).json(products);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//fetch products by category
exports.getProductsByCategory = async (req, res) => {
	try {
		const category = req.params.category;
		const products = await Product.find({ category });
		res.status(200).json(products);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//update availabilty of product
exports.updateProductAvailability = async (req, res) => {
	try {
		const productId = req.params.productId;
		const product = await Product.findById(productId);
		if (!product) {
			return res.status(404).send("Product not found");
		}
		product.isAvailable = req.body.isAvailable;
		await product.save();
		res.status(200).json(product);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
//update product details
exports.updateProductDetails = async (req, res) => {
	const productId = req.params.productId;
	const updates = req.body;
	try {
		const product = await Product.findByIdAndUpdate(productId, updates, {
			new: true,
		});
		if (!product) {
			return res.status(404).send("Product not found");
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//delete a product
exports.deleteProduct = async (req, res) => {
	const productId = req.params.productId;

	try {
		const product = await Product.findByIdAndDelete(productId);
		if (!product) {
			return res.status(404).send("Product not found");
		}
		res.send("Product deleted");
	} catch (error) {
		res.status(500).send("Server error");
	}
};
