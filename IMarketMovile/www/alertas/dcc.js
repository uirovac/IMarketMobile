// JavaScript Document
$("#principal").live('pageinit', function() {
		$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p1s/root/without/father/124",{ },getDCC);
		$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/competidores",{ }, getCompetidores);
	});
	
function getCompetidores (data){
	$.each(data, function(key, val) {
		$.each(val, function(key2, val2) {
			$('#competidor').append($('<option>', {value : val2[0].value}).text(val2[1].value));
		});
	});			    		
}

function getDCC(data){
	html = '';
	i = 0;
	$.each(data, function(data, val) {
		if(val.a4 == '124'){
			if( i != 0 ){
				html += '</select>';
				html += '</div>';
			}
			html += '<div data-role="fieldcontain">';
			html += '<label for="'+ val.a1 +'">'+ val.a2 +':</label>';
			if(val.a7 != '0'){
				html += '<select id="'+ val.a1 +'" name="'+ val.a2 + '">';
			}
			else{
				html += '<input type="text" name="'+ val.a2 +'" id="'+ val.a1 +'" value="" />';
			}
		}
		else{
			html += '<option id="'+ val.a1 +'">'+ val.a2 + '</option>';
		}
		i++;
	});
	html += '</select>';
	html += '</div>';
	
	$('#contenido').append(html);
	//$('#segmento #geografica').collapsible();
	$('#principal').trigger('create');
}