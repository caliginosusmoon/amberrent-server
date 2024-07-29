const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
const cors = require("cors");
const req = require("express/lib/request");
app.use(cors());
const port = process.env.PORT || 5000;

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Coonected"))
	.catch((error) => console.log("Connection error", error));

app.get("/", (req, res) => {
	res.send("Welcome to my API");
});
app.use(express.json());
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.listen(port, () => console.log("Server listening on port", port));
