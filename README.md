#SilverStripe-GMapsPage#

A module that adds a Google Map to any page type in the CMS.

By: [Loz Calver](https://twitter.com/kinglozzer).

##About:##

This module is a DataExtension that adds an additional `Google Map` tab to the specified page type, with a Google Map and marker placement allowing a set of lat/lon values (fields named `GMapLat` and `GMapLon` respectively) to be saved to the database.

No front-end implementation is provided, see [the Google Maps API Documentation](https://developers.google.com/maps/documentation/javascript/) for help with that.

##Installation:##

Simply clone or download this repository and put it in a folder called `SilverStripe-GMapsPage` in your SilverStripe installation folder. Fill out the information in _config.php, including browser API key (which can be obtained from [here](https://code.google.com/apis/console)) and the page type to add the map to, then run `dev/build?flush=1`.

##Notes:##

###Customisation:###

If you wish to use different field names, be sure to update `javascript/GMapsPage.js` with the new field IDs.

###Implementation details:###

The Google Maps API, and `GMapsPage.js` are loaded as `LeftAndMain` javascript requirements, instead of loading them as requirements in `updateCMSFields()`. This is because the CMS sometimes failed to load the javascript files when loading the edit form via AJAX - a hard refresh would then load the files in correctly. The wonderful Entwine library handles all the events.

###Contributing:###

Please feel free to submit pull requests for bug fixes and code improvements.