$(function() {
	$("#setDataToServer").click(
		function() {
			var direccion = document.getElementById("direccion_fisica").value;
			$.ajax({ 
				type: "POST",
				url: "http://facility.ejedigital.cl/wsfacility/services/upload/facing",
				data: { a1 : facingImage, a2 : "1", a3 : "Nada por el momento", a4 : pto_de_vta, a5 : producto, a6 : posLatitud, a7 : posLongitud, a8 : direccion },
				crossDomain : true,
				success: function(data,status,jqXHR) { }
			})
		});		
});

$("#principal").live('pageinit', function() {
		$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/productos",{ }, getProductos);
		$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/puntoventas",{ }, getPtoDeVtas);
		$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/competidores",{ }, getCompetidores);
		getFechaActual();
	});
	
function getProductos (data){
	$.each(data, function(key, val) {
		$.each(val, function(key2, val2) {
			$('#producto').append($('<option>', {value : val2[0].value}).text(val2[1].value));
		});
	});			    		
}

function getPtoDeVtas (data){
	$.each(data, function(key, val) {
		$.each(val, function(key2, val2) {
			$('#pto_de_vta').append($('<option>', {value : val2[0].value}).text(val2[1].value));
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

function getFechaActual(){
	f = new Date();
	$('#fecha').val(f.getFullYear() + '/' + (f.getMonth() +1) + '/' + f.getDate());
}
