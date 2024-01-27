const express = require('express');
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const proxy = require('./middlewares/proxy');
const httpToHttps = require('./middlewares/http-to-https');
const rateLimit = require('./middlewares/rate-limit');
const cors = require('./middlewares/cors');
const cookieParser = require('./middlewares/cookie-parser');
const app = express();

app.use(cors);
app.use(httpToHttps);
app.use(proxy);
app.use(rateLimit);
app.use(cookieParser);

//home page
app.get('/', (req, res) => {
	res.send('hello world')
});

app.get('/api/get-name', (req, res) => {
	res.json({ name: 'Parrot' });
});

app.get('/api/secret', (req, res) => {
	if (req.parsedCookies.supersecret) {
		res.json({ name: 'You are logged in' });
	} else {
		res.json({ name: 'Un authorized' });
	}

});



const options = {
	key: fs.readFileSync(path.join(__dirname, "ssl/localhost-key.pem")),
	cert: fs.readFileSync(path.join(__dirname, "ssl/localhost.pem")),
};

const httpsServer = https.createServer(options, app);
const httpServer = http.createServer(app);

httpServer.listen(4000, () => {
	console.log('HTTP server is running at port 80')
})

httpsServer.listen(3000, () => {
	console.log('HTTPS server is running at port 3000')
})