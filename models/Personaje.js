
var mongoose = require('mongoose');

var PersonajeSchema = mongoose.Schema({

	nombre: {type: String, required: true},
	apellido: {type: String, required: true},
	biografia: {type: String, required: true},
	edad: 	{type: Number, required: true}

});

module.exports = mongoose.model('ok', PersonajeSchema);