fs = require 'fs'

class exports.AfinnHandler
	dictionary = {}
	load: (path, callback) ->
		if(fs.existsSync(path) == false)
			callback "File does not exist"
			return

		fs.readFile path, "utf8", (err, data) ->
			if err != null
				callback err
				return
			for item in data.toString().split("\n")
				spliceCount = 0
				splits = item.split("\t")
				dictionary[splits[0]] = splits[1]
			callback(null, dictionary)
	getVal: (word, callback) ->
		callback(null, dictionary[word])
