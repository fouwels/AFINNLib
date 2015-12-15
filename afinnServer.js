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


app.get('/:word', function (req, res) {
  af.getVal(req.params.word, (err, data) => {
		if(data === null){
			res.status(404).send("null");
		}
		else {
			res.send(data);
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
