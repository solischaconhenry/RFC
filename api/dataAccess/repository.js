var dbConnection = require('./connection.js');

exports.getCollection = function(params, callback){
	dbConnection.findDocuments(
		params, 
		function (res) {
			callback(res);
		}
	);
};

exports.getDocument = function(params, callback) {
	dbConnection.findOneDocument(params, callback);
}

exports.addDocument = function(params, callback) {
	dbConnection.insertOneDocument(params, callback);
}

exports.updateDocument = function(params, callback) {
	dbConnection.updateOneDocument(params, callback);
}

exports.deleteDocument = function(params, callback) {
	dbConnection.deleteOneDocument(params, callback);
}

exports.updateCollection = function(params, callback){
	console.log('updateCollection: params');
	console.log(params);
	var queryParams = {
		query: {},
		collection: params.collection
	};
	dbConnection.deleteDocuments(
		queryParams, 
		function (res) {
			if (res.success) {
				queryParams = {
				collection: params.collection,
				documents: params.documents
				};
				console.log('console.log(queryParams);');
				console.log(queryParams);
				dbConnection.insertDocuments(
					queryParams, 
					function (res) {
						callback(res);
					}
				);
			} else {
				callback(res);
			}
		}
	);
};