var usuariosService = require('../businessLogic/usuariosService.js'); 

exports.bloquearUsuario = function(uRequest, uResponse) {
  usuariosService.bloquearUsuario(uRequest.body, function(data){
        uResponse.send(data);
    });
};

exports.hacerAdmin= function(uRequest, uResponse) {
  usuariosService.hacerAdmin(uRequest.body, function(data){
        uResponse.send(data);
    });
};


exports.getUsuarios = function(eRequest, eResponse) {
  usuariosService.getUsuarios(function(data){
        eResponse.send(data);
    });
};