var datos;

exports.Constructor = function(modelo){
	datos = modelo;
};


exports.index = function(req, res){
	datos.find({}, function(error, fulano){
		if(error){
			res.send('Ha surgido un error.');
		}else{
			res.render('index', {
				datos: fulano
			});
		}
	})
};


exports.create = function(req, res){
	res.render('save', {
		put: false,
		action: '/',
		datos: new datos({
			nombre: '',
			apellido: '',
			biografia: '',
			edad: 0
		})
	});
	req.session.datos = {
			nombre: '',
			apellido: '',
			biografia: '',
			edad: 0
	};
	console.log(req.session.datos);
};


exports.store = function(req, res){
	var datoss = new datos({
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		biografia: req.body.biografia,
		edad: req.body.edad
	});
	datoss.save(function(error, documento){
		if(error){
			res.send('Error al intentar guardar el personaje.');
			console.log(error)
		}else{
			req.session.datos = documento;
			console.log(req.session.datos);
			res.redirect('/');
		}
	});
};


exports.show = function(req, res){
	datos.findById(req.params.id, function(error, documento){
		if(error){
			res.send('Error al intentar ver el personaje.');
		}else{
			req.session.datos = documento;
			console.log(req.session.datos.nombre);
			res.render('show', {
				datos: documento
			});
		}
	});
};


exports.edit = function(req, res){
	datos.findById(req.params.id, function(error, documento){
		if(error){
			res.send('Error al intentar ver el personaje.');
		}else{
			res.render('save', {
				put: true,
				action: '/' + req.params.id,
				datos: documento
			});
		}
	});
};


exports.update = function(req, res){
	datos.findById(req.params.id, function(error, documento){
		if(error){
			res.send('Error al intentar modificar el personaje.');
		}else{
			var datos = documento;
			datos.nombre = req.body.nombre;
			datos.apellido = req.body.apellido;
			datos.biografia = req.body.biografia;
			datos.edad = req.body.edad;
			datos.save(function(error, documento){
				if(error){
					res.send('Error al intentar guardar el personaje.');
				}else{	
					res.redirect('/');
				}
			});
		}
	});
};


exports.destroy = function(req, res){
	datos.remove({_id: req.params.id}, function(error){
		if(error){
			res.send('Error al intentar eliminar el personaje.');
		}else{	
			res.redirect('/');
		}
	});
};
