// JavaScript Document
$("#principal").live('pageshow', function() {
		$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/productos",{ },getComplementarios);
		$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/productos",{ },getSustitutos);
	});

function getComplementarios (data){
  $.each(data, function(key, val) {
	  $.each(val, function(key2, val2) {
		  html = '';
		  html += '<input type="checkbox" name="complementario" id="complementario_'+ val2[0].value +'" class="custom" />';
		  html += '<label for="complementario_'+ val2[0].value +'">'+ val2[1].value +'</label>';
		  //alert(html);
		  $('#complementarios fieldset').append(html);
		  $('#complementario_' + val2[0].value).checkboxradio();
	  });
  });		
  $('#principal').trigger('create');	    		
	
}

function getSustitutos (data){
  $.each(data, function(key, val) {
	  $.each(val, function(key2, val2) {
		  html = '';
		  html += '<input type="checkbox" name="sustituto" id="sustituto_'+ val2[0].value +'" class="custom" />';
		  html += '<label for="sustituto_'+ val2[0].value +'">'+ val2[1].value +'</label>';
		  //alert(html);
		  $('#sustitutos fieldset').append(html);
		  $('#sustituto_' + val2[0].value).checkboxradio();
	  });
  });		
  $('#principal').trigger('create');	    		
	
}