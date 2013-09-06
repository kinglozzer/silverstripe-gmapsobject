<?php

/**
 * Additional site settings for Google Maps
 */
class GMapsObjectSettings extends DataExtension {

	private static $db = array(
		'GMapsAPIKey' => 'Varchar(255)',
		'GMapsEnableStreetView' => 'Boolean'
	);

	/**
	 * @param FieldList $fields
	 */
	public function updateCMSFields(FieldList $fields) {
		$apiKeyField = new TextField('GMapsAPIKey', 'Google API Key');
		$streetViewField = new DropdownField(
			'GMapsEnableStreetView',
			'Enable street view?',
			array(0 => 'No', 1 => 'Yes')
		);
		$fields->addFieldToTab('Root.Google Maps', $apiKeyField);
		$fields->addFieldToTab('Root.Google Maps', $streetViewField);
	}

}