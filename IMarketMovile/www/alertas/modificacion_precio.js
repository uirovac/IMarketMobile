// JavaScript Document
$("#principal").live('pageinit', function() {
		$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/productos",{ },getProductos);
		$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/competidores",{ }, getCompetidores);
	});

function getProductos(data){
		$.each(data, function(key, val) {
			$.each(val, function(key2, val2) {

				$('#producto').append($('<option>', {value : val2[0].value}).text(val2[1].value));
			});
		});			    		
}

function getCompetidores (data){
	$.each(data, function(key, val) {
		$.each(val, function(key2, val2) {
			$('#competidor').append($('<option>', {value : val2[0].value}).text(val2[1].value));
		});
	});			    		
}