fs = require 'fs'

class exports.AfinnHandler
	dictionary = {}
	constructor: (path) ->
		fs.readFile path, (err, data) ->
			console.log(data + err)
