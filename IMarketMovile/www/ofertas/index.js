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
					$.ajax({ 
						type: "POST",
						url: "http://localhost:8080/wsfacility/services/oferta/save",
						data: { a1:nombre.value,a2:descripcion.value,a3:fecha_inicio.value,a4:fecha_termino.value,a5:local.value,a6:punto_de_venta.value,"a7":producto.value,
								a8:precio_base.value,a9:nuevo_precio.value,a10:facingImage},
						crossDomain : true,
						success: function(data,status,jqXHR) { 
							alert("Sus datos fueron grabados con exito" + status);
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) { },
						complete: function(data) {
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
