var eventosService = require('../businessLogic/eventosService.js'); 

exports.getEventos = function(eRequest, eResponse) {
  eventosService.getEventos(function(data){
        eResponse.send(data);
    });
};

exports.getEventoPorId = function(eRequest, eResponse) {
  eventosService.getEventoPorId(eRequest.params.id, function(data){
        eResponse.send(data);
    });
};

exports.nuevoEvento = function(eRequest, eResponse) {
  eventosService.nuevoEvento(eRequest.body, function(data){
        eResponse.send(data);
    });
};

exports.editarEvento = function(eRequest, eResponse) {
  eventosService.editarEvento(eRequest.params.idEvento, eRequest.body, function(data){
        eResponse.send(data);
    });
};

exports.eliminarEvento = function(eRequest, eResponse) {
  eventosService.eliminarEvento(eRequest.params.idEvento, function(data){
        eResponse.send(data);
    });
};

exports.nuevoContenido = function(eRequest, eResponse) {
  eventosService.nuevoContenido(eRequest.body, function(data){
        eResponse.send(data);
    });
};

exports.eliminarContenido = function(eRequest, eResponse) {
  eventosService.eliminarContenido(eRequest.body, function(data){
        eResponse.send(data);
    });
};

exports.getContenidoEvento = function(eRequest, eResponse) {
  eventosService.getContenidoEvento(eRequest.params, function(data){

      res.sendFile(path.resolve(data.path), null, function(err){
          res.send(
              {
                  success: false,
                  data: null,
                  statusCode: 400
          });
      });
    });
};
