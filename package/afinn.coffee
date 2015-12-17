fs = require 'fs'
pth = require 'path'


class exports.AFHandler
	dictionary = {}

	load: (path, callback) ->
		if(path == null)
			path = pth.resolve(__dirname, "./data/AFINN-111.txt") #ew
		if(fs.existsSync(path) == false)
			return callback "File at [" + path + "] does not exist"

		fs.readFile path, "utf8", (err, data) ->
			if err != null
				return callback err
			for item in data.toString().split("\n")
				spliceCount = 0
				splits = item.split("\t")
				dictionary[splits[0]] = splits[1]
			return callback(null, dictionary)

	getWord: (word) =>
		result = dictionary[word]
		if result == undefined
			result = 0
		return result;

	getSentence: (string, callback) =>
		result = {}
		runningScore = 0;
		words = string.split(" ")
		if (words.length < 1)
			return callback("0 length word sequence provided", null)

		for word in words
			runningScore += Number(this.getWord(word))
			#normalise somewhat for length
		norm = words.length / 5
		if (norm / 1) < 1
			norm = 1

		result["Score"] = runningScore
		runningScore /= norm
		result["ScoreNormalised"] = runningScore
		return callback(null, result)
