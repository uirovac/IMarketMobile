// JavaScript Document
$("#fotografia").live('pageshow', function() {
		$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p2s/querys/productos",{ },getProductos);
	});
	
function getProductos(data){
		$.each(data, function(key, val) {
			//alert (val);
			$.each(val, function(key2, val2) {
				//alert(val2);
				$('#producto').append($('<option>', {value : val2[0].value}).text(val2[1].value));
			});
		});			    		
}	

