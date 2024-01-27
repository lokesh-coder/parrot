// custom express middleware for hourly rate limiting only specific routes

let requestCounter = {};
const MAX_REQUESTS_PER_HOUR = 200;
const HOUR_IN_MS = 60 * 60 * 1000;

const rateLimit = (req, res, next) => {
	const currentTime = Date.now();
	const clientIp = req.ip;

	if (!requestCounter[clientIp]) {
		requestCounter[clientIp] = { count: 1, startTime: currentTime };
	} else if (requestCounter[clientIp].count < MAX_REQUESTS_PER_HOUR) {
		requestCounter[clientIp].count++;
	} else if (currentTime - requestCounter[clientIp].startTime > HOUR_IN_MS) {
		requestCounter[clientIp] = { count: 1, startTime: currentTime };
	} else {
		return res.status(429).json({ message: 'Too many requests, please try again later.' });
	}

	next();
};

module.exports = rateLimit;