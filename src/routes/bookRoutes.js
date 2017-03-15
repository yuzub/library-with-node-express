var express = require('express');
var mongodb = require('mongodb').MongoClient;
var bookRouter = express.Router();
var ObjectId = require('mongodb').ObjectID;

// var url = 'mongodb://localhost:27017/libraryApp';
var url = 'mongodb://yoda:master@ds131510.mlab.com:31510/libraryapp';

var router = function(nav) {

	bookRouter.route('/')
		.get(function(req, res) {

			mongodb.connect(url, function(err, db) {

				if (err) {
					console.log(err);
				} else {
					console.log('connecting to mlab');
				}

				var collection = db.collection('books');
				collection.find({}).toArray(function(err, results) {
					res.render('bookListView', {
						title: 'Books',
						nav: nav,
						books: results
					});
				});

			});

		});

	bookRouter.route('/:id')
		.get(function(req, res) {
			var id = new ObjectId(req.params.id);
			mongodb.connect(url, function(err, db) {

				if (err) {
					console.log(err);
				} else {
					console.log('connecting to mlab');
				}

				var collection = db.collection('books');
				collection.findOne({_id: id}, function(err, results) {
					res.render('bookView', {
						title: 'Books',
						nav: nav,
						book: results
					});
				});

			});

		});

	return bookRouter;
};

module.exports = router;