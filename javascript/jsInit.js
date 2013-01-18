jQuery('#Form_EditForm_ClassName[value="ContactPage"]').entwine({
	onmatch : function() {
		initialiseMap();
	}
});

var d;
var storedLocation = false;

var initialiseMap = function initialiseMap() {

	if (jQuery("#Form_EditForm_GMapLat").val()) {
		var lat = parseFloat(jQuery("#Form_EditForm_GMapLat").val());
		storedLocation = true;
	} else {
		var lat = 52.3932; // Default latitude if not saved in database
	}

	if (jQuery("#Form_EditForm_GMapLon").val()) {
		var lng = parseFloat(jQuery("#Form_EditForm_GMapLon").val());
		storedLocation = true;
	} else {
		var lng = 0.682; // Default longitude if not saved in database
	} 
	
	var myLatlng = new google.maps.LatLng(lat, lng);
	var myOptions = {	
		zoom: (storedLocation) ? 15 : 11,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById('googlemap'), myOptions);

	marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		draggable: true
	});
	
	google.maps.event.addListener(marker, 'dragend', function() {
		updateMarkerPosition(marker.getPosition());
	});
	
	jQuery('#SearchAddress').bind('keypress blur', function(e) {
		if (d) clearTimeout(d);
		d = setTimeout(function() {
			geocodePosition(jQuery('#SearchAddress').val());
			e.preventDefault();
		}, 500);
	});

	jQuery('a[href="#Root_GoogleMap"]').bind('click', function() {
		// Sometimes needs slight delay or function is called before tab has loaded
		setTimeout(function() {
			initialiseMap();
		}, 10);
	});
}

function updateMarkerPosition(latLng) {
	jQuery('#Form_EditForm_GMapLat').val(latLng.lat());
	jQuery('#Form_EditForm_GMapLon').val(latLng.lng());
}

function geocodePosition(pos) {
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({'address': pos}, 
	function(responses) {
		if (responses && responses.length > 0) {
			var lat = responses[0].geometry.location.lat();
			var lng = responses[0].geometry.location.lng();
			var center = new google.maps.LatLng(lat, lng);
			jQuery('#Form_EditForm_GMapLat').val(lat);
			jQuery('#Form_EditForm_GMapLon').val(lng);
			map.setCenter(center);
			marker.setPosition(center);
		}
	});
}