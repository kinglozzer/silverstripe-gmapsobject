<?php

namespace Kinglozzer\SilverStripeGMapsObject;

use SilverStripe\Core\Config\Config;
use SilverStripe\Core\Extension as CoreExtension;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\HiddenField;
use SilverStripe\Forms\LiteralField;
use SilverStripe\SiteConfig\SiteConfig;
use SilverStripe\View\Requirements;

/**
 * Additional database/form fields to hold map information
 */
class Extension extends CoreExtension
{
    private static $db = [
        'Latitude' => 'Varchar',
        'Longitude' => 'Varchar',
        'Heading' => 'Varchar',
        'Pitch' => 'Varchar'
    ];

    private static $defaults = [
        'Latitude' => 51.511165,
        'Longitude' => -0.119774
    ];

    /**
     * @param FieldList $fields
     */
    public function updateCMSFields(FieldList $fields)
    {
        $config = SiteConfig::current_site_config();

        if ($mapKey = $config->GMapsAPIKey) {
            Requirements::javascript('kinglozzer/silverstripegmapsobject:client/dist/js/GMapsObject.js');

            $defaults = Config::inst()->get($this->owner, 'defaults');

            $data = ['EnableStreetView' => (bool)$config->GMapsEnableStreetView];
            $fields->addFieldsToTab(
                'Root.Google Map',
                [
                    HiddenField::create('GMapAPIKey', 'GMapAPIKey', $mapKey),
                    HiddenField::create('Latitude'),
                    HiddenField::create('Longitude'),
                    HiddenField::create('Heading'),
                    HiddenField::create('Pitch'),
                    LiteralField::create('GMapTemplate', $this->owner->renderWith('GMapsObject_Fields', $data))
                ]
            );
        } else {
            $fields->addFieldToTab(
                'Root.GoogleMap',
                LiteralField::create('GMapWarning', $this->owner->renderWith('GMapsObject_Warning'))
            );
        }

        return $fields;
    }
}
