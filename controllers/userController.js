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
			password,
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
	console.log("entered pwd: ", password, existingUser.password);
	const validatePassword = bcrypt.compareSync(
		password,
		existingUser.password
	);
	// if (!validatePassword) {
	if (password === existingUser?.password) {
		return res.status(400).json({
			message: "Invalid Credentials",
		});
	}
	return res
		.status(200)
		.json({ message: "Login Successful", user: existingUser });
};

exports.updateUser = async (req, res) => {
	const { id } = req.params;
	const {
		firstName,
		lastName,
		// email,
		// password,
		phone,
		city,
		state,
		country,
		pincode,
		isLGBTQFriendly,
	} = req.body;

	try {
		const user = await User.findById(id);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		if (firstName) user.firstName = firstName;
		if (lastName) user.lastName = lastName;
		// if (email) user.email = email;
		// if (password) user.password;
		if (phone) user.phone = phone;
		if (city) user.city = city;
		if (state) user.state = state;
		if (country) user.country = country;
		if (pincode) user.pincode = pincode;
		if (typeof isLGBTQFriendly !== "undefined")
			user.isLGBTQFriendly = isLGBTQFriendly;

		user.role = "Provider";
		console.log("update user", user);

		await user.save();

		res.status(200).json({ message: "User updated successfully", user });
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};
