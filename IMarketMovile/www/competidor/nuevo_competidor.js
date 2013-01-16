//Librerias
$("#principal").live('pageinit', function() {
	$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/establecimientos",{},loadOne);
	
	$("#setDataToServer").click(
			function() {
				if ($('#formulario').validate({
					errorPlacement: function(error, element) {
						if ($(element).is('select')) {
							error.insertAfter($(element).parent());
						}
						else {
							error.insertAfter(element);
						}
					}
				}).form() == true) {
					direccion = calle.value + ' ' + numero.value + ', ' + comuna.value + ', ' + region.value + ', ' + pais.value;
					mostrarCoordenadas(direccion);
					$.ajax({ 
						type: "POST",
						url: "http://facility.ejedigital.cl/wsfacility/services/competitor/save",
						data: { a1:nombre.value,a2:descripcion.value,a3:local.value,a4:punto_de_venta.value,a5:producto.value,a6:representante_legal.value,a7:giro.value,a8:direccion,a9:posLatitud,a10:posLongitud },
						crossDomain : true,
						success: function(data,status,jqXHR) { 
							alert("Sus datos fueron grabados con exito" + status);
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) { },
						complete: function(data) {
							alert("Sus datos fueron grabados con exito");
							top.location.href = "index.html";
						}
					})
				}
		});		
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


