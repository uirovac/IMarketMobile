// JavaScript Document
$("#principal").live('pageshow', function() {
	$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p1s/root/without/father/59",{ },getGeografica);
	$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p1s/root/without/father/80",{ },getDemografica);
	$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p1s/root/without/father/143",{ },getSocioeconomica);
	$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/competidores",{ },getCompetidores);
	$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/productos",{ },getProductos);
});

function getCompetidores (data){
	$.each(data, function(key, val) {
		$.each(val, function(key2, val2) {
			$('#competidor').append($('<option>', {value : val2[0].value}).text(val2[1].value));
		});
	});			    		
}

function getProductos(data){
		$.each(data, function(key, val) {
			$.each(val, function(key2, val2) {

				$('#producto').append($('<option>', {value : val2[0].value}).text(val2[1].value));
			});
		});			    		
}

function getGeografica(data){
	html = '<div data-role="collapsible" id="geografica" data-theme="b" data-content-theme="d">';
	html +=	 '<h3>Geográfica</h3>';
	i = 0;
	$.each(data, function(data, val) {
		if(val.a4 == '59'){
			if( i != 0 ){
				html += '</select>';
				html += '</div>';
			}
			html += '<div data-role="fieldcontain"  id="geografica_'+ val.a1 +'">';
			html += '<label for="'+ val.a1 +'">'+ val.a2 +':</label>';
			html += '<select id="'+ val.a1 +'" name="'+ val.a2 + '">';
		}
		else{
			html += '<option id="'+ val.a1 +'">'+ val.a2 + '</option>';
		}
		i++;
	});
	html += '</select>';
	html += '</div>';
	
	$('#segmento').append(html);
	$('#segmento #geografica').collapsible();
	$('#principal').trigger('create');
}

function getDemografica(data){

	html = '<div data-role="collapsible" id="demografica" data-theme="b" data-content-theme="d">';
	html +=	 '<h3>Demográfica</h3>';
	i = 0;
	$.each(data, function(data, val) {
		if(val.a4 == '80'){
			if( i != 0 ){
				html += '</select>';
				html += '</div>';
			}
			html += '<div data-role="fieldcontain"  id="demografica_'+ val.a1 +'">';
			html += '<label for="'+ val.a1 +'">'+ val.a2 +':</label>';
			html += '<select id="'+ val.a1 +'" name="'+ val.a2 + '">';
		}
		else{
			html += '<option id="'+ val.a1 +'">'+ val.a2 + '</option>';
		}
		i++;
	});
	html += '</select>';
	html += '</div>';
	
	$('#segmento').append(html);
	$('#segmento #demografica').collapsible();
	$('#principal').trigger('create');
}

function getSocioeconomica(data){

	html = '<div data-role="collapsible" id="demografica" data-theme="b" data-content-theme="d">';
	html +=	 '<h3>Socioeconómica</h3>';
	i = 0;
	$.each(data, function(data, val) {
		if(val.a4 == '143'){
			if( i != 0 ){
				html += '</select>';
				html += '</div>';
			}
			html += '<div data-role="fieldcontain"  id="socioeconomica_'+ val.a1 +'">';
			html += '<label for="'+ val.a1 +'">'+ val.a2 +':</label>';
			html += '<select id="'+ val.a1 +'" name="'+ val.a2 + '">';
		}
		else{
			html += '<option id="'+ val.a1 +'">'+ val.a2 + '</option>';
		}
		i++;
	});
	html += '</select>';
	html += '</div>';
	
	$('#segmento').append(html);
	$('#segmento #socioeconomica').collapsible();
	$('#principal').trigger('create');
}