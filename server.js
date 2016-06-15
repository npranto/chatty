const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 8080;
app.use(bodyParser.json());
//////////////////

let messages =[
	{
		message: "Hello there!"
	},
	{
		message: "How are you!"
	}
];

app.options(`/`, (req, res, next) => {
	res.status(200).set({
    	'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  }).send(JSON.stringify());
});

app.get(`/`, (req, res, next) => {
	res.status(200).set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'SAMEORIGIN',
    'Content-Security-Policy': "default-src 'self' devmountain.github.io"
  }).send(JSON.stringify(messages));
});

app.post(`/`, (req, res, next) => {
	messages.push(
		{
			message: req.body.message,
			time: new Date()
		}
	);
	res.status(200).set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'SAMEORIGIN',
    'Content-Security-Policy': "default-src 'self' devmountain.github.io"
  }).send(JSON.stringify(messages));
});








//////////////////
app.listen(port, () => {
	console.log(`Express Running On ${port}`);
})