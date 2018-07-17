var path = require('path'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    eventosController = require('./controllers/eventosController.js'),
    usuariosController = require('./controllers/usuariosController.js');

//-------------------------------------------------------------------------
var express       = require('express'),
      app              = express(),
      server          = require('http').createServer(app),
      port              = 9000;
//-------------------------------------------------------------------------

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//define ubición del directorio principal
//app.use('/', express.static(__dirname + '/app'));

app.use(function (req, res, next) {
  next();
});

//End: Server configuration

//Start: Routing

/*
Devuelve todos los eventos
  Entrada: ninguna
  Salida: 
        { success   // éxito: true, fracaso: false
           data        // Array con la información de todos los eventos
           statusCode // éxito: 200, fracaso: 400
        }
  */
app.get('/api/carrera/eventos/todos', eventosController.getEventos);


/*
Devuelve un único evento
  Entrada: 
        id:     // id del evento que se busca
  Salida: 
        { success   // éxito: true, fracaso: false
           data        // éxito: información del evento buscado, fracaso: null
           statusCode // éxito: 200, fracaso: 400
        }
  */
app.get('/api/carrera/eventos/:id', eventosController.getEventoPorId);

/*
Agrega un nuevo evento
  Entrada: 
        {
           tipoEvento, // tipo del evento a crear
           nombre,      // nombre del evento
           descripcion // descripción del evento
        }
  Salida: 
        { success   // éxito: true, fracaso: false
           data        // éxito: id del evento insertado, fracaso: null
           statusCode // éxito: 200, fracaso: 400
        }
  */
app.post('/api/carrera/eventos/nuevo', eventosController.nuevoEvento);

/*
Edita un evento
  Entrada: 
        {
           idEvento,    // id del evento a editar, para ubicar el evento <-- Parámetro
           tipoEvento, // carrera o caminata
           nombre,     // carrera o caminata
           descripcion // descripción del evento
        }
  Salida: 
        { success   // éxito: true, fracaso: false
           data        // éxito: null, fracaso: null
           statusCode // éxito: 200, fracaso: 400
        }
  */
app.put('/api/carrera/eventos/editar/:idEvento', eventosController.editarEvento);

/*
Elimina un evento
  Entrada: 
        {
           idEvento    // id del evento a editar, para ubicar el evento
        }
  Salida: 
        { success   // éxito: true, fracaso: false
           data        // éxito: null, fracaso: null
           statusCode // éxito: 200, fracaso: 400
        }
  */
app.delete('/api/carrera/eventos/eliminar/:idEvento', eventosController.eliminarEvento);

/*
Agrega una foto o video a un evento
  Entrada: 
        {
           idEvento,            // id del evento al que se le agregará la foto o video
           tipoContenido,  // 0 si se quiere eliminar una foto, 1 si se quiere eliminar un video
           contenido           //contenido a agregar (foto o video)
        }
  Salida: 
        { 
           success   // éxito: true, fracaso: false
           data        // éxito: null, fracaso: null
           statusCode // éxito: 200, fracaso: 400
        }
  */


app.post('/api/carrera/eventos/contenido/nuevo', eventosController.nuevoContenido);

/*
Elimina una foto o video de un evento
  Entrada: 
        {
           idEvento,          // id del evento a editar, para ubicar el evento
           tipoContenido, // 0 si se quiere eliminar una foto, 1 si se quiere eliminar un video
           idContenido     // id de la foto o video, posición en el array partiendo del hecho de que éstas se guardan dentro de una array de fotos o videos dentro de cada evento
        }
  Salida: 
        { 
           success   // éxito: true, fracaso: false
           data        // éxito: null, fracaso: null
           statusCode // éxito: 200, fracaso: 400
        }
  */
app.delete('/api/carrera/eventos/contenido/eliminar', eventosController.eliminarContenido);

/*
Devuelve todas las fotos o videos de un evento
  Entrada: 
        idEvento,    // id del evento que se busca
        tipoContenido // 0 si se quiere recuperar una foto, 1 si se quiere recuperar un video
  Salida: 
        { success   // éxito: true, fracaso: false
           data        // éxito: array con el contenido solicitado relacionado con el evento también indicado, fracaso: null
           statusCode // éxito: 200, fracaso: 400
        }
  */
app.get('/api/carrera/eventos/contenido/:idEvento/:tipoContenido', eventosController.getContenidoEvento);


/*
Bloquea o desbloquea un usuario
  Entrada: 
        idUsuario,    // id del evento que se busca
        bloqueado // 0 si se quiere desbloquear, 1 si se quiere bloquear
  Salida: 
        { success   // éxito: true, fracaso: false
           data        // éxito: null, fracaso: null
           statusCode // éxito: 200, fracaso: 400
        }
  */
app.put('/api/carrera/usuarios/bloquear', usuariosController.bloquearUsuario);


/*
Otorga o revoca privilegios de administrador de un usuario
  Entrada: 
        idUsuario,    // id del evento que se busca
        admin // 0 si se quiere quitar privilegios de administrador, 1 si se quiere hacer administrador
  Salida: 
        { success   // éxito: true, fracaso: false
           data        // éxito: null, fracaso: null
           statusCode // éxito: 200, fracaso: 400
        }
  */
app.put('/api/carrera/usuarios/admin', usuariosController.hacerAdmin);

/*
Devuelve todos los usuarios
  Entrada: ninguna
  Salida: 
        { success   // éxito: true, fracaso: false
           data        // Array con la información de todos los usuarios
           statusCode // éxito: 200, fracaso: 400
        }
  */
app.get('/api/carrera/usuarios/todos', usuariosController.getUsuarios);


server.listen(port, function(){
  console.log('Server listening on port: ' + port);
});