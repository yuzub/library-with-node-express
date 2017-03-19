var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

// var url = 'mongodb://localhost:27017/libraryApp';
var url = 'mongodb://yoda:master@ds131510.mlab.com:31510/libraryapp';

var bookController = function(bookService, nav) {
	var middleware = function(req, res, next) {
		// if (!req.user) {
		// res.redirect('/');
		// }
		next();
	};

	var getIndex = function(req, res) {

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

		};

	var getById = function(req, res) {
			var id = new ObjectId(req.params.id);
			mongodb.connect(url, function(err, db) {

				if (err) {
					console.log(err);
				} else {
					console.log('connecting to mlab');
				}

				var collection = db.collection('books');
				collection.findOne({
					_id: id
				}, function(err, results) {
					if(results.bookId) {
						bookService.getBookById(results.bookId, function(err, book) {
							results.book = book;
							res.render('bookView', {
								title: 'Books',
								nav: nav,
								book: results
							});
						});
					} else {
						res.render('bookView', {
							title: 'Books',
							nav: nav,
							book: results
						});
					}
				});

			});

		};

	return {
		getIndex: getIndex,
		getById: getById,
		middleware: middleware
	};
};

module.exports = bookController;