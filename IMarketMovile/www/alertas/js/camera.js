capturePhotoEdit = function(source) {
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		quality : 50,
		destinationType : destinationType.DATA_URL,
		sourceType : source
	});
}
	
onFail = function(message) {
	alert('Failed because: ' + message);
}
	
onPhotoDataSuccess = function(imageData) {
	var capturefacing = document.getElementById('capturefacing');
	capturefacing.style.display = 'block';
	capturefacing.src = "data:image/jpeg;base64," + imageData;
	facingImage = imageData;
}