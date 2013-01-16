//Librerias
$("#principal").live('pageinit', function() {
	$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p1s/root/without/father/143",{ },getSocioeconomica);
	$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p1s/root/without/father/59",{ },getGeografica);
	$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p1s/root/without/father/80",{ },getDemografica);
	$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/competidores",{ },getCompetidores);
	$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/mercados",{ },getMercados);
	$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p1s/root/without/father/124",{ },getCaracteristicasLocal);
	$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/establecimientos",{ }, getLocal);

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
					var aCompetidor = new Array();
					var i=0;
					$('#competidores input ').each(function(index) {
						aCompetidor[i++] = this.value;
					});					
					direccion = calle.value + ' ' + numero.value + ', ' + comuna.value + ', ' + region.value + ', ' + pais.value;
					mostrarCoordenadas(direccion);
					$.ajax({ 
						type: "POST",
						url: "http://localhost:8080/wsfacility/services/puntoventa/save",
						data: { a1:mercado.value,a2:"1",a3:nombre.value,a4:local.value,a5:posLatitud,a6:posLongitud,a7:direccion,
								a8:empresa.value,a9:facingImage,'a10[]':aCompetidor},
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
			html += '<label for="'+ val.a1 +'">'+ val.a2 +':</label>';
			html += '<select id="'+ val.a1 +'" name="'+ val.a2 + '" class="required">';
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
			html += '<label for="'+ val.a1 +'">'+ val.a2 +':</label>';
			html += '<select id="'+ val.a1 +'" name="'+ val.a2 + '" class="required">';
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
			html += '<label for="'+ val.a1 +'">'+ val.a2 +':</label>';
			html += '<select id="'+ val.a1 +'" name="'+ val.a2 + '" class="required">';
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

function getCompetidores (data) {
	//Competencia
	i=0;
	$.each(data, function(key, val) {
		$.each(val, function(key2, val2) {
			i++;
			html = '';
			html += '<input type="checkbox" name="competidor" id="competidor_'+ i +'" class="custom" value="'+ val2[0].value +'"/>';
			html += '<label for="competidor_'+ i +'">'+ val2[1].value +'</label>';
			$('#competidores fieldset').append(html);
			$('#competidor_' + val2[0].value).checkboxradio();
		});
	});		
	$('#principal').trigger('create');
	
	//Empresa perteneciente
	$.each(data, function(key, val) {
		$.each(val, function(key2, val2) {
			$('#empresa').append($('<option>', {value : val2[0].value}).text(val2[1].value));
		});
	});		
}

function getMercados(data) {
	$.each(data, function(key, val) {
		$.each(val, function(key2, val2) {
			$('#mercado').append($('<option>', {value : val2[0].value}).text(val2[1].value));
		});
	});			    		
}

function getCaracteristicasLocal(data) {
	html = '<div data-role="collapsible" id="contenido" data-theme="b" data-content-theme="d">';
	html +=	 '<h3>Caracteristicas Local</h3>';
	i = 0;
	$.each(data, function(data, val) {
		if(val.a4 == '124') {
			if( i != 0 ) {
				html += '</select>';
				html += '</div>';
			}
			html += '<div data-role="fieldcontain">';
			html += '<label for="'+ val.a1 +'">'+ val.a2 +':</label>';
			if(val.a7 != '0') {
				html += '<select id="'+ val.a1 +'" name="'+ val.a2 + '" class="required">';
				html += '<option value="" selected>Elegir '+ val.a2 + '</option>';
			}
			else{
				html += '<input type="text" name="'+ val.a2 +'" id="'+ val.a1 +'" value="" class="required" />';
			}
		}
		else{
			html += '<option id="'+ val.a1 +'">'+ val.a2 + '</option>';
		}
		i++;
	});
	html += '</select>';
	html += '</div>';
	$('#caracteristicas').append(html);
	$('#principal').trigger('create');
}

function getLocal(data) {
	$.each(data, function(key, val) {
		$.each(val, function(key2, val2) {
			$('#local').append($('<option>', {value : val2[0].value}).text(val2[1].value));
		});
	});
}