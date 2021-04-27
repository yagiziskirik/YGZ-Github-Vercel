const request = require('request');

request('http://numbersapi.com/random/math', { json: false }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body);
  console.log(body);
});

module.exports = (req, res) => {
	const name = req.query.name || 'stranger';
	res.status(200).send(`Hello, ${name}!`)
}