<?php

class GMapsPageExtension extends DataExtension {

	public static $db = array(
		'GMapLat' => 'Float(23,20)',
		'GMapLon' => 'Float(23,20)'
	);

	public function updateCMSFields(FieldList $fields) {
		$GMapLatField = new HiddenField('GMapLat');
		$GMapLonField = new HiddenField('GMapLon');
		$mapField = new LiteralField("gMapTemplate", $this->owner->renderWith('gMap'));

		$fields->addFieldToTab('Root.Google Map', $GMapLatField);
		$fields->addFieldToTab('Root.Google Map', $GMapLonField);
		$fields->addFieldToTab('Root.Google Map', $mapField);

		return $fields;
	}

}