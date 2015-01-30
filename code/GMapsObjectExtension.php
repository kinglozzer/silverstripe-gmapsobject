<?php

/**
 * Additional database/form fields to hold map information
 */
class GMapsObjectExtension extends DataExtension {

	public static $db = array(
		'GMapLat' => 'Varchar',
		'GMapLon' => 'Varchar',
		'GMapHeading' => 'Varchar',
		'GMapPitch' => 'Varchar'
	);

	/**
	 * @param FieldList $fields
	 */
	public function updateCMSFields(FieldList $fields) {
		$config = SiteConfig::current_site_config();

		if ($mapKey = $config->GMapsAPIKey) {
			Requirements::javascript(GMAPSOBJECT_DIR . '/javascript/GMapsObject.js');

			$GMapAPIKeyField = new HiddenField('GMapAPIKey', 'GMapAPIKey', $mapKey);
			$GMapLatField = new HiddenField('GMapLat');
			$GMapLonField = new HiddenField('GMapLon');
			$GMapHeadingField = new HiddenField('GMapHeading');
			$GMapPitchField = new HiddenField('GMapPitch');
			$data = array('EnableStreetView' => $config->GMapsEnableStreetView);
			$mapField = new LiteralField("GMapTemplate", $this->owner->renderWith('GMapsObject_Fields', $data));

			$fields->addFieldToTab('Root.Google Map', $GMapAPIKeyField);
			$fields->addFieldToTab('Root.Google Map', $GMapLatField);
			$fields->addFieldToTab('Root.Google Map', $GMapLonField);
			$fields->addFieldToTab('Root.Google Map', $GMapHeadingField);
			$fields->addFieldToTab('Root.Google Map', $GMapPitchField);
			$fields->addFieldToTab('Root.Google Map', $mapField);
		} else {
			$fields->addFieldToTab('Root.GoogleMap', new LiteralField("GMapWarning", $this->owner->renderWith('GMapsObject_Warning')));
		}

		return $fields;
	}

	public function onBeforeWrite() {
		if( ! $this->owner->GMapLat) {
			$this->owner->GMapLat = '51.511165';
		}

		if( ! $this->owner->GMapLon) {
			$this->owner->GMapLon = '-0.119774';
		}
	}

}