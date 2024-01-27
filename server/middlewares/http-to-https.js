const httpToHttps = (req, res, next) => {
	if (!req.secure) {
		return res.redirect('https://localhost:3000' + req.url);
	}
	next();
}

module.exports = httpToHttps;