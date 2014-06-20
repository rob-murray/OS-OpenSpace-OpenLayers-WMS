## A new OpenLayers WMS Layer for using Ordnance Survey OpenSpace service

[![Haz Commitz Status](http://haz-commitz.herokuapp.com/repos/rob-murray/OS-OpenSpace-OpenLayers-WMS.svg)](http://haz-commitz.herokuapp.com/repos/rob-murray/OS-OpenSpace-OpenLayers-WMS)

### Description

This is a new OpenLayers WMS Layer which uses Ordnance Survey OpenSpace service. This can be used to access Ordnance Survey tiles without using the OS OpenSpace API which is tied to a certain version of OpenLayers and often behind the latest release.

!! This service requires an API KEY - @see http://www.ordnancesurvey.co.uk/oswebsite/web-services/os-openspace/

This layer uses the OS OpenSpace Free service and the mapstack is defined for this service.

![ScreenShot](https://github.com/rob-murray/openlayers-wms-os_openspace/raw/master/screenshot.png "Screenshot of demo app")

## Contents

This repository contains the following sections:

1. src - this contains the source.
2. demo - this contains a simple demo to show the functionality

## Getting started

How to use:

1) Obtain an Ordnance Survey OpenSpace API Key for your domain. @see http://www.ordnancesurvey.co.uk/oswebsite/web-services/os-openspace/ 

2) Copy this library to your project - grab the OSOpenspace.js file

2) Import OpenLayers code - grab a production minified version or host this yourself

```
<script type="text/javascript" src="http://openlayers.org/api/OpenLayers.js"></script>
```

3) Import this library after the OpenLayers.js import

```
<script type="text/javascript" src="OSOpenspace.js"></script>
```

4) Create new layer and add to map

```
<script type="text/javascript">

var map, layer;
var key = "YOUR_KEY";

var e = 437303;
var n = 115542;

var zoom = 5;

function init(){
    map = new OpenLayers.Map( 'map' );
    
    layer = new OpenLayers.Layer.OSOpenSpace("OS Openspace", key, {});
        
    map.addLayer(layer);

    map.setCenter(new OpenLayers.LonLat(e, n), zoom);
    map.addControl( new OpenLayers.Control.LayerSwitcher() );
}
        
</script>
```


Please checkout the demo for full working example, with your API key of course.

## Contributions

Please use the GitHub pull-request mechanism to submit contributions.

## License

This project is available for use under the MIT software license.
See LICENSE
