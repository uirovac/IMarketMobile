$("#principal").live('pageinit', function() {
	$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/productos",{ },getComplementarios);
	$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/productos",{ },getSustitutos);
	$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p1s/root/without/father/11",{ },getCaracteristicas);
	$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p1s/root/without/father/191",{ },getOrigen);

	$("#setDataToServer").click(
			function() {
				if ($("#formulario").validate({
					errorPlacement: function(error, element) {
						if ($(element).is('select')) {
							error.insertAfter($(element).parent());
						}
						else {
							error.insertAfter(element);
						}
					}
				}).form() == true) {
					var aCaracteristica = new Array();
					var i=0;
					$('#caracteristicas select ').each(function(index) {
						aCaracteristica[i++] = this.name + "|" + this.value;
					});
					
					var aSustituto = new Array();
					i=0;
					$('#sustitutos input ').each(function(index) {
						if(this.checked == true) {
							aSustituto[i++] = this.value;
						}
					});
					
					var aComplementario = new Array();
					i=0;
					$('#complementarios input ').each(function(index) {
						if(this.checked == true) {
							aComplementario[i++] = this.value;
						}
					});					
					
					$.ajax({ 
						type: "POST",
						url: "http://localhost:8080/wsfacility/services/producto/save",
						data: { a1:nombre.value,a2:descripcion.value,a3:fecha_creacion.value,
								a4:fecha_vencimiento.value,a5:precio.value,a6:origen.value,
								a7:$('input:radio[name=tipo]:checked').val(), 'a8[]':aCaracteristica,
								'a9[]':aSustituto,'a10[]':aComplementario
						},
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

function getComplementarios (data) {
	var i = 0;
	$.each(data, function(key, val) {
		$.each(val, function(key2, val2) {
			i++;
			html = '';
			html += '<input type="checkbox" name="complementario" id="complementario_'+ i +'" class="custom" value=' + val2[0].value + '>';
			html += '<label for="complementario_'+ i +'">'+ val2[1].value +'</label>';
			$('#complementarios fieldset').append(html);
			$('#complementario_' + val2[0].value).checkboxradio();
		});
	});
	$('#principal').trigger('create');	    		
}

function getSustitutos (data) {
	var i = 0;
	$.each(data, function(key, val) {
		$.each(val, function(key2, val2) {
			i++;
			html = '';
			html += '<input type="checkbox" name="sustituto" id="sustituto_'+ i +'" class="custom" value=' + val2[0].value + '>';
			html += '<label for="sustituto_'+ i +'">'+ val2[1].value +'</label>';
			$('#sustitutos fieldset').append(html);
			$('#sustituto_' + val2[0].value).checkboxradio();
		});
	});
	$('#principal').trigger('create');	    		
}

function getCaracteristicas(data) {
	html = '<div data-role="collapsible" id="atributos" data-theme="b" data-content-theme="d">';
	html +=	 '<h3>Caracteristicas</h3>';
	i = 0;
	$.each(data, function(data, val) {
		if(val.a4 == '11') {
			if( i != 0 ) {
				html += '</select>';
				html += '</div>';
			}
			html += '<div data-role="fieldcontain"  id="atributos'+ val.a1 +'">';
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
	$('#caracteristicas').append(html);
	$('#caracteristicas #atributos').collapsible();
	$('#principal').trigger('create');
}

function getOrigen(data) {
	$.each(data, function(key, val) {
		var valor = "", texto = "";
		$.each(val, function(key2, val2) {
			if(key2=="a1") {
				valor = val2;
			}
			else if(key2=="a2") {
				texto = val2;
			}
		});
		$('#origen').append( $('<option>', {value : valor}).text(texto) );
	});
}

