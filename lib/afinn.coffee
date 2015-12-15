fs = require 'fs'

class exports.AFHandler
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
		result = dictionary[word]
		if result == undefined
			result = null
		callback(null, result)
