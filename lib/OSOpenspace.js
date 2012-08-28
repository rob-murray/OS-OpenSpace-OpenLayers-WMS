/** LIC stuff. 

 Ordnance Survey Open Space - Crown Copyright and database right 2012. All rights reserved. http://openspace.ordnancesurvey.co.uk/openspace/developeragreement.html#enduserlicense

--

OSOpenspace.js project

Copyright (C) 2012 Rob Murray

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**/



/**
 * @requires <OpenLayers.Layer.WMS> +?
 */

/**
 * Class: OpenLayers.Layer.OSOpenSpace
 * A implementation of an Openlayers WMS layer to access Ordnance Survey's
 * map tile service of Great Britain.
 * This service requires an APIKEY
 * 
 * Inherits from:
 *  - <OpenLayers.Layer.WMS>
 */
OpenLayers.Layer.OSOpenSpace = OpenLayers.Class(OpenLayers.Layer.WMS, {

    /**
     * Property: key
     * {String} API key for Ordnance Survey maps, get your own key 
     *     at http://www.ordnancesurvey.co.uk/oswebsite/web-services/os-openspace/
     */
    key: "",
    
    /**
     * Property: serverResolutions. NOTE: this needs to change if OS make more layers available
     * {Array} the resolutions provided by the Openspace Free service.
     */
    serverResolutions: [2500, 1000, 500, 200, 100, 50, 25, 10, 5, 4, 2.5, 2, 1],
    
    
    /**
     * Property: bounds
     * {OpenLayers.Bounds} the limits of GB.
     */
    bounds: null,
    
    /**
     * Property: osUrl
     * {String} The URL of the Ordnance Survey map tile server
     */
    osUrl: "http://openspace.ordnancesurvey.co.uk/osmapapi/ts",
    
    /** 
     * APIProperty: format
     * {String} The image MIME type.  Default is "image/png".
     */
    format: "image/png",  
    
    /** 
     * APIProperty: projection
     * {OpenLayers.Projection} The Openlayers.Projection EPSG code - OSGB36 datum code is EPSG:27700 .
     */
    projection: null, 
    
    /**
     * Property: osTileSize
     * {Integer} A value to hold the size of tile currently displayed
     */
    osTileSize: null,      
    
    /**
     * Constructor: OpenLayers.Layer.OSOpenSpace
     * Create a new Ordnance Survey Openspace layer object
     *
     * Parameters:
     * name - {String} A name for the layer
     * apiKey - {String} Your domain name linked API Key for OS service
     * params - {Object} An object with key/value pairs representing the
     *          GetMap query string parameters and parameter values.
     * options - {Object} Hashtable of extra options to tag onto the layer
     */
    initialize: function(name, apiKey, params, options) {
    
        var attributionStr, newOptions, authParams, newArguments
    
        //kindof lazy load these
        this.projection = new OpenLayers.Projection("EPSG:27700");
        this.bounds = new OpenLayers.Bounds(0, 0, 700000, 1300000);
        
    
        //TODO this appears 50px or so up from the bottom, should be level with bottom border -> fix with css
        attributionStr = "&copy; Crown Copyright and database right 2012. All rights reserved. <a target='_blank' href='http://openspace.ordnancesurvey.co.uk/openspace/developeragreement.html#enduserlicense'>End User License Agreement</a>";
    
        //Extend the options passed from user with Openspace related params
        newOptions = OpenLayers.Util.extend({
            maxExtent: this.bounds,
            projection: this.projection,
            resolutions: this.serverResolutions,
            units: "m",
            attribution: attributionStr
        }, options);
            
        //Create obj for the API key and URL
        authParams = {
            "KEY": apiKey,
            "URL": document.URL
        };
        
        //Apply new arguments to WMS implementation
        newArguments = [name, this.osUrl, authParams, newOptions];
        OpenLayers.Layer.WMS.prototype.initialize.apply(this, newArguments);
   
    },
    
    /**
    * APIMethod: getFullRequestString
    * Override the method that appends the WMS url with new params to add the &LAYERS=
    *
    * Parameters:
    * newParams - {Object}
    * altUrl - {String} Use this as the url instead of the layer's url
    *
    * Returns:
    * {String}
    */
    getFullRequestString: function(newParams, altUrl) {
        this.params.LAYERS = this.resolutions[this.map.getZoom()];

        return OpenLayers.Layer.WMS.prototype.getFullRequestString.apply(this, arguments);
    },
    
    /**
    * Method: initGriddedTiles
    * Add functionality to this callback from http request to adjust the tile size. OS 
    *   have different tile sizes for certain layers (in fact all are non standard sizes)
    *   so we have to update and refresh grid if a change
    *
    * Parameters:
    * newParams - {Object}
    * altUrl - {String} Use this as the url instead of the layer's url
    *
    * Returns:
    * {String}
    */
    initGriddedTiles: function(bounds) {
    
        var osTileSize, res;
        
        osTileSize = new OpenLayers.Size(200,200);
        res = this.map.getResolution();
        
        //The OS tilesizes are awkward: http://www.ordnancesurvey.co.uk/oswebsite/support/web-services/configuring-os-ondemand-wmts.html
        // All resolutions less than 5 but not 2.55 are 250
        if(res < 5 && res !== 2.5) {
            osTileSize = new OpenLayers.Size(250,250);
        }

        //If the size is different then clear the grid
        if(!osTileSize.equals(this.tileSize)) {
            this.tileSize = osTileSize;
            this.clearGrid();
        }

        //Call original method
        OpenLayers.Layer.WMS.prototype.initGriddedTiles.apply(this, [bounds]);
    },
    
    CLASS_NAME: "OpenLayers.Layer.OSOpenSpace"
});

