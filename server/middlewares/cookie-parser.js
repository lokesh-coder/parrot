const cookieParser = (req, res, next) => {
	req.parsedCookies = {};
	const rawCookies = req.headers.cookie?.split('; ');
	rawCookies?.forEach(rawCookie => {
		const [name, value] = rawCookie.split('=');
		req.parsedCookies[name] = value;
	});
	next();
};

module.exports = cookieParser;