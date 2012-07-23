# A new Openlayers WMS Layer for using Ordnance Survey Openspace map tiles

## Description

This is a new Openlayers WMS Layer which uses Ordnance Survey Openspace map tiles. This can be used to access Ordnance Survey tiles without using the OS Openspace API which is tied to a certain version of OpenLayers and often behind the latest release.

!This service requires an API KEY - @see http://www.ordnancesurvey.co.uk/oswebsite/web-services/os-openspace/

## Contents

This repository contains the following sections:

1. src - this contains the source.
2. demo - this contains a simple demo to show the functionality

## Getting started

How to use:

1) Obtain an Ordnance Survey Openspace API Key for your domain. @see http://www.ordnancesurvey.co.uk/oswebsite/web-services/os-openspace/ 

2) Copy this library to your project - grab the OSOpenspace.js file

2) Import Openlayers code - grab a production minified version or host this yourself

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
    
    layer = new OpenLayers.Layer.OSOpenSpace("OS Openspace",key, {});
        
    map.addLayer(layer);

    map.setCenter(new OpenLayers.LonLat(e, n), zoom);
    map.addControl( new OpenLayers.Control.LayerSwitcher() );
}
        
</script>
```


Please see the demo for full example.

## Contributions

Please use the GitHub pull-request mechanism to submit contributions.

## License

This project is available for use under the MIT software license.
See LICENSE
