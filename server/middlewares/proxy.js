// const proxy = require('express-http-proxy');

// module.exports = proxy("http://localhost:5173/", {
// 	filter: function (req, res) {=
// 		return !req.url.includes('/api/');
// 	}
// })

const http = require('http');

const proxy = (req, res, next) => {
	if (req.url.includes('/api/')) {
		next();
	} else {
		const options = {
			hostname: 'localhost',
			port: 5173,
			path: req.url,
			method: req.method,
			headers: req.headers
		};

		const proxy = http.request(options, function (targetRes) {
			res.writeHead(targetRes.statusCode, targetRes.headers);
			targetRes.pipe(res, {
				end: true
			});
		});

		req.pipe(proxy, {
			end: true
		});
	}
};

module.exports = proxy;