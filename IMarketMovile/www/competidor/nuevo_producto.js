//JavaScript Document
$("#principal").live('pageshow', function() {
	$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/productos",{ },getComplementarios);
	$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/productos",{ },getSustitutos);
	$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p1s/root/without/father/11",{ },getCaracteristicas);

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
						url: "http://facility.ejedigital.cl/wsfacility/services/????",
						data: { a1 : null, a2 : "1", a3 : "", a4 : null, a5 : null, a6 : null, a7 : null, a8 : null },
						crossDomain : true,
						success: function(data,status,jqXHR) { }
					})
				}
	});	
});

function getComplementarios (data) {
	$.each(data, function(key, val) {
		$.each(val, function(key2, val2) {
			html = '';
			html += '<input type="checkbox" name="complementario" id="complementario_'+ val2[0].value +'" class="custom" />';
			html += '<label for="complementario_'+ val2[0].value +'">'+ val2[1].value +'</label>';
			$('#complementarios fieldset').append(html);
			$('#complementario_' + val2[0].value).checkboxradio();
		});
	});		
	$('#principal').trigger('create');	    		
}

function getSustitutos (data) {
	$.each(data, function(key, val) {
		$.each(val, function(key2, val2) {
			html = '';
			html += '<input type="checkbox" name="sustituto" id="sustituto_'+ val2[0].value +'" class="custom" />';
			html += '<label for="sustituto_'+ val2[0].value +'">'+ val2[1].value +'</label>';
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
	$('#caracteristicas').append(html);
	$('#caracteristicas #atributos').collapsible();
	$('#principal').trigger('create');
}

