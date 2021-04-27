const request = require('request');

var data = null

request('http://numbersapi.com/random/math', { json: false }, (err, res, body) => {
  if (err) { return console.log(err); }
  data = body
});

module.exports = (req, res) => {
	const name = req.query.name || 'stranger';
	res.status(200).send(data)
}