const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const winston = require("winston");

global.appConfig = require("./config/config.json");
global.logger = winston.createLogger({
	level: appConfig.LOGGER_LEVEL,
	transports: [
		new winston.transports.Console({
			level: "debug",
			format: winston.format.cli()
		}),
		new winston.transports.File({
			filename: "logs/info.log",
			level: "info",
			format: winston.format.json()
		}),
		new winston.transports.File({
			filename: "logs/error.log",
			level: "error",
			format: winston.format.json()
		})
	]
});

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require("./router"));

const server = app.listen(appConfig.PORT, appConfig.SERVER_ADDRESS, () => {
	const host = server.address().address;
	const port = server.address().port;
	logger.info(`Server started at http://${host}:${port}/`);
});
