/*jshint esnext: true */
require('coffee-script/register');
var AFHandler = require("./lib/afinn.coffee").AFHandler;
var express = require('express'); //yeye, I know, I know
var app = express();

var middleWare = function (req, res, next) {
	res.setHeader('Content-Type', 'application/json');
  console.log("request to: " + req.url);
  next();
};
app.use(middleWare);


app.get('/word:word', function (req, res) {
	var data = af.getWord(req.params.word);
	if(data === 0){
		res.status(404).send("0");
	}
	else {
		res.send(data);
	}
});

app.get('/sentence', function (req, res) {
	af.getSentence(req.query.string, (err, data) => {
		if(err !== null){
			res.status(500).send("0");
		}
		else {
			res.send(JSON.stringify(data));
		}
	});
});

var af = new AFHandler();
af.load("./data/AFINN-111.txt", loaded);

function loaded(err){
	if (err !== null) {
		console.log(err);
		return;
	}
	console.log("Loaded AFINN list");
	var server = app.listen(3000, () => { console.log('Listening at http://%s:%s', server.address().address, server.address().port); });
}
