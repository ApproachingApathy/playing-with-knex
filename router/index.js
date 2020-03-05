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

router.post("/characters/create", (req, res) => {
	db("Characters")
		.insert({
			name: req.body.name,
			strength: req.body.strength,
			dexterity: req.body.dexterity,
			constitution: req.body.constitution,
			wisdom: req.body.wisdom,
			charisma: req.body.charisma,
			race: req.body.race
		})
		.then(id => {
			return db("Characters")
				.select("*")
				.where({ id });
		})
		.then(rows => {
			res.json({
				operation: "CREATE",
				status: "SUCCESS",
				error: null,
				data: rows
			});
		})
		.catch(err => {
			logger.error(err);
			res.json({
				operation: "CREATE",
				status: "FAILURE",
				error: err,
				data: null
			});
		});
});

module.exports = router;
