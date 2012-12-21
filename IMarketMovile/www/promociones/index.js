// JavaScript Document
$("#principal").live('pageshow', function() {
		$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/productos",{ },getProductos);
	});

function getProductos (data){
  $.each(data, function(key, val) {
	  $.each(val, function(key2, val2) {
		  html = '';
		  html += '<input type="checkbox" name="producto" id="producto_'+ val2[0].value +'" class="custom" />';
		  html += '<label for="producto_'+ val2[0].value +'">'+ val2[1].value +'</label>';
		  //alert(html);
		  $('#producto_servicio fieldset').append(html);
		  $('#producto_' + val2[0].value).checkboxradio();
	  });
  });		
  $('#principal').trigger('create');	    		
	
}

