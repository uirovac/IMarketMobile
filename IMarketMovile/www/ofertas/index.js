//Librerias
function getParamEdad (
$.getJSON("http://facility.ejedigital.cl/wsfacility/services/p1s/root/81",
		  { },
		  function(data) {
			$.each(data, function(key, val) {
				$.each(val, function(key2, val2) {
					$('#edad').append($('<option>', {value : val2.a1}).text(val2.a2));
					
					/*console.log(
						"[" + key2 + "]" + 
						"id : " + val2.a1 + 
						" nombre : " + val2.a2 + 
						" descripcion : " + val2.a3 + 
						" padre : " + val2.a4 + 
						" nivel : " + val2.a5 + 
						" idioma : " + val2.a6);*/
				});
			});			    		
		}
	);
	

	
)