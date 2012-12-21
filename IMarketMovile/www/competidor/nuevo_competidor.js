//Librerias
$("#principal").live('pageinit', function() {
	$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/establecimientos",{},getLocal);
	$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/puntoventas",{},getPtoVenta);
	$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/productos",{},getProductos);
});	

function getLocal(data) {
	$.each(data, function(key, val) {
		$.each(val, function(key2, val2) {
			$('#local').append($('<option>', {value : val2[0].value}).text(val2[1].value));
		});
	});			    		
}

function getPtoVenta(data) {
	$.each(data, function(key, val) {
		$.each(val, function(key2, val2) {
			$('#punto_de_venta').append($('<option>', {value : val2[0].value}).text(val2[1].value));
		});
	});			    		
}

function getProductos(data) {
	$.each(data, function(key, val) {
		$.each(val, function(key2, val2) {
			$('#producto_servicio').append($('<option>', {value : val2[0].value}).text(val2[1].value));
		});
	});
}


