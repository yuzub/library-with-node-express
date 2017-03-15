var express = require('express');
var mongodb = require('mongodb').MongoClient;
var bookRouter = express.Router();
var objectId = require('mongodb').ObjectID;

	// var url = 'mongodb://localhost:27017/libraryApp';
	var url = 'mongodb://yoda:master@ds131510.mlab.com:31510/libraryapp';

var router = function(nav) {

	bookRouter.route('/')
		.get((req, res) => {
			
			mongodb.connect(url, function(err, db) {

				if (err) {
					console.log(err);
				} else {
					console.log('connecting to mlab');
				}

				var collection = db.collection('books');
				collection.find({}).toArray((err, results) => {
					res.render('bookListView', {
						title: 'Books', 
						nav: nav,
						books: results
					});
				});

			});

		});

	bookRouter.route('/:id')
		.get((req, res) => {
			var id = new objectId(req.params.id);
			mongodb.connect(url, function(err, db) {

				if (err) {
					console.log(err);
				} else {
					console.log('connecting to mlab');
				}

				var collection = db.collection('books');
				collection.findOne({_id: id}, (err, results) => {
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