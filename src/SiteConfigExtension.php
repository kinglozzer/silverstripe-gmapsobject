<?php

namespace Kinglozzer\SilverStripeGMapsObject;

use SilverStripe\Core\Extension;
use SilverStripe\Forms\DropdownField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TextField;

/**
 * Additional site settings for Google Maps
 */
class SiteConfigExtension extends Extension
{
    private static $db = [
        'GMapsAPIKey' => 'Varchar(255)',
        'GMapsEnableStreetView' => 'Boolean'
    ];

    /**
     * @param FieldList $fields
     */
    public function updateCMSFields(FieldList $fields)
    {
        $fields->addFieldsToTab(
            'Root.Google Maps',
            [
                TextField::create('GMapsAPIKey', 'Google API Key'),
                DropdownField::create(
                    'GMapsEnableStreetView',
                    'Enable street view?',
                    [0 => 'No', 1 => 'Yes']
                )
            ]
        );
    }
}
