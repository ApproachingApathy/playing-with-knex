const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", (req, res) => {
	res.send("D&D Character Server");
});

router.get("/characters", (req, res) => {
	db("Characters")
		.select("*")
		.then(rows => {
			res.json(rows);
		});
});

module.exports = router;
