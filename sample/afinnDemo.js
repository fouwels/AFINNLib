/*jshint esnext: true */
"use babel";

var x = () => console.log("yolo");

require('coffee-script/register');
var AFHandler = require("../package/afinn.coffee").AFHandler;
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

app.get('*', function (req, res) {
	var dat = {};
	dat["paths"] = {};
	dat["paths"]["/word/:word:"] = "Get AFINN value for word";
	dat["paths"]["/sentence?string="] = "Get AFINN value for word combo, normalised(ish) for length";
	res.status(400).send(JSON.stringify(dat, null, 2));
});

var af = new AFHandler();
af.load(null, loaded); //load from the provided AFINN-111 lit
//af.load("./data/AFINN-111.txt", loaded); //load from a custom list; format <word>\t<value>\n

function loaded(err){
	if (err !== null) {
		console.log("Err@load:" + err);
		return;
	}
	console.log("Loaded AFINN list");
	var server = app.listen(3000, () => { console.log('Listening at http://%s:%s', server.address().address, server.address().port); });
}
