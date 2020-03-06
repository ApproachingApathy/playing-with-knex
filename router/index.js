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
	let createResponse = (err = null, status, operation, data) => ({
		operation: "CREATE",
		status: "SUCCESS",
		error: null,
		data: rows
	});
	logger.debug("'/characters/create': Request received.");
	logger.debug(req.body);

	if (!req || !req.body) {
		logger.error(`'/characters/create': req or body undefined.`);
		res.statusCode = 500;
		res.json(createResponse("An error Occurred", "FAILURE", "CREATE", null));
	}
	db("Characters")
		.insert({
			name: req.body.name,
			strength: req.body.strength,
			dexterity: req.body.dexterity,
			constitution: req.body.constitution,
			intelligence: req.body.intelligence,
			wisdom: req.body.wisdom,
			charisma: req.body.charisma,
			race: req.body.race
		})
		.then(id => {
			logger.debug(
				"'/characters/create': Insert completed, retrieving record."
			);
			logger.debug(id);
			return db("Characters")
				.select("*")
				.where({ id });
		})
		.then(rows => {
			logger.debug(
				"'/characters/create': Record retrieved sending response."
			);
			res.json({
				operation: "CREATE",
				status: "SUCCESS",
				error: null,
				data: rows
			});
		})
		.catch(err => {
			logger.debug(
				"'/characters/create': Error occurred during db insertion."
			);
			res.json(
				createResponse("An error Occurred", "FAILURE", "CREATE", null)
			);
		});
});

module.exports = router;
