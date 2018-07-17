var path = require('path'),
	fs = require('fs'),
 	repository = require('../dataAccess/repository.js');


exports.getEventos = function(callback) {
	var params = {
		query: {},
		collection: 'eventos'
	};
	repository.getCollection(params, function(data){
	        callback(data);
	});
};

exports.getEventoPorId = function(idEvento, callback) {
	var params = {
		query: {_id: idEvento},
		collection: 'eventos'
	};
	repository.getDocument(params, function(data){
	        callback(data);
	});
};
exports.nuevoEvento = function(doc, callback) {
	var params = {
		query: doc,
		collection: 'eventos'
	};
	repository.addDocument(params, function(res) {
		callback(res);
	});
};

exports.editarEvento = function(idEvento, doc, callback) {
	var params = {
		query: {_id: idEvento},
		updateQuery: {$set: doc},
		collection: 'eventos'
	};
    console.log(doc);
	repository.updateDocument(params, function(res) {
		callback(res);
	});
};

exports.eliminarEvento = function(idEvento, callback) {
	var params = {
		query: {_id: idEvento},
		collection: 'eventos'
	};
	repository.deleteDocument(params, function(res) {
		callback(res);
	});
};

exports.nuevoContenido = function(data, callback) {

	var tempPath = data.files.file.path,
		targetPath;
	if (data.tipoContenido == 0) {
		targetPath = path.resolve('./conenido/images/' + idEvento + '.jpg');
		fs.rename(tempPath, targetPath, function(err) {
			if (err){
                callback(
                    {
                        success: false,
                        data: null,
                        message: 400
                    }
                );
                return;
            };
            callback(
                {
                    success: true,
                    data: null,
                    message: 200
                }
            );
		});
	} else {
        targetPath = path.resolve('./conenido/videos/' + idEvento + '.mp4');
        fs.rename(tempPath, targetPath, function(err) {
            if (err){
                callback(
                    {
                        success: false,
                        data: null,
                        message: 400
                    }
                );
                return;
            };
            callback(
                {
                    success: true,
                    data: null,
                    message: 200
                }
            );
        });
	}
};


exports.getContenido = function(data, callback) {
    var targetPath;
    if (data.tipoContenido == 0) {
        targetPath = './conenido/images/' + idEvento + '.jpg';
    } else {
        targetPath = './conenido/videos/' + idEvento + '.mp4';
    }
    callback({path: targetPath});
};


exports.eliminarContenido = function(data, callback) {
    var targetPath;
    if (data.tipoContenido == 0) {
        targetPath = './conenido/images/' + idEvento + '.jpg';
    } else {
        targetPath = './conenido/videos/' + idEvento + '.mp4';
    }

    fs.unlinkSync(filePath, function (err) {
        if (err){
            callback(
                {
                    success: false,
                    data: null,
                    message: 400
                }
            );
        }else{
            callback(
                {
                    success: true,
                    data: null,
                    message: 200
                }
            );
        }

    });
};
