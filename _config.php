<?php

$mapKey = 'YOUR-MAPS-API-BROWSER-KEY-HERE';
LeftAndMain::require_javascript('http://maps.googleapis.com/maps/api/js?key='.$mapKey.'&sensor=false');
LeftAndMain::require_javascript('SilverStripe-GMapsPage/javascript/jsInit.js');

// Swap in the page type you wish to have a Google Map on
// Object::add_extension('DevelopmentPage', 'GMapsPageExtension');