<?php

class ContactPage extends Page {

	public static $db = array(
		'GMapLat' => 'Float(23,20)',
		'GMapLon' => 'Float(23,20)'
	);

	public function getCMSFields() {
		$fields = parent::getCMSFields();


		$GMapLatField = new HiddenField('GMapLat');
		$GMapLonField = new HiddenField('GMapLon');
		$mapField = new LiteralField("gMapTemplate", $this->renderWith('gMap'));		

		$fields->addFieldToTab('Root.Google Map', $GMapLatField);
		$fields->addFieldToTab('Root.Google Map', $GMapLonField);
		$fields->addFieldToTab('Root.Google Map', $mapField);

		return $fields;
	}

}

class ContactPage_Controller extends Page_Controller {



}