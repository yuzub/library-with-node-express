var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
	{
		title: 'War and Peace',
		genre: 'Historical Fiction',
		author: 'Lev Nikolayevich Tolstoy',
		read: false
	},
	{
		title: 'Les Misérables',
		genre: 'Historical Fiction',
		author: 'Victor Hugo',
		read: false
	},
	{
		title: 'The Time Machine',
		genre: 'Science Fiction',
		author: 'H. G. Wells',
		read: false
	},
	{
		title: 'A Journey into the Center of the Earth',
		genre: 'Science Fiction',
		author: 'Jules Verne',
		read: false
	},
	{
		title: 'The Dark World',
		genre: 'Fantasy',
		author: 'Henry Kuttner',
		read: false
	},
	{
		title: 'The Wind in the Willows',
		genre: 'Fantasy',
		author: 'Kenneth Grahame',
		read: false
	},
	{
		title: 'Life On The Mississippi',
		genre: 'History',
		author: 'Mark Twain',
		read: false
	},
	{
		title: 'Childhood',
		genre: 'Biography',
		author: 'Lev Nikolayevich Tolstoy',
		read: false
	}
];

var router = function(nav) {

	adminRouter.route('/addBooks')
		.get(function(req, res) {
			// res.send('inserting books');
			// var url = 'mongodb://localhost:27017/libraryApp';
			var url = 'mongodb://yoda:master@ds131510.mlab.com:31510/libraryapp';
			
			mongodb.connect(url, function(err, db) {
				
				if (err) {
					console.log(err);
				} else {
					console.log('connecting to mlab');
				}

				var collection = db.collection('books');
				collection.insertMany(books, function(err, results) {
					res.send(results);
					console.log('closing connecting to mlab');
					db.close();
				});

			});

		});

	return adminRouter;
};

module.exports = router;