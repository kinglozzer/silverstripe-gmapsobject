#SilverStripe-GMapsContactPage#

A module that adds a `ContactPage` page type with a Google Map to the CMS.

By: [Loz Calver](https://twitter.com/kinglozzer).

##About:##

This module adds a new page type, `ContactPage`, to the CMS. This page type adds an additional `Google Map` tab, with a Google Map and marker placement allowing a set of lat/lon values (fields named `GMapLat` and `GMapLon` respectively) to be saved to the database.

No front-end implementation is provided, see [the Google Maps API Documentation](https://developers.google.com/maps/documentation/javascript/) for help with that.

##Installation:##

Simply clone or download this repository and put it in a folder called `SilverStripe-GMapsContactPage` in your SilverStripe installation folder. Add your browser API key (which can be obtained from [here](https://code.google.com/apis/console)) to _config.php, then run `dev/build?flush=1`. The `ContactPage` page type can then be added via the CMS.

##Notes:##

###Customisation:###

If you wish to use a class name other than `ContactPage`, or different field names, be sure to update `javascript/jsInit.js` with the new field IDs.

###Implementation details:###

The Google Maps API, and `jsInit.js` are loaded as `LeftAndMain` javascript requirements, instead of loading them as requirements in `getCMSFields()`. This is because the CMS sometimes failed to load the javascript files when loading the edit form via AJAX - a hard refresh would then load the files in correctly.

###Contributing:###

Please feel free to submit pull requests for bug fixes and code improvements. My javascript code could no-doubt be cleaned up by someone more experienced than myself.