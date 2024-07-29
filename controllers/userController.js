const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//process to create new user
exports.createUser = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			phone,
			city,
			state,
			country,
			pincode,
			role,
			isLGBTQFriendly,
		} = req.body;
		console.log(req.body);
		let existingUser;
		try {
			existingUser = await User.findOne({ email });
		} catch (error) {
			return console.log(error);
		}
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}
		const hashPassword = bcrypt.hashSync(password);

		const newUser = new User({
			firstName,
			lastName,
			email,
			password: hashPassword,
			phone,
			city,
			state,
			country,
			pincode,
			role,
			isLGBTQFriendly,
		});

		await newUser.save();
		res.status(201).json({ message: "User created successfully" });
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};

exports.loginUser = async (req, res) => {
	const { email, password } = req.body;
	let existingUser;
	try {
		existingUser = await User.findOne({ email });
	} catch (error) {
		return console.log(error);
	}
	console.log("existing: ", existingUser);
	if (!existingUser) {
		return res.status(400).json({
			message: "User not found",
		});
	}
	const validatePassword = bcrypt.compareSync(
		password,
		existingUser.password
	);
	if (!validatePassword) {
		return res.status(400).json({
			message: "Invalid Credentials",
		});
	}
	return res
		.status(200)
		.json({ message: "Login Successful", user: existingUser });
};
