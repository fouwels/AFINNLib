fs = require 'fs'

class exports.AFHandler
	dictionary = {}
	load: (path, callback) ->
		if(fs.existsSync(path) == false)
			return callback "File does not exist"

		fs.readFile path, "utf8", (err, data) ->
			if err != null
				return callback err
			for item in data.toString().split("\n")
				spliceCount = 0
				splits = item.split("\t")
				dictionary[splits[0]] = splits[1]
			return callback(null, dictionary)

	getWord: (word) ->
		result = dictionary[word]
		if result == undefined
			result = 0
		return result;

	getSentence: (string, callback) ->
		runningScore = 0;
		words = string.split(" ")

		if (words.length < 1)
			return callback("0 length word sequence provided", null)

		for word in words
			runningScore += getWord(word)

		runningScore /= () => #normalise somewhat for length
			norm = words.length / 5
			if (norm / 1) < 1
				norm = 1

		return callback(null, runningScore)
