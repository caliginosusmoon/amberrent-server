const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	firstName: { type: String },
	lastName: { type: String },
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: { type: String, required: true },
	phone: { type: String },
	city: { type: String },
	state: { type: String },
	country: { type: String },
	pincode: { type: String },
	role: {
		type: String,
		enum: ["Seeker", "Provider"],
		default: "Seeker",
	},
	isLGBTQFriendly: {
		type: Boolean,
		default: true,
	},
});

//using bcryptjs to encrypt password
userSchema.pre("save", function (next) {
	const user = this;
	if (!user.isModified("password")) return next();
	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

//match passwords
userSchema.methods.comparePassword = function (candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) return callback(err);
		callback(null, isMatch);
	});
};

const User = mongoose.model("User", userSchema);
module.exports = User;
