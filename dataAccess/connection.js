var fs = require('fs'); 
var MongoClient = require('mongodb').MongoClient,
             ObjectID = require('mongodb').ObjectID;

var readJsonFile = function() {
    //Se lee el archivo de configuración de la base de datos
    var connectionParams = fs.readFileSync("./configuration.json");
    var dbConfig = {};

    try {
        //se convierte a JSON
        dbConfig = JSON.parse(connectionParams);
    } 
    catch (err) {
        console.log(err);
    }
    return dbConfig;
};

var setObjectId = function(params) {
    if (params.query._id){
        params.query._id = ObjectID(params.query._id);
    }
    return params;
}

exports.findDocuments = function(params, callback) {
    params = setObjectId(params);
    /*
    params = {
            collection, //nombre de la colección
            query // query a ser ejecutar
    }
    */
    var dbUrl = 'mongodb://';
    var dbConfig = readJsonFile();
    // se crea la URL de conexión
    dbUrl = dbUrl.concat(dbConfig.params.host , ':',  dbConfig.params.port,  '/' , dbConfig.params.database);
    // Usa el método connect para conectar al servidor
    MongoClient.connect(dbUrl, function(err, db){
        //se recupera la colección requerida
        console.log('MongoClient: params');
        console.log(params);
          var collection = db.collection(params.collection);
          // Se buscan los documentos
          collection.find(params.query).toArray(function(err, docs) {
            var res;
                if (err){ //error en la conexión
                    res = { //error en la conexión
                        success: false,
                        data: null,
                        statusCode: 400
                    };
                }
                else{ //éxito
                     if (docs.length > 0) {
                        res = {
                            success: true,
                            data: docs,
                            statusCode: 200
                        };    
                    }else{ //no hay registros
                        res = {
                            success: true,
                            data: [],
                            statusCode: 200
                        };
                    }
                }
                db.close(); 
                callback(res);
          }); 
    });
};

exports.findOneDocument = function(params, callback) {
    params = setObjectId(params);
    var dbUrl = 'mongodb://';
    var dbConfig = readJsonFile();
    // se crea la URL de conexión
    dbUrl = dbUrl.concat(dbConfig.params.host , ':',  dbConfig.params.port,  '/' , dbConfig.params.database);
    // Usa el método connect para conectar al servidor
    MongoClient.connect(dbUrl, function(err, db){
        //se recupera la colección requerida
          var collection = db.collection(params.collection);
          // Se buscan los documentos
          collection.findOne(params.query, function(err, doc) {
            var res;
                if (err){ //error en la conexión
                    res = {
                        success: false,
                        data: null,
                        statusCode: 400
                    };
                }
                else{ //éxito
                    if (doc) {
                        res = {
                            success: true,
                            data: doc,
                            statusCode: 200
                        };    
                    }else{ //no hay registros
                        res = {
                            success: true,
                            data: doc,
                            statusCode: 404
                        };
                    }
                    
                }
                db.close(); 
                callback(res);
          }); 
    });
};



exports.insertOneDocument = function(params, callback) {
    params = setObjectId(params);
    var dbUrl = 'mongodb://';
    var dbConfig = readJsonFile();
    // se crea la URL de conexión
    dbUrl = dbUrl.concat(dbConfig.params.host , ':',  dbConfig.params.port,  '/' , dbConfig.params.database);

    // Usa el método connect para conectar al servidor
    MongoClient.connect(dbUrl, function(err, db){
        //se recupera la colección requerida
          var collection = db.collection(params.collection);
          // Se inserta el documento
          collection.insert(params.query, function(err, result) {
            var res;
                if (err){ //error en la conexión
                    res = {
                        success: false,
                        data: null,
                        statusCode: 400
                    };
                }
                else{ //éxito
                    res = {
                        success: true,
                        data: null,
                        statusCode: 200
                    };
                }
                db.close(); 
                callback(res);
          }); 
    });
};


