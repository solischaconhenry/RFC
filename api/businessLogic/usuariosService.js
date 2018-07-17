var repository = require('../dataAccess/repository.js');


exports.bloquearUsuario = function(data, callback) {
	var params = {
		query: {_id: data.idUsuario},
		updateQuery: {$set: {bloqueado: data.bloqueado}},
		collection: 'usuarios'
	};

	repository.updateDocument(params, function(res) {
		callback(res);
	});
};

exports.hacerAdmin = function(data, callback) {
	var params = {
		query: {_id: data.idUsuario},
		updateQuery: {$set: {admin: data.admin}},
		collection: 'usuarios'
	};
	repository.updateDocument(params, function(res) {
		callback(res);
	});
};

exports.getUsuarios = function(callback) {
	var params = {
		query: {},
		collection: 'usuarios'
	};
	repository.getCollection(params, function(data){
	        callback(data);
	});
};

