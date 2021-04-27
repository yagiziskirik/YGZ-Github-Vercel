const https = require('https');

https.get('http://numbersapi.com/random/math', (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

module.exports = (req, res) => {
	const name = req.query.name || 'stranger';
	res.status(200).send(`Hello, ${name}!`)
}