<?php

$mapKey = 'YOUR-MAPS-API-BROWSER-KEY-HERE';
LeftAndMain::require_javascript('http://maps.googleapis.com/maps/api/js?key='.$mapKey.'&sensor=false');
LeftAndMain::require_javascript('SilverStripe-GMapsContactPage/javascript/jsInit.js');