# gsc-sos.js
  gsc-sos.js is a JavaScript library that encapsulates calls to a web service with [SOS 2.0](http://www.opengeospatial.org/standards/sos) implementation. Communication messages are XML formatted. The code is agnostic JavaScript, with no dependencies on other javascript libraries and it has the same [52North SOS client](https://github.com/52North/sos-js) front-end to facilitate integration and evolutive development.
  
All functions handled the request to capabilities, so it is not necessary call it before any request like "getOffering", "getFeatureOfInterest" or "getObservation”.


#### gsc-sos.js usage instructions  
``` javascript
<!-- minified -->
<script src="../gsc-sos/gsc-sos.min.js"></script>

<!-- debug -->
<script src="../gsc-sos/gsc-sos.debug.js"></script>
```

``` javascript
var urlService = 'http://server:8080/sosws/service';
var sos = new SOS({ url: urlService, bindingType: SOS.bindingType.XML });
```

``` javascript
sos.foiFormatter.getFeatureOfInterest({
            spatial: {
                srs: 4326,
                lowerCorner: [-180, -90],
                upperCorner: [180, 90]
            }
        }).then(function (foi) {            
            if (sos.foiFormatter.allowedFOIs.length > 0) {
                var foiID = sos.foiFormatter.allowedFOIs[0].idFOI;
                sos.getOfferingsForFeatureOfInterestId(foiID).then(function (offering) {
                    console.log(offering.length);
                });
            }
        });
```

``` javascript
sos.getCapabilities().then(function (caps) {
  console.log('caps are in SOS.Capabilities[urlService]');
  sos.getOfferings().then(function (data) {
    console.log('offerings OK');
  });
});
```

``` javascript
sos.foiFormatter.getFeatureOfInterestByPoint(4326, [42.843, -1.5804], 0.01)
  .then(function (foi) {
    foi = foi || [];
    console.log('getFeatureOfInterestByPoint: ' + fois.length);
  });
```

### Status 
The library is under development.

### To contribute
Please read the [contributors' guide](contributing.md).

### Licence
gsc-sos.js is under the [MIT-LICENSE](license).
