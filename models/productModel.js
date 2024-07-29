const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},

	title: {
		type: String,
		required: true,
	},
	location: {
		address: { type: String, required: true },
		city: { type: String, required: true },
		state: { type: String, required: true },
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	
	image: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		enum: ["Rental", "Roomate", "PG"],
		required: true,
	},
	beds: {
		type: Number,
		required: true,
	},
	baths: {
		type: Number,
		required: true,
	},
	balcony: {
		type: Number,
		default: 0,
	},
	details: {
		superBuiltArea: { type: Number, required: true },
		additionalRooms: { type: String },
		floor: { type: Number, required: true },
		totalFloors: { type: Number, required: true },
		parking: { type: String, required: true },
		furnished: {
			type: String,
			enum: ["Fully Furnished", "Semi Furnished", "Unfurnished"],
			required: true,
		},
		maintenance: { type: Number, required: true },
	},
	features: {
		ageOfConstruction: { type: String, required: true },
		facing: { type: String, required: true },
		status: { type: String, required: true },
		visitorParking: { type: Boolean, default: false },
		park: { type: Boolean, default: false },
		waterStorage: { type: Boolean, default: false },
		friendlyNeighborhood: { type: Boolean, default: false },
	},
	photos: [String],
	owner: {
		name: { type: String, required: true },
		contact: { type: String, required: true },
		isLGBTQFriendly: { type: Boolean, default: true },
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	available: {
		type: Boolean,
		default: true,
	},
});

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
