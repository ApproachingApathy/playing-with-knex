const express = require("express");
const router = express.Router();

const db = require("../db");

const createResponse = (err = null, status, operation, data) => ({
	operation: operation,
	status: status,
	error: err,
	data: data
});

const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";

router.get("/", (req, res) => {
	res.send("D&D Character Server");
});

router.get("/characters", (req, res) => {
	const OPERATION = "RETRIEVE";
	db("Characters")
		.select("*")
		.then(rows => {
			res.json(createResponse(null, SUCCESS, OPERATION, rows));
		});
});

router.get("/characters/:id", (req, res) => {
	const OPERATION = "RETRIEVE";
	logger.debug("'/characters/:id': Request received.");
	let id;
	try {
		id = Number(req.params.id);
		logger.debug("'/characters/:id': ID Parsed.");
	} catch {
		logger.debug("'/characters/:id': Couldn't parse ID.");
		res.json(
			createResponse("ID couldn't be parsed", FAILURE, OPERATION, null)
		);
		return false;
	}

	db("Characters")
		.select("*")
		.where({ id })
		.then(rows => {
			res.json(createResponse(null, SUCCESS, OPERATION, rows));
		})
		.catch(err => {
			res.json(createResponse(err, SUCCESS, OPERATION, rows));
		});
});

router.post("/characters/create", (req, res) => {
	const OPERATION = "CREATE";
	logger.debug("'/characters/create': Request received.");

	if (!req || !req.body) {
		logger.error(`'/characters/create': req or body undefined.`);
		res.statusCode = 500;
		res.json(createResponse("An error Occurred", FAILURE, OPERATION, null));
		return false;
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
			res.json(createResponse(null, SUCCESS, OPERATION, rows));
		})
		.catch(err => {
			logger.debug(
				"'/characters/create': Error occurred during db insertion."
			);
			res.json(
				createResponse("An error Occurred", FAILURE, OPERATION, null)
			);
		});
});

module.exports = router;
