//Librerias
$("#principal").live('pageinit', function() {
		$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/productos",{ },getProductos);
		$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p1s/root/without/father/59",{ },getGeografica);
		$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p1s/root/without/father/80",{ },getDemografica);
		$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p1s/root/without/father/143",{ },getSocioeconomica);
		
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
					var i=0
					var asocioeconomica = new Array();
					$("#socioeconomica select ").each(function(index) {
						asocioeconomica[i] = this.name + "|" + this.value;
						alert(asocioeconomica[i++]);
					});	
					
					i=0;
					var ageografica = new Array();
					$("#geografica select ").each(function(index) {
						ageografica[i++] = this.name + "|" + this.value;
					});	
					
					i=0
					var ademografica = new Array();
					$("#demografica select ").each(function(index) {
						ademografica[i++] = this.name + "|" + this.value;
					});	
					
					i=0
					var aProducto = new Array();
					$("#producto_servicio input ").each(function(index) {
						aProducto[i++] = this.value;
					});	
					$.ajax({ 
						type: "POST",
						url: "http://localhost:8080/wsfacility/services/cliente/save",
						data: { a1:nombre.value,a2:identificacion.value,a3:correo.value,a4:telefono.value,a5:$('input:radio[name=tipo]:checked').val(),     
								a6:posLatitud,a7:posLongitud,a8:direccion,'a9[]':aProducto,
								'a10[]':asocioeconomica,'a11[]':ageografica,'a12[]':ademografica},
						crossDomain : true,
						success: function(data,status,jqXHR) { 
							alert("Sus datos fueron grabados con exito" + status);
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) { },
						complete: function(data) {
							top.location.href = "../index.html#procesos_competencia";
						}
					})
				}
		});			
});

function getProductos (data) {
	$.each(data, function(key, val) {
		$.each(val, function(key2, val2) {
			html = '';
			html += '<input type="checkbox" name="producto" id="producto_'+ val2[0].value +'" class="custom" value="'+ val2[0].value +'" />';
			html += '<label for="producto_'+ val2[0].value +'">'+ val2[1].value +'</label>';
			$('#producto_servicio fieldset').append(html);
			$('#producto_' + val2[0].value).checkboxradio();
		});
	});		
	$('#principal').trigger('create');	    		
}

function getGeografica(data) {
	html = '<div data-role="collapsible" id="geografica" data-theme="b" data-content-theme="d">';
	html +=	 '<h3>Geográfica</h3>';
	i = 0;
	$.each(data, function(data, val) {
		if(val.a4 == '59') {
			if( i != 0 ) {
				html += '</select>';
				html += '</div>';
			}
			html += '<div data-role="fieldcontain"  id="geografica_'+ val.a1 +'">';
			html += '<label for="'+ val.a2 +'">'+ val.a2 +':</label>';
			html += '<select id="'+ val.a2 +'" name="'+ val.a1 + '" class="required">';
			html += '<option value="" selected>Elegir '+ val.a2 + '</option>';
		}
		else {
			html += '<option value="'+ val.a1 +'">'+ val.a2 + '</option>';
		}
		i++;
	});
	html += '</select>';
	html += '</div>';
	
	$('#segmento').append(html);
	$('#segmento #geografica').collapsible();
	$('#principal').trigger('create');
}

function getDemografica(data) {
	html = '<div data-role="collapsible" id="demografica" data-theme="b" data-content-theme="d">';
	html +=	 '<h3>Demográfica</h3>';
	i = 0;
	$.each(data, function(data, val) {
		if(val.a4 == '80') {
			if( i != 0 ) {
				html += '</select>';
				html += '</div>';
			}
			html += '<div data-role="fieldcontain"  id="demografica_'+ val.a1 +'">';
			html += '<label for="'+ val.a2 +'">'+ val.a2 +':</label>';
			html += '<select id="'+ val.a2 +'" name="'+ val.a1 + '" class="required">';
			html += '<option value="" selected>Elegir '+ val.a2 + '</option>';
		}
		else {
			html += '<option value="'+ val.a1 +'"  >'+ val.a2 + '</option>';
		}
		i++;
	});
	html += '</select>';
	html += '</div>';
	
	$('#segmento').append(html);
	$('#segmento #demografica').collapsible();
	$('#principal').trigger('create');
}

function getSocioeconomica(data) {
	html = '<div data-role="collapsible" id="socioeconomica" data-theme="b" data-content-theme="d">';
	html +=	 '<h3>SocioEconomica</h3>';
	i = 0;
	$.each(data, function(data, val) {
		if(val.a4 == '143') {
			if( i != 0 ) {
				html += '</select>';
				html += '</div>';
			}
			html += '<div data-role="fieldcontain"  id="socioeconomica'+ val.a1 +'">';
			html += '<label for="'+ val.a2 +'">'+ val.a2 +':</label>';
			html += '<select id="'+ val.a2 +'" name="'+ val.a1 + '" class="required">';
			html += '<option value="" selected>Elegir '+ val.a2 + '</option>';
		}
		else {
			html += '<option value="'+ val.a1 +'"  >'+ val.a2 + '</option>';
		}
		i++;
	});
	html += '</select>';
	html += '</div>';
	$('#segmento').append(html);
	$('#segmento #socioeconomica').collapsible();
	$('#principal').trigger('create');
}
	

	