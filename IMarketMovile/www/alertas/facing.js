// JavaScript Document
$(function() {
	$("#setDataToServer").click(
		function() {
			var direccion = document.getElementById("direccion_fisica").value;
			$.ajax({ 
				type: "POST",
				url: "http://facility.ejedigital.cl/wsfacility/services/upload/imgdata",
				data: { a1 : facingImage, a2 : "1", a3 : "Nada por el momento", a4 : pto_de_vta, a5 : producto, a6 : posLatitud, a7 : posLongitud, a8 : direccion },
				crossDomain : true,
				success: function(data,status,jqXHR) { }
			})
		});		
});

$("#principal").live('pageinit', function() {
		$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/competidores",{ }, getCompetidores);
		$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/establecimientos",{},loadOne);
		getFechaActual();
});

function loadOne(data) {
	getLocal(data);
	$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/puntoventas",{},loadTwo);	
}

function loadTwo(data) {
	getPtoVenta(data);
	$("#punto_de_venta").chained("#local");
	$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/productos",{},loadTree);
}

function loadTree(data) {
	getProductos(data);
	$("#producto").chained("#punto_de_venta");
}

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
			$('#punto_de_venta').append($('<option>', {value : val2[0].value}).addClass( val2[5].value).text(val2[1].value));
		});
	});			    		
}

function getProductos(data) {
	$.each(data, function(key, val) {
		$.each(val, function(key2, val2) {
			$('#producto').append($('<option>', {value : val2[0].value}).addClass( val2[3].value).text(val2[1].value));
		});
	});
}

function getCompetidores (data) {
	$.each(data, function(key, val) {
		$.each(val, function(key2, val2) {
			$('#competidor').append($('<option>', {value : val2[0].value}).text(val2[1].value));
		});
	});			    		
}

function getFechaActual() {
	f = new Date();
	$('#fecha').val(f.getFullYear() + '/' + (   (f.getMonth() + 1)  ) + '/' +  f.getDate()     );
}