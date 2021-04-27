const request = require('request');

module.exports = (req, res) => {
	const name = req.query.name || 'stranger';
	request('http://numbersapi.com/random/math', { json: false }, (err, rest, body) => {
		if (err) { return console.log(err); }
		res.status(200).send(rest)
	});
}