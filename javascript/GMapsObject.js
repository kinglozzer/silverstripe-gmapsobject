/**
 * File: GMapsObject.js
 */
var ss = ss || {};

ss.hasLoadedGMapsAPI = false;

(function($) {
    $.entwine('ss', function($) {

        /**
         * ID: #GMapsObject_Map
         *
         * Initialise map upon matching appropriate field
         */
        $('#GMapsObject_Map').entwine({
            // Constructor: onmatch
            onmatch: function() {
                if ( ! ss.hasLoadedGMapsAPI) {
                    var script = document.createElement("script"),
                        key = $('.cms-edit-form input[name=GMapAPIKey]').val();

                    script.type = "text/javascript";
                    script.src = "//maps.googleapis.com/maps/api/js?key=" + key + "&sensor=false&callback=initGMapsObject";
                    document.body.appendChild(script);
                    ss.hasLoadedGMapsAPI = true;
                } else {
                    initGMapsObject();
                }
            }
        });
    });
}(jQuery));

function initGMapsObject() {
    (function($) {
        /**
         * Wrapper for Google Maps objects
         */
        ss.GMapsObject = {
            latField: $('.cms-edit-form input[name=GMapLat]'),
            lngField: $('.cms-edit-form input[name=GMapLon]'),
            headingField: $('.cms-edit-form input[name=GMapHeading]'),
            pitchField: $('.cms-edit-form input[name=GMapPitch]'),
            streetViewEnabled: ($('#GMapsObject_StreetView').length !== 0)
        };

        var mapCenter = new google.maps.LatLng(
                (ss.GMapsObject.latField.val()) ? parseFloat(ss.GMapsObject.latField.val()) : 51.511165,
                (ss.GMapsObject.lngField.val()) ? parseFloat(ss.GMapsObject.lngField.val()) : -0.119774
            ),
            mapOptions = {
                zoom: 13,
                center: mapCenter,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            },
            map = new google.maps.Map(document.getElementById('GMapsObject_Map'), mapOptions);

        if (ss.GMapsObject.streetViewEnabled) {
            var panoramaOptions = {
                    position: mapCenter,
                    visible: true,
                    pov: {
                        heading: (ss.GMapsObject.headingField.val()) ? parseFloat(ss.GMapsObject.headingField.val()) : 0,
                        pitch: (ss.GMapsObject.pitchField.val()) ? parseFloat(ss.GMapsObject.pitchField.val()) : 0
                    }
                },
                panorama = new google.maps.StreetViewPanorama(document.getElementById("GMapsObject_StreetView"), panoramaOptions);

            mapOptions.streetViewControl = true;
            mapOptions.streetView = panorama;
            map.setOptions(mapOptions);
            
            google.maps.event.addListener(panorama, "position_changed", function() {
                map.setCenter(panorama.getPosition());
                updateLatLng();
            });
            google.maps.event.addListener(panorama, "pov_changed", updatePOV);
            ss.GMapsObject.marker = panorama;
            ss.GMapsObject.panorama = panorama;
        } else {
            var marker = new google.maps.Marker({
                position: mapCenter,
                map: map,
                draggable: true
            });

            google.maps.event.addListener(marker, 'dragend', updateLatLng);
            ss.GMapsObject.marker = marker;
        }

        ss.GMapsObject.map = map;
        ss.GMapsObject.geocoder = new google.maps.Geocoder();

        $.entwine('ss', function($) {

            /**
             * ID: #Root_GoogleMap[aria-hidden="false"]
             *
             * Redraw map when tab becomes visible. Trigger resize event when switching tabs as
             * map will render at 0 width/height in inactive tabs. Also need to re-center after
             */
            $('#Root_GoogleMap[aria-hidden="false"]').entwine({
                // Constructor: onmatch
                onmatch: function() {
                    var map = ss.GMapsObject.map;
                    google.maps.event.trigger(map, 'resize');

                    if (ss.GMapsObject.streetViewEnabled) {
                        var panorama = ss.GMapsObject.panorama;
                        google.maps.event.trigger(panorama, 'resize');
                    }

                    center = ss.GMapsObject.marker.getPosition();
                    map.panTo(center);
                }
            });

            /**
             * Class: .cms-edit-form input[name=SearchAddress]
             *
             * Bind events for geocoding address
             */
            $('.cms-edit-form input[name=SearchAddress]').entwine({
                // Constructor: onmatch
                onmatch: function() {
                    var self = this;

                    this.bind('keypress blur', function(e) {
                        if (d) clearTimeout(d);
                        // Set timeout to prevent lots of maps API requests
                        var d = setTimeout(function() {
                            geocodePosition(self.val());
                        }, 500);
                    });
                }
            });
        });
    }(jQuery));
}

/**
 * Updates the hidden fields for coordinates and triggers an onchange event as
 * 3.1's changetracker needs that event to pick up the changes
 */
function updateLatLng() {
    var latLng = ss.GMapsObject.marker.getPosition();

    // Check if the value has actually changed - as panorama triggers this onload
    if (latLng.lat() !== parseFloat(ss.GMapsObject.latField.val()) &&
        latLng.lng() !== parseFloat(ss.GMapsObject.lngField.val())
    ) {
        ss.GMapsObject.latField.val(latLng.lat()).change();
        ss.GMapsObject.lngField.val(latLng.lng()).change();
    }
}

/**
 * Update the heading and pitch values when moving around in street view
 */
var povTimeout;
function updatePOV() {
    if (povTimeout) clearTimeout(povTimeout);

    povTimeout = setTimeout(function() {
       var pov = ss.GMapsObject.marker.getPov();
        ss.GMapsObject.headingField.val(pov.heading).change();
        ss.GMapsObject.pitchField.val(pov.pitch).change();
    }, 100);
}

/**
 * Converts an address/location into a LatLng object and updates map & hidden
 * fields with coordinates
 */
function geocodePosition(address) {
    ss.GMapsObject.geocoder.geocode({
            'address': address
        }, function(responses) {
            if (responses && responses.length > 0) {
                var lat = responses[0].geometry.location.lat(),
                    lng = responses[0].geometry.location.lng(),
                    center = new google.maps.LatLng(lat, lng);

                ss.GMapsObject.map.setCenter(center);
                ss.GMapsObject.marker.setPosition(center);
                updateLatLng();
            }
        }
    );
}
