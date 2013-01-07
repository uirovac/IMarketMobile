// JavaScript Document
$("#principal").live('pageinit', function() {
		$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p1s/root/without/father/124",{ },getDCC);
		$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/competidores",{ }, getCompetidores);
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
							url: "http://facility.ejedigital.cl/wsfacility/services/????",
							data: { a1 : null, a2 : "1", a3 : "", a4 : null, a5 : null, a6 : null, a7 : null, a8 : null },
							crossDomain : true,
							success: function(data,status,jqXHR) { }
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

function getCompetidores (data) {
	$.each(data, function(key, val) {
		$.each(val, function(key2, val2) {
			$('#competidor').append($('<option>', {value : val2[0].value}).text(val2[1].value));
		});
	});			    		
}

function getDCC(data) {
	html = '';
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
				html += '<select id="'+ val.a1 +'" name="'+ val.a2 + '">';
			}
			else {
				html += '<input type="text" name="'+ val.a2 +'" id="'+ val.a1 +'" value="" />';
			}
		}
		else {
			html += '<option id="'+ val.a1 +'">'+ val.a2 + '</option>';
		}
		i++;
	});
	html += '</select>';
	html += '</div>';
	
	$('#contenido').append(html);
	$('#principal').trigger('create');
}