exports.insertDocuments = function(params, callback) {
    params = setObjectId(params);
    var dbUrl = 'mongodb://';
    var dbConfig = readJsonFile();
    // se crea la URL de conexión
    dbUrl = dbUrl.concat(dbConfig.params.host , ':',  dbConfig.params.port,  '/' , dbConfig.params.database);

    // Usa el método connect para conectar al servidor
    MongoClient.connect(dbUrl, function(err, db){
        //se recupera la colección requerida
          var collection = db.collection(params.collection);
          // Se insertan los documentos
          console.log('console.log(params.documents);');
          console.log(params.documents);
          collection.insertMany(params.documents, function(err, result) {
            var res;
                if (err){ //error en la conexión
                    res = {
                        success: false,
                        data: null,
                        statusCode: 400
                    };
                }
                //no se insertaron todos los 
                else if (result.result.n != params.documents.length || result.ops.length != params.documents.length){
                    res = {
                        success: false,
                        data: null,
                        statusCode: 400
                    };
                }else{  //éxito
                    res = {
                        success: true,
                        data: null,
                        statusCode: 200
                    };
                }
                db.close(); 
                callback(res);
          }); 
    });
};

exports.updateOneDocument = function(params, callback) {
    params = setObjectId(params);
    var dbUrl = 'mongodb://';
    var dbConfig = readJsonFile();
    // se crea la URL de conexión
    dbUrl = dbUrl.concat(dbConfig.params.host , ':',  dbConfig.params.port,  '/' , dbConfig.params.database);

    // Usa el método connect para conectar al servidor
    MongoClient.connect(dbUrl, function(err, db){
        //se recupera la colección requerida
          var collection = db.collection(params.collection);
          // Se actualiza el documento
          collection.updateOne(params.query, params.updateQuery, function(err, result) {
            var res;
                if (err){ //error en la conexión
                    res = {
                        success: false,
                        data: null,
                        statusCode: 400
                    };
                }
                else{ //éxito
                    res = {
                        success: true,
                        data: null,
                        statusCode: 200
                    };
                }
                db.close(); 
                callback(res);
          }); 
    });
};

exports.deleteOneDocument = function(params, callback) {
    params = setObjectId(params);
    var dbUrl = 'mongodb://';
    var dbConfig = readJsonFile();
    // se crea la URL de conexión
    dbUrl = dbUrl.concat(dbConfig.params.host , ':',  dbConfig.params.port,  '/' , dbConfig.params.database);

    // Usa el método connect para conectar al servidor
    MongoClient.connect(dbUrl, function(err, db){
        //se recupera la colección requerida
          var collection = db.collection(params.collection);
          // Se elimina los documentos
          collection.deleteOne(params.query, function(err, result) {
            var res;
                if (err){ //error en la conexión
                    res = {
                        success: false,
                        data: null,
                        statusCode: 400
                    };
                }
                else{ //éxito
                    res = {
                        success: true,
                        data: null,
                        statusCode: 200
                    };
                }
                db.close(); 
                callback(res);
          }); 
    });
};

exports.deleteDocuments = function(params, callback) {
    params = setObjectId(params);
    var dbUrl = 'mongodb://';
    var dbConfig = readJsonFile();
    // se crea la URL de conexión
    dbUrl = dbUrl.concat(dbConfig.params.host , ':',  dbConfig.params.port,  '/' , dbConfig.params.database);

    // Usa el método connect para conectar al servidor
    MongoClient.connect(dbUrl, function(err, db){
        //se recupera la colección requerida
          var collection = db.collection(params.collection);
          // Se buscan los documentos
          collection.remove(params.query, function(err, result) {
            var res;
                if (err){ //error en la conexión
                    res = {
                        success: false,
                        data: null,
                        statusCode: 400
                    };
                }
                else{ //éxito
                    res = {
                        success: true,
                        data: null,
                        statusCode: 200
                    };
                }
                db.close(); 
                callback(res);
          }); 
    });
};