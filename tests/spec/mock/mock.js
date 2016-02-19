var mock = {
    sensor:{
        response: {},
        json: {}
    },
    foi: {
        response: {
            "status": 200,
            "responseText": '<?xml version="1.0" encoding="UTF-8"?><sos:GetFeatureOfInterestResponse xmlns:sos="http://www.opengis.net/sos/2.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:sams="http://www.opengis.net/samplingSpatial/2.0" xmlns:gml="http://www.opengis.net/gml/3.2" xmlns:sf="http://www.opengis.net/sampling/2.0" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/sos/2.0 http://schemas.opengis.net/sos/2.0/sosGetFeatureOfInterest.xsd http://www.opengis.net/gml/3.2 http://schemas.opengis.net/gml/3.2.1/gml.xsd http://www.opengis.net/samplingSpatial/2.0 http://schemas.opengis.net/samplingSpatial/2.0/spatialSamplingFeature.xsd http://www.opengis.net/sampling/2.0 http://schemas.opengis.net/sampling/2.0/samplingFeature.xsd"><sos:featureMember><sams:SF_SpatialSamplingFeature gml:id="ssf_FB417956BC0A23EBFB41CF8BEB9B8F0B6F48C2E5"><gml:identifier codeSpace="http://www.opengis.net/def/nil/OGC/0/unknown">http://idena.navarra.es/srr/an1</gml:identifier><sf:type xlink:href="http://www.opengis.net/def/samplingFeatureType/OGC-OM/2.0/SF_SamplingPoint"/><sf:sampledFeature xlink:href="http://www.opengis.net/def/nil/OGC/0/unknown"/><sams:shape><ns:Point xmlns:ns="http://www.opengis.net/gml/3.2" ns:id="point_ssf_FB417956BC0A23EBFB41CF8BEB9B8F0B6F48C2E5"><ns:pos srsName="http://www.opengis.net/def/crs/EPSG/0/4326">42.8077 -1.5942</ns:pos></ns:Point></sams:shape></sams:SF_SpatialSamplingFeature></sos:featureMember></sos:GetFeatureOfInterestResponse>'
        },
        json:
            {                
                "id": "ssf_FB417956BC0A23EBFB41CF8BEB9B8F0B6F48C2E5",
                "idFOI": "http://idena.navarra.es/srr/an1",
                "type": "http://www.opengis.net/def/samplingFeatureType/OGC-OM/2.0/SF_SamplingPoint",
                "name": "", "sampledFeature": "http://www.opengis.net/def/nil/OGC/0/unknown",
                "geometry": {
                    "type": "point",
                    "srs": "4326",
                    "coordinates": [42, -1]
                }
            }
    },
    caps: {
        response: {
            "status": 200,
            "responseText": '<?xml version="1.0" encoding="UTF-8"?><sos:Capabilities xmlns:sos="http://www.opengis.net/sos/2.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:fes="http://www.opengis.net/fes/2.0" version="2.0.0" xsi:schemaLocation="http://www.opengis.net/fes/2.0 http://schemas.opengis.net/filter/2.0/filterAll.xsd http://www.opengis.net/sos/2.0 http://schemas.opengis.net/sos/2.0/sosGetCapabilities.xsd http://www.opengis.net/ows/1.1 http://schemas.opengis.net/ows/1.1.0/owsAll.xsd"><ows:ServiceIdentification><ows:Title xml:lang="eng">52N SOS</ows:Title><ows:Abstract xml:lang="eng">52North Sensor Observation Service - Data Access for the Sensor Web</ows:Abstract><ows:ServiceType>OGC:SOS</ows:ServiceType><ows:ServiceTypeVersion>1.0.0</ows:ServiceTypeVersion><ows:ServiceTypeVersion>2.0.0</ows:ServiceTypeVersion><ows:Profile>http://www.opengis.net/extension/SOSDO/1.0/observationDeletion</ows:Profile><ows:Profile>http://www.opengis.net/spec/OMXML/1.0/conf/categoryObservation</ows:Profile><ows:Profile>http://www.opengis.net/spec/OMXML/1.0/conf/countObservation</ows:Profile><ows:Profile>http://www.opengis.net/spec/OMXML/1.0/conf/geometryObservation</ows:Profile><ows:Profile>http://www.opengis.net/spec/OMXML/1.0/conf/measurement</ows:Profile><ows:Profile>http://www.opengis.net/spec/OMXML/1.0/conf/textObservation</ows:Profile><ows:Profile>http://www.opengis.net/spec/OMXML/1.0/conf/truthObservation</ows:Profile><ows:Profile>http://www.opengis.net/spec/OMXML/2.0/conf/categoryObservation</ows:Profile><ows:Profile>http://www.opengis.net/spec/OMXML/2.0/conf/complexObservation</ows:Profile><ows:Profile>http://www.opengis.net/spec/OMXML/2.0/conf/countObservation</ows:Profile><ows:Profile>http://www.opengis.net/spec/OMXML/2.0/conf/geometryObservation</ows:Profile><ows:Profile>http://www.opengis.net/spec/OMXML/2.0/conf/measurement</ows:Profile><ows:Profile>http://www.opengis.net/spec/OMXML/2.0/conf/samplingCurve</ows:Profile><ows:Profile>http://www.opengis.net/spec/OMXML/2.0/conf/samplingPoint</ows:Profile><ows:Profile>http://www.opengis.net/spec/OMXML/2.0/conf/samplingSurface</ows:Profile><ows:Profile>http://www.opengis.net/spec/OMXML/2.0/conf/spatialSampling</ows:Profile><ows:Profile>http://www.opengis.net/spec/OMXML/2.0/conf/textObservation</ows:Profile><ows:Profile>http://www.opengis.net/spec/OMXML/2.0/conf/truthObservation</ows:Profile><ows:Profile>http://www.opengis.net/spec/SOS/1.0/conf/core</ows:Profile><ows:Profile>http://www.opengis.net/spec/SOS/1.0/conf/enhanced</ows:Profile><ows:Profile>http://www.opengis.net/spec/SOS/2.0/conf/core</ows:Profile><ows:Profile>http://www.opengis.net/spec/SOS/2.0/conf/daRetrieval</ows:Profile><ows:Profile>http://www.opengis.net/spec/SOS/2.0/conf/exi</ows:Profile><ows:Profile>http://www.opengis.net/spec/SOS/2.0/conf/foiRetrieval</ows:Profile><ows:Profile>http://www.opengis.net/spec/SOS/2.0/conf/insertionCap</ows:Profile><ows:Profile>http://www.opengis.net/spec/SOS/2.0/conf/json</ows:Profile><ows:Profile>http://www.opengis.net/spec/SOS/2.0/conf/kvp-core</ows:Profile><ows:Profile>http://www.opengis.net/spec/SOS/2.0/conf/obsByIdRetrieval</ows:Profile><ows:Profile>http://www.opengis.net/spec/SOS/2.0/conf/obsInsertion</ows:Profile><ows:Profile>http://www.opengis.net/spec/SOS/2.0/conf/pox</ows:Profile><ows:Profile>http://www.opengis.net/spec/SOS/2.0/conf/rest</ows:Profile><ows:Profile>http://www.opengis.net/spec/SOS/2.0/conf/resultInsertion</ows:Profile><ows:Profile>http://www.opengis.net/spec/SOS/2.0/conf/resultRetrieval</ows:Profile><ows:Profile>http://www.opengis.net/spec/SOS/2.0/conf/sensorDeletion</ows:Profile><ows:Profile>http://www.opengis.net/spec/SOS/2.0/conf/sensorInsertion</ows:Profile><ows:Profile>http://www.opengis.net/spec/SOS/2.0/conf/soap</ows:Profile><ows:Profile>http://www.opengis.net/spec/SOS/2.0/conf/updateSensorDescription</ows:Profile><ows:Profile>http://www.opengis.net/spec/SWE/2.0/conf/core</ows:Profile><ows:Profile>http://www.opengis.net/spec/SWE/2.0/conf/general-encoding-rules</ows:Profile><ows:Profile>http://www.opengis.net/spec/SWE/2.0/conf/text-encoding-rules</ows:Profile><ows:Profile>http://www.opengis.net/spec/SWE/2.0/conf/uml-block-components</ows:Profile><ows:Profile>http://www.opengis.net/spec/SWE/2.0/conf/uml-record-components</ows:Profile><ows:Profile>http://www.opengis.net/spec/SWE/2.0/conf/uml-simple-components</ows:Profile><ows:Profile>http://www.opengis.net/spec/SWE/2.0/conf/uml-simple-encodings</ows:Profile><ows:Profile>http://www.opengis.net/spec/SWE/2.0/conf/xsd-block-components</ows:Profile><ows:Profile>http://www.opengis.net/spec/SWE/2.0/conf/xsd-record-components</ows:Profile><ows:Profile>http://www.opengis.net/spec/SWE/2.0/conf/xsd-simple-components</ows:Profile><ows:Profile>http://www.opengis.net/spec/SWE/2.0/conf/xsd-simple-encodings</ows:Profile><ows:Profile>http://www.opengis.net/spec/waterml/2.0/conf/uml-measurement-timeries-tvp-observation</ows:Profile><ows:Profile>http://www.opengis.net/spec/waterml/2.0/conf/uml-timeseries-tvp-observation</ows:Profile><ows:Profile>http://www.opengis.net/spec/waterml/2.0/conf/xsd-measurement-timeseries-tvp</ows:Profile><ows:Profile>http://www.opengis.net/spec/waterml/2.0/conf/xsd-timeseries-observation</ows:Profile><ows:Profile>http://www.opengis.net/spec/waterml/2.0/conf/xsd-timeseries-tvp-observation</ows:Profile><ows:Profile>http://www.opengis.net/spec/waterml/2.0/conf/xsd-xml-rules</ows:Profile><ows:Fees>NONE</ows:Fees><ows:AccessConstraints>NONE</ows:AccessConstraints></ows:ServiceIdentification><ows:ServiceProvider><ows:ProviderName>Trabajos Catastrales S.A</ows:ProviderName><ows:ProviderSite xlink:href="http://tracasa.es"/><ows:ServiceContact><ows:IndividualName>TBA</ows:IndividualName><ows:PositionName>TBA</ows:PositionName><ows:ContactInfo><ows:Phone><ows:Voice>+34 948289000</ows:Voice></ows:Phone><ows:Address><ows:DeliveryPoint>C/ Cabárceno 6</ows:DeliveryPoint><ows:City>Sarriguren</ows:City><ows:AdministrativeArea>Navarra</ows:AdministrativeArea><ows:PostalCode>31621</ows:PostalCode><ows:Country>Spain</ows:Country><ows:ElectronicMailAddress>info@tracasa.es</ows:ElectronicMailAddress></ows:Address></ows:ContactInfo></ows:ServiceContact></ows:ServiceProvider><ows:OperationsMetadata><ows:Operation name="Batch"><ows:DCP><ows:HTTP><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/json"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/json</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post></ows:HTTP></ows:DCP></ows:Operation><ows:Operation name="DeleteObservation"><ows:DCP><ows:HTTP><ows:Get xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/kvp?"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/x-kvp</ows:Value></ows:AllowedValues></ows:Constraint></ows:Get><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/exi"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/exi</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/json"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/json</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/pox"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/xml</ows:Value><ows:Value>text/xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/soap"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/soap+xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post></ows:HTTP></ows:DCP><ows:Parameter name="observation"><ows:AnyValue/></ows:Parameter></ows:Operation><ows:Operation name="DeleteSensor"><ows:DCP><ows:HTTP><ows:Get xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/kvp?"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/x-kvp</ows:Value></ows:AllowedValues></ows:Constraint></ows:Get><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/exi"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/exi</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/json"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/json</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/pox"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/xml</ows:Value><ows:Value>text/xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/soap"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/soap+xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post></ows:HTTP></ows:DCP><ows:Parameter name="procedure"><ows:AllowedValues><ows:Value>http://idena.navarra.es/olk/ad1/cl01</ows:Value><ows:Value>http://idena.navarra.es/orb/ad1/cl01</ows:Value><ows:Value>http://idena.navarra.es/ori/ad1/cl01</ows:Value><ows:Value>http://idena.navarra.es/orr/ad1/cl01</ows:Value><ows:Value>http://idena.navarra.es/sjr/an1/qa01</ows:Value><ows:Value>http://idena.navarra.es/sju/ar1/qa02</ows:Value><ows:Value>http://idena.navarra.es/srr/an1/qa01</ows:Value><ows:Value>http://idena.navarra.es/srr/an2/qa01</ows:Value><ows:Value>http://idena.navarra.es/tjn/an4/qa01</ows:Value><ows:Value>http://idena.navarra.es/vll/an1/qa01</ows:Value></ows:AllowedValues></ows:Parameter></ows:Operation><ows:Operation name="DescribeSensor"><ows:DCP><ows:HTTP><ows:Get xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/kvp?"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/x-kvp</ows:Value></ows:AllowedValues></ows:Constraint></ows:Get><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/exi"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/exi</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/json"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/json</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/pox"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/xml</ows:Value><ows:Value>text/xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/soap"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/soap+xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post></ows:HTTP></ows:DCP><ows:Parameter name="procedure"><ows:AllowedValues><ows:Value>http://idena.navarra.es/olk/ad1/cl01</ows:Value><ows:Value>http://idena.navarra.es/orb/ad1/cl01</ows:Value><ows:Value>http://idena.navarra.es/ori/ad1/cl01</ows:Value><ows:Value>http://idena.navarra.es/orr/ad1/cl01</ows:Value><ows:Value>http://idena.navarra.es/sjr/an1/qa01</ows:Value><ows:Value>http://idena.navarra.es/sju/ar1/qa02</ows:Value><ows:Value>http://idena.navarra.es/srr/an1/qa01</ows:Value><ows:Value>http://idena.navarra.es/srr/an2/qa01</ows:Value><ows:Value>http://idena.navarra.es/tjn/an4/qa01</ows:Value><ows:Value>http://idena.navarra.es/vll/an1/qa01</ows:Value></ows:AllowedValues></ows:Parameter><ows:Parameter name="procedureDescriptionFormat"><ows:AllowedValues><ows:Value>http://www.opengis.net/sensorML/1.0.1</ows:Value><ows:Value>http://www.opengis.net/sensorml/2.0</ows:Value><ows:Value>http://www.opengis.net/waterml/2.0/observationProcess</ows:Value></ows:AllowedValues></ows:Parameter><ows:Parameter name="validTime"><ows:AnyValue/></ows:Parameter></ows:Operation><ows:Operation name="GetCapabilities"><ows:DCP><ows:HTTP><ows:Get xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/kvp?"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/x-kvp</ows:Value></ows:AllowedValues></ows:Constraint></ows:Get><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/exi"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/exi</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/json"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/json</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/pox"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/xml</ows:Value><ows:Value>text/xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/soap"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/soap+xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post></ows:HTTP></ows:DCP><ows:Parameter name="AcceptFormats"><ows:AllowedValues><ows:Value>application/xml</ows:Value></ows:AllowedValues></ows:Parameter><ows:Parameter name="AcceptVersions"><ows:AllowedValues><ows:Value>1.0.0</ows:Value><ows:Value>2.0.0</ows:Value></ows:AllowedValues></ows:Parameter><ows:Parameter name="Sections"><ows:AllowedValues><ows:Value>All</ows:Value><ows:Value>Contents</ows:Value><ows:Value>FilterCapabilities</ows:Value><ows:Value>InsertionCapabilities</ows:Value><ows:Value>OperationsMetadata</ows:Value><ows:Value>ServiceIdentification</ows:Value><ows:Value>ServiceProvider</ows:Value></ows:AllowedValues></ows:Parameter><ows:Parameter name="updateSequence"><ows:AnyValue/></ows:Parameter></ows:Operation><ows:Operation name="GetDataAvailability"><ows:DCP><ows:HTTP><ows:Get xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/kvp?"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/x-kvp</ows:Value></ows:AllowedValues></ows:Constraint></ows:Get><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/exi"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/exi</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/json"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/json</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/pox"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/xml</ows:Value><ows:Value>text/xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/soap"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/soap+xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post></ows:HTTP></ows:DCP><ows:Parameter name="featureOfInterest"><ows:AllowedValues><ows:Value>http://idena.navarra.es/olk/ad1</ows:Value><ows:Value>http://idena.navarra.es/orb/ad1</ows:Value><ows:Value>http://idena.navarra.es/ori/ad1</ows:Value><ows:Value>http://idena.navarra.es/orr/ad1</ows:Value><ows:Value>http://idena.navarra.es/sjr/an1</ows:Value><ows:Value>http://idena.navarra.es/sju/ar1</ows:Value><ows:Value>http://idena.navarra.es/srr/an1</ows:Value><ows:Value>http://idena.navarra.es/srr/an2</ows:Value><ows:Value>http://idena.navarra.es/tjn/an4</ows:Value><ows:Value>http://idena.navarra.es/vll/an1</ows:Value></ows:AllowedValues></ows:Parameter><ows:Parameter name="observedProperty"><ows:AllowedValues><ows:Value>http://sweet.jpl.nasa.gov/2.3/matrElementalMolecule.owl#Cl2</ows:Value><ows:Value>http://sweet.jpl.nasa.gov/2.3/phenHydro.owl#WaterFlow</ows:Value></ows:AllowedValues></ows:Parameter><ows:Parameter name="procedure"><ows:AllowedValues><ows:Value>http://idena.navarra.es/olk/ad1/cl01</ows:Value><ows:Value>http://idena.navarra.es/orb/ad1/cl01</ows:Value><ows:Value>http://idena.navarra.es/ori/ad1/cl01</ows:Value><ows:Value>http://idena.navarra.es/orr/ad1/cl01</ows:Value><ows:Value>http://idena.navarra.es/sjr/an1/qa01</ows:Value><ows:Value>http://idena.navarra.es/sju/ar1/qa02</ows:Value><ows:Value>http://idena.navarra.es/srr/an1/qa01</ows:Value><ows:Value>http://idena.navarra.es/srr/an2/qa01</ows:Value><ows:Value>http://idena.navarra.es/tjn/an4/qa01</ows:Value><ows:Value>http://idena.navarra.es/vll/an1/qa01</ows:Value></ows:AllowedValues></ows:Parameter></ows:Operation><ows:Operation name="GetFeatureOfInterest"><ows:DCP><ows:HTTP><ows:Get xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/kvp?"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/x-kvp</ows:Value></ows:AllowedValues></ows:Constraint></ows:Get><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/exi"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/exi</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/json"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/json</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/pox"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/xml</ows:Value><ows:Value>text/xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/soap"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/soap+xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post></ows:HTTP></ows:DCP><ows:Parameter name="featureOfInterest"><ows:AllowedValues><ows:Value>http://idena.navarra.es/olk/ad1</ows:Value><ows:Value>http://idena.navarra.es/orb/ad1</ows:Value><ows:Value>http://idena.navarra.es/ori/ad1</ows:Value><ows:Value>http://idena.navarra.es/orr/ad1</ows:Value><ows:Value>http://idena.navarra.es/sjr/an1</ows:Value><ows:Value>http://idena.navarra.es/sju/ar1</ows:Value><ows:Value>http://idena.navarra.es/srr/an1</ows:Value><ows:Value>http://idena.navarra.es/srr/an2</ows:Value><ows:Value>http://idena.navarra.es/tjn/an4</ows:Value><ows:Value>http://idena.navarra.es/vll/an1</ows:Value></ows:AllowedValues></ows:Parameter><ows:Parameter name="observedProperty"><ows:AllowedValues><ows:Value>http://sweet.jpl.nasa.gov/2.3/matrElementalMolecule.owl#Cl2</ows:Value><ows:Value>http://sweet.jpl.nasa.gov/2.3/phenHydro.owl#WaterFlow</ows:Value></ows:AllowedValues></ows:Parameter><ows:Parameter name="procedure"><ows:AllowedValues><ows:Value>http://idena.navarra.es/olk/ad1/cl01</ows:Value><ows:Value>http://idena.navarra.es/orb/ad1/cl01</ows:Value><ows:Value>http://idena.navarra.es/ori/ad1/cl01</ows:Value><ows:Value>http://idena.navarra.es/orr/ad1/cl01</ows:Value><ows:Value>http://idena.navarra.es/sjr/an1/qa01</ows:Value><ows:Value>http://idena.navarra.es/sju/ar1/qa02</ows:Value><ows:Value>http://idena.navarra.es/srr/an1/qa01</ows:Value><ows:Value>http://idena.navarra.es/srr/an2/qa01</ows:Value><ows:Value>http://idena.navarra.es/tjn/an4/qa01</ows:Value><ows:Value>http://idena.navarra.es/vll/an1/qa01</ows:Value></ows:AllowedValues></ows:Parameter><ows:Parameter name="spatialFilter"><ows:AllowedValues><ows:Range><ows:MinimumValue>42.7779 -1.7489</ows:MinimumValue><ows:MaximumValue>42.876 -1.5804</ows:MaximumValue></ows:Range></ows:AllowedValues></ows:Parameter></ows:Operation><ows:Operation name="GetObservation"><ows:DCP><ows:HTTP><ows:Get xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/kvp?"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/x-kvp</ows:Value></ows:AllowedValues></ows:Constraint></ows:Get><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/exi"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/exi</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/json"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/json</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/pox"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/xml</ows:Value><ows:Value>text/xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/soap"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/soap+xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post></ows:HTTP></ows:DCP><ows:Parameter name="featureOfInterest"><ows:AllowedValues><ows:Value>http://idena.navarra.es/olk/ad1</ows:Value><ows:Value>http://idena.navarra.es/orb/ad1</ows:Value><ows:Value>http://idena.navarra.es/ori/ad1</ows:Value><ows:Value>http://idena.navarra.es/orr/ad1</ows:Value><ows:Value>http://idena.navarra.es/sjr/an1</ows:Value><ows:Value>http://idena.navarra.es/sju/ar1</ows:Value><ows:Value>http://idena.navarra.es/srr/an1</ows:Value><ows:Value>http://idena.navarra.es/srr/an2</ows:Value><ows:Value>http://idena.navarra.es/tjn/an4</ows:Value><ows:Value>http://idena.navarra.es/vll/an1</ows:Value></ows:AllowedValues></ows:Parameter><ows:Parameter name="observedProperty"><ows:AllowedValues><ows:Value>http://sweet.jpl.nasa.gov/2.3/matrElementalMolecule.owl#Cl2</ows:Value><ows:Value>http://sweet.jpl.nasa.gov/2.3/phenHydro.owl#WaterFlow</ows:Value></ows:AllowedValues></ows:Parameter><ows:Parameter name="offering"><ows:AllowedValues><ows:Value>http://idena.navarra.es/orb/ad1/cl01/offering/1</ows:Value><ows:Value>http://idena.navarra.es/ori/ad1/cl01/offering/1</ows:Value><ows:Value>http://idena.navarra.es/orr/ad1/cl01/offering/1</ows:Value><ows:Value>http://idena.navarra.es/sjr/an1/qa01/offering/1</ows:Value><ows:Value>http://idena.navarra.es/sju/ar1/qa02/offering/1</ows:Value><ows:Value>http://idena.navarra.es/srr/an1/qa01/offering/1</ows:Value><ows:Value>http://idena.navarra.es/srr/an2/qa01/offering/1</ows:Value><ows:Value>http://idena.navarra.es/tjn/an4/qa01/offering/1</ows:Value><ows:Value>http://idena.navarra.es/vll/an1/qa01/offering/1</ows:Value></ows:AllowedValues></ows:Parameter><ows:Parameter name="procedure"><ows:AllowedValues><ows:Value>http://idena.navarra.es/olk/ad1/cl01</ows:Value><ows:Value>http://idena.navarra.es/orb/ad1/cl01</ows:Value><ows:Value>http://idena.navarra.es/ori/ad1/cl01</ows:Value><ows:Value>http://idena.navarra.es/orr/ad1/cl01</ows:Value><ows:Value>http://idena.navarra.es/sjr/an1/qa01</ows:Value><ows:Value>http://idena.navarra.es/sju/ar1/qa02</ows:Value><ows:Value>http://idena.navarra.es/srr/an1/qa01</ows:Value><ows:Value>http://idena.navarra.es/srr/an2/qa01</ows:Value><ows:Value>http://idena.navarra.es/tjn/an4/qa01</ows:Value><ows:Value>http://idena.navarra.es/vll/an1/qa01</ows:Value></ows:AllowedValues></ows:Parameter><ows:Parameter name="responseFormat"><ows:AllowedValues><ows:Value>application/json</ows:Value><ows:Value>application/netcdf</ows:Value><ows:Value>application/netcdf; profile=OceanSITES</ows:Value><ows:Value>application/netcdf; version=3</ows:Value><ows:Value>application/netcdf; version=3; profile=OceanSITES</ows:Value><ows:Value>application/netcdf; version=4</ows:Value><ows:Value>application/netcdf; version=4; profile=OceanSITES</ows:Value><ows:Value>application/zip; subtype=netcdf</ows:Value><ows:Value>application/zip; subtype=netcdf; profile=OceanSITES</ows:Value><ows:Value>application/zip; subtype=netcdf; version=3</ows:Value><ows:Value>application/zip; subtype=netcdf; version=3; profile=OceanSITES</ows:Value><ows:Value>application/zip; subtype=netcdf; version=4</ows:Value><ows:Value>application/zip; subtype=netcdf; version=4; profile=OceanSITES</ows:Value><ows:Value>http://dd.eionet.europa.eu/schemaset/id2011850eu-1.0</ows:Value><ows:Value>http://www.opengis.net/om/2.0</ows:Value><ows:Value>http://www.opengis.net/waterml-dr/2.0</ows:Value><ows:Value>http://www.opengis.net/waterml/2.0</ows:Value></ows:AllowedValues></ows:Parameter><ows:Parameter name="spatialFilter"><ows:AllowedValues><ows:Range><ows:MinimumValue>42.7779 -1.7489</ows:MinimumValue><ows:MaximumValue>42.876 -1.5804</ows:MaximumValue></ows:Range></ows:AllowedValues></ows:Parameter><ows:Parameter name="temporalFilter"><ows:AllowedValues><ows:Range><ows:MinimumValue>2015-07-06T10:00:00.000Z</ows:MinimumValue><ows:MaximumValue>2015-07-06T12:59:00.000Z</ows:MaximumValue></ows:Range></ows:AllowedValues></ows:Parameter></ows:Operation><ows:Operation name="GetObservationById"><ows:DCP><ows:HTTP><ows:Get xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/kvp?"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/x-kvp</ows:Value></ows:AllowedValues></ows:Constraint></ows:Get><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/exi"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/exi</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/json"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/json</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/pox"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/xml</ows:Value><ows:Value>text/xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/soap"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/soap+xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post></ows:HTTP></ows:DCP><ows:Parameter name="observation"><ows:AnyValue/></ows:Parameter></ows:Operation><ows:Operation name="GetResult"><ows:DCP><ows:HTTP><ows:Get xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/kvp?"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/x-kvp</ows:Value></ows:AllowedValues></ows:Constraint></ows:Get><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/exi"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/exi</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/json"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/json</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/pox"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/xml</ows:Value><ows:Value>text/xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/soap"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/soap+xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post></ows:HTTP></ows:DCP><ows:Parameter name="featureOfInterest"><ows:AnyValue/></ows:Parameter><ows:Parameter name="observedProperty"><ows:AnyValue/></ows:Parameter><ows:Parameter name="offering"><ows:AnyValue/></ows:Parameter></ows:Operation><ows:Operation name="GetResultTemplate"><ows:DCP><ows:HTTP><ows:Get xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/kvp?"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/x-kvp</ows:Value></ows:AllowedValues></ows:Constraint></ows:Get><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/exi"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/exi</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/json"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/json</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/pox"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/xml</ows:Value><ows:Value>text/xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/soap"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/soap+xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post></ows:HTTP></ows:DCP><ows:Parameter name="observedProperty"><ows:AnyValue/></ows:Parameter><ows:Parameter name="offering"><ows:AnyValue/></ows:Parameter></ows:Operation><ows:Operation name="InsertObservation"><ows:DCP><ows:HTTP><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/exi"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/exi</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/json"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/json</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/pox"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/xml</ows:Value><ows:Value>text/xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/soap"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/soap+xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post></ows:HTTP></ows:DCP><ows:Parameter name="observation"><ows:AnyValue/><ows:DataType ows:reference="http://schemas.opengis.net/om/2.0/observation.xsd#OM_Observation"/></ows:Parameter><ows:Parameter name="offering"><ows:AllowedValues><ows:Value>http://idena.navarra.es/orb/ad1/cl01/offering/1</ows:Value><ows:Value>http://idena.navarra.es/ori/ad1/cl01/offering/1</ows:Value><ows:Value>http://idena.navarra.es/orr/ad1/cl01/offering/1</ows:Value><ows:Value>http://idena.navarra.es/sjr/an1/qa01/offering/1</ows:Value><ows:Value>http://idena.navarra.es/sju/ar1/qa02/offering/1</ows:Value><ows:Value>http://idena.navarra.es/srr/an1/qa01/offering/1</ows:Value><ows:Value>http://idena.navarra.es/srr/an2/qa01/offering/1</ows:Value><ows:Value>http://idena.navarra.es/tjn/an4/qa01/offering/1</ows:Value><ows:Value>http://idena.navarra.es/vll/an1/qa01/offering/1</ows:Value></ows:AllowedValues></ows:Parameter></ows:Operation><ows:Operation name="InsertResult"><ows:DCP><ows:HTTP><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/exi"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/exi</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/json"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/json</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/pox"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/xml</ows:Value><ows:Value>text/xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/soap"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/soap+xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post></ows:HTTP></ows:DCP><ows:Parameter name="resultValues"><ows:AnyValue/></ows:Parameter><ows:Parameter name="template"><ows:AnyValue/></ows:Parameter></ows:Operation><ows:Operation name="InsertResultTemplate"><ows:DCP><ows:HTTP><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/exi"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/exi</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/json"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/json</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/pox"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/xml</ows:Value><ows:Value>text/xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/soap"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/soap+xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post></ows:HTTP></ows:DCP><ows:Parameter name="proposedTemplate"><ows:AnyValue/></ows:Parameter></ows:Operation><ows:Operation name="InsertSensor"><ows:DCP><ows:HTTP><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/exi"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/exi</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/json"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/json</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/pox"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/xml</ows:Value><ows:Value>text/xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/soap"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/soap+xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post></ows:HTTP></ows:DCP><ows:Parameter name="metadata"><ows:AnyValue/><ows:DataType ows:reference="http://schemas.opengis.net/sos/2.0/sosInsertionCapabilities.xsd#InsertionCapabilities"/></ows:Parameter><ows:Parameter name="observableProperty"><ows:AnyValue/></ows:Parameter><ows:Parameter name="procedureDescription"><ows:AnyValue/></ows:Parameter><ows:Parameter name="procedureDescriptionFormat"><ows:AllowedValues><ows:Value>http://www.opengis.net/sensorML/1.0.1</ows:Value><ows:Value>http://www.opengis.net/sensorml/2.0</ows:Value><ows:Value>http://www.opengis.net/waterml/2.0/observationProcess</ows:Value></ows:AllowedValues></ows:Parameter></ows:Operation><ows:Operation name="UpdateSensorDescription"><ows:DCP><ows:HTTP><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/exi"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/exi</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/json"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/json</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/pox"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/xml</ows:Value><ows:Value>text/xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post><ows:Post xlink:href="http://pmplrenta03:8080/52n-sos-webapp/sos/soap"><ows:Constraint name="Content-Type"><ows:AllowedValues><ows:Value>application/soap+xml</ows:Value></ows:AllowedValues></ows:Constraint></ows:Post></ows:HTTP></ows:DCP><ows:Parameter name="description"><ows:AnyValue/></ows:Parameter><ows:Parameter name="procedure"><ows:AllowedValues><ows:Value>http://idena.navarra.es/olk/ad1/cl01</ows:Value><ows:Value>http://idena.navarra.es/orb/ad1/cl01</ows:Value><ows:Value>http://idena.navarra.es/ori/ad1/cl01</ows:Value><ows:Value>http://idena.navarra.es/orr/ad1/cl01</ows:Value><ows:Value>http://idena.navarra.es/sjr/an1/qa01</ows:Value><ows:Value>http://idena.navarra.es/sju/ar1/qa02</ows:Value><ows:Value>http://idena.navarra.es/srr/an1/qa01</ows:Value><ows:Value>http://idena.navarra.es/srr/an2/qa01</ows:Value><ows:Value>http://idena.navarra.es/tjn/an4/qa01</ows:Value><ows:Value>http://idena.navarra.es/vll/an1/qa01</ows:Value></ows:AllowedValues></ows:Parameter><ows:Parameter name="procedureDescriptionFormat"><ows:AllowedValues><ows:Value>http://www.opengis.net/sensorML/1.0.1</ows:Value><ows:Value>http://www.opengis.net/sensorml/2.0</ows:Value><ows:Value>http://www.opengis.net/waterml/2.0/observationProcess</ows:Value></ows:AllowedValues></ows:Parameter></ows:Operation><ows:Parameter name="crs"><ows:AllowedValues><ows:Value>http://www.opengis.net/def/crs/EPSG/0/31466</ows:Value><ows:Value>http://www.opengis.net/def/crs/EPSG/0/31467</ows:Value><ows:Value>http://www.opengis.net/def/crs/EPSG/0/4258</ows:Value><ows:Value>http://www.opengis.net/def/crs/EPSG/0/4326</ows:Value><ows:Value>http://www.opengis.net/def/crs/EPSG/0/4979</ows:Value></ows:AllowedValues></ows:Parameter><ows:Parameter name="language"><ows:AllowedValues><ows:Value>eng</ows:Value></ows:AllowedValues></ows:Parameter><ows:Parameter name="service"><ows:AllowedValues><ows:Value>SOS</ows:Value></ows:AllowedValues></ows:Parameter><ows:Parameter name="version"><ows:AllowedValues><ows:Value>1.0.0</ows:Value><ows:Value>2.0.0</ows:Value></ows:AllowedValues></ows:Parameter></ows:OperationsMetadata><sos:filterCapabilities><fes:Filter_Capabilities><fes:Conformance><fes:Constraint name="ImplementsQuery"><ows:NoValues/><ows:DefaultValue>false</ows:DefaultValue></fes:Constraint><fes:Constraint name="ImplementsAdHocQuery"><ows:NoValues/><ows:DefaultValue>false</ows:DefaultValue></fes:Constraint><fes:Constraint name="ImplementsFunctions"><ows:NoValues/><ows:DefaultValue>false</ows:DefaultValue></fes:Constraint><fes:Constraint name="ImplementsResourceld"><ows:NoValues/><ows:DefaultValue>false</ows:DefaultValue></fes:Constraint><fes:Constraint name="ImplementsMinStandardFilter"><ows:NoValues/><ows:DefaultValue>false</ows:DefaultValue></fes:Constraint><fes:Constraint name="ImplementsStandardFilter"><ows:NoValues/><ows:DefaultValue>false</ows:DefaultValue></fes:Constraint><fes:Constraint name="ImplementsMinSpatialFilter"><ows:NoValues/><ows:DefaultValue>true</ows:DefaultValue></fes:Constraint><fes:Constraint name="ImplementsSpatialFilter"><ows:NoValues/><ows:DefaultValue>true</ows:DefaultValue></fes:Constraint><fes:Constraint name="ImplementsMinTemporalFilter"><ows:NoValues/><ows:DefaultValue>true</ows:DefaultValue></fes:Constraint><fes:Constraint name="ImplementsTemporalFilter"><ows:NoValues/><ows:DefaultValue>true</ows:DefaultValue></fes:Constraint><fes:Constraint name="ImplementsVersionNav"><ows:NoValues/><ows:DefaultValue>false</ows:DefaultValue></fes:Constraint><fes:Constraint name="ImplementsSorting"><ows:NoValues/><ows:DefaultValue>false</ows:DefaultValue></fes:Constraint><fes:Constraint name="ImplementsExtendedOperators"><ows:NoValues/><ows:DefaultValue>false</ows:DefaultValue></fes:Constraint><fes:Constraint name="ImplementsMinimumXPath"><ows:NoValues/><ows:DefaultValue>false</ows:DefaultValue></fes:Constraint><fes:Constraint name="ImplementsSchemaElementFunc"><ows:NoValues/><ows:DefaultValue>false</ows:DefaultValue></fes:Constraint></fes:Conformance><fes:Spatial_Capabilities><fes:GeometryOperands><fes:GeometryOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:Envelope"/></fes:GeometryOperands><fes:SpatialOperators><fes:SpatialOperator name="BBOX"><fes:GeometryOperands><fes:GeometryOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:Envelope"/></fes:GeometryOperands></fes:SpatialOperator></fes:SpatialOperators></fes:Spatial_Capabilities><fes:Temporal_Capabilities><fes:TemporalOperands><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimeInstant"/><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimePeriod"/></fes:TemporalOperands><fes:TemporalOperators><fes:TemporalOperator name="Before"><fes:TemporalOperands><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimeInstant"/><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimePeriod"/></fes:TemporalOperands></fes:TemporalOperator><fes:TemporalOperator name="After"><fes:TemporalOperands><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimeInstant"/><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimePeriod"/></fes:TemporalOperands></fes:TemporalOperator><fes:TemporalOperator name="Begins"><fes:TemporalOperands><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimeInstant"/><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimePeriod"/></fes:TemporalOperands></fes:TemporalOperator><fes:TemporalOperator name="Ends"><fes:TemporalOperands><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimeInstant"/><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimePeriod"/></fes:TemporalOperands></fes:TemporalOperator><fes:TemporalOperator name="EndedBy"><fes:TemporalOperands><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimeInstant"/><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimePeriod"/></fes:TemporalOperands></fes:TemporalOperator><fes:TemporalOperator name="BegunBy"><fes:TemporalOperands><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimeInstant"/><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimePeriod"/></fes:TemporalOperands></fes:TemporalOperator><fes:TemporalOperator name="During"><fes:TemporalOperands><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimeInstant"/><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimePeriod"/></fes:TemporalOperands></fes:TemporalOperator><fes:TemporalOperator name="TEquals"><fes:TemporalOperands><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimeInstant"/><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimePeriod"/></fes:TemporalOperands></fes:TemporalOperator><fes:TemporalOperator name="TContains"><fes:TemporalOperands><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimeInstant"/><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimePeriod"/></fes:TemporalOperands></fes:TemporalOperator><fes:TemporalOperator name="TOverlaps"><fes:TemporalOperands><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimeInstant"/><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimePeriod"/></fes:TemporalOperands></fes:TemporalOperator><fes:TemporalOperator name="Meets"><fes:TemporalOperands><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimeInstant"/><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimePeriod"/></fes:TemporalOperands></fes:TemporalOperator><fes:TemporalOperator name="MetBy"><fes:TemporalOperands><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimeInstant"/><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimePeriod"/></fes:TemporalOperands></fes:TemporalOperator><fes:TemporalOperator name="OverlappedBy"><fes:TemporalOperands><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimeInstant"/><fes:TemporalOperand xmlns:ns="http://www.opengis.net/gml/3.2" name="ns:TimePeriod"/></fes:TemporalOperands></fes:TemporalOperator></fes:TemporalOperators></fes:Temporal_Capabilities></fes:Filter_Capabilities></sos:filterCapabilities></sos:Capabilities>'
        },
        json: {
            "@sos": "http://www.opengis.net/sos/2.0",
            "@xsi": "http://www.w3.org/2001/XMLSchema-instance",
            "@ows": "http://www.opengis.net/ows/1.1",
            "@xlink": "http://www.w3.org/1999/xlink",
            "@fes": "http://www.opengis.net/fes/2.0",
            "@version": "2.0.0",
            "@schemaLocation": "http://www.opengis.net/fes/2.0 http://schemas.opengis.net/filter/2.0/filterAll.xsd http://www.opengis.net/sos/2.0 http://schemas.opengis.net/sos/2.0/sosGetCapabilities.xsd http://www.opengis.net/ows/1.1 http://schemas.opengis.net/ows/1.1.0/owsAll.xsd",
            "serviceIdentification": {
                "title": {
                    "@lang": "eng",
                    "#text": "52N SOS"
                },
                "abstract": {
                    "@lang": "eng",
                    "#text": "52North Sensor Observation Service - Data Access for the Sensor Web"
                },
                "serviceType": "OGC:SOS",
                "serviceTypeVersion": [
                   "1.0.0",
                   "2.0.0"
                ],
                "profile": [
                   "http://www.opengis.net/extension/SOSDO/1.0/observationDeletion",
                   "http://www.opengis.net/spec/OMXML/1.0/conf/categoryObservation",
                   "http://www.opengis.net/spec/OMXML/1.0/conf/countObservation",
                   "http://www.opengis.net/spec/OMXML/1.0/conf/geometryObservation",
                   "http://www.opengis.net/spec/OMXML/1.0/conf/measurement",
                   "http://www.opengis.net/spec/OMXML/1.0/conf/textObservation",
                   "http://www.opengis.net/spec/OMXML/1.0/conf/truthObservation",
                   "http://www.opengis.net/spec/OMXML/2.0/conf/categoryObservation",
                   "http://www.opengis.net/spec/OMXML/2.0/conf/complexObservation",
                   "http://www.opengis.net/spec/OMXML/2.0/conf/countObservation",
                   "http://www.opengis.net/spec/OMXML/2.0/conf/geometryObservation",
                   "http://www.opengis.net/spec/OMXML/2.0/conf/measurement",
                   "http://www.opengis.net/spec/OMXML/2.0/conf/samplingCurve",
                   "http://www.opengis.net/spec/OMXML/2.0/conf/samplingPoint",
                   "http://www.opengis.net/spec/OMXML/2.0/conf/samplingSurface",
                   "http://www.opengis.net/spec/OMXML/2.0/conf/spatialSampling",
                   "http://www.opengis.net/spec/OMXML/2.0/conf/textObservation",
                   "http://www.opengis.net/spec/OMXML/2.0/conf/truthObservation",
                   "http://www.opengis.net/spec/SOS/1.0/conf/core",
                   "http://www.opengis.net/spec/SOS/1.0/conf/enhanced",
                   "http://www.opengis.net/spec/SOS/2.0/conf/core",
                   "http://www.opengis.net/spec/SOS/2.0/conf/daRetrieval",
                   "http://www.opengis.net/spec/SOS/2.0/conf/exi",
                   "http://www.opengis.net/spec/SOS/2.0/conf/foiRetrieval",
                   "http://www.opengis.net/spec/SOS/2.0/conf/insertionCap",
                   "http://www.opengis.net/spec/SOS/2.0/conf/json",
                   "http://www.opengis.net/spec/SOS/2.0/conf/kvp-core",
                   "http://www.opengis.net/spec/SOS/2.0/conf/obsByIdRetrieval",
                   "http://www.opengis.net/spec/SOS/2.0/conf/obsInsertion",
                   "http://www.opengis.net/spec/SOS/2.0/conf/pox",
                   "http://www.opengis.net/spec/SOS/2.0/conf/rest",
                   "http://www.opengis.net/spec/SOS/2.0/conf/resultInsertion",
                   "http://www.opengis.net/spec/SOS/2.0/conf/resultRetrieval",
                   "http://www.opengis.net/spec/SOS/2.0/conf/sensorDeletion",
                   "http://www.opengis.net/spec/SOS/2.0/conf/sensorInsertion",
                   "http://www.opengis.net/spec/SOS/2.0/conf/soap",
                   "http://www.opengis.net/spec/SOS/2.0/conf/updateSensorDescription",
                   "http://www.opengis.net/spec/SWE/2.0/conf/core",
                   "http://www.opengis.net/spec/SWE/2.0/conf/general-encoding-rules",
                   "http://www.opengis.net/spec/SWE/2.0/conf/text-encoding-rules",
                   "http://www.opengis.net/spec/SWE/2.0/conf/uml-block-components",
                   "http://www.opengis.net/spec/SWE/2.0/conf/uml-record-components",
                   "http://www.opengis.net/spec/SWE/2.0/conf/uml-simple-components",
                   "http://www.opengis.net/spec/SWE/2.0/conf/uml-simple-encodings",
                   "http://www.opengis.net/spec/SWE/2.0/conf/xsd-block-components",
                   "http://www.opengis.net/spec/SWE/2.0/conf/xsd-record-components",
                   "http://www.opengis.net/spec/SWE/2.0/conf/xsd-simple-components",
                   "http://www.opengis.net/spec/SWE/2.0/conf/xsd-simple-encodings",
                   "http://www.opengis.net/spec/waterml/2.0/conf/uml-measurement-timeries-tvp-observation",
                   "http://www.opengis.net/spec/waterml/2.0/conf/uml-timeseries-tvp-observation",
                   "http://www.opengis.net/spec/waterml/2.0/conf/xsd-measurement-timeseries-tvp",
                   "http://www.opengis.net/spec/waterml/2.0/conf/xsd-timeseries-observation",
                   "http://www.opengis.net/spec/waterml/2.0/conf/xsd-timeseries-tvp-observation",
                   "http://www.opengis.net/spec/waterml/2.0/conf/xsd-xml-rules"
                ],
                "fees": "NONE",
                "accessConstraints": "NONE"
            },
            "serviceProvider": {
                "providerName": "Trabajos Catastrales S.A",
                "providerSite": {
                    "@href": "http://tracasa.es"
                },
                "serviceContact": {
                    "individualName": "TBA",
                    "positionName": "TBA",
                    "contactInfo": {
                        "phone": {
                            "voice": "+34 948289000"
                        },
                        "address": {
                            "deliveryPoint": "C/ Cabárceno 6",
                            "city": "Sarriguren",
                            "administrativeArea": "Navarra",
                            "postalCode": "31621",
                            "country": "Spain",
                            "electronicMailAddress": "info@tracasa.es"
                        }
                    }
                }
            },
            "operationsMetadata": {
                "operation": [
                   {
                       "@name": "Batch",
                       "dCP": {
                           "hTTP": {
                               "post": {
                                   "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/json",
                                   "constraint": {
                                       "@name": "Content-Type",
                                       "allowedValues": {
                                           "value": "application/json"
                                       }
                                   }
                               }
                           }
                       }
                   },
                   {
                       "@name": "DeleteObservation",
                       "dCP": {
                           "hTTP": {
                               "get": {
                                   "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/kvp?",
                                   "constraint": {
                                       "@name": "Content-Type",
                                       "allowedValues": {
                                           "value": "application/x-kvp"
                                       }
                                   }
                               },
                               "post": [
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/exi",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/exi"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/json",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/json"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/pox",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": [
                                                 "application/xml",
                                                 "text/xml"
                                              ]
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/soap",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/soap+xml"
                                          }
                                      }
                                  }
                               ]
                           }
                       },
                       "parameter": {
                           "@name": "observation",
                           "anyValue": null
                       }
                   },
                   {
                       "@name": "DeleteSensor",
                       "dCP": {
                           "hTTP": {
                               "get": {
                                   "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/kvp?",
                                   "constraint": {
                                       "@name": "Content-Type",
                                       "allowedValues": {
                                           "value": "application/x-kvp"
                                       }
                                   }
                               },
                               "post": [
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/exi",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/exi"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/json",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/json"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/pox",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": [
                                                 "application/xml",
                                                 "text/xml"
                                              ]
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/soap",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/soap+xml"
                                          }
                                      }
                                  }
                               ]
                           }
                       },
                       "parameter": {
                           "@name": "procedure",
                           "allowedValues": {
                               "value": [
                                  "http://idena.navarra.es/olk/ad1/cl01",
                                  "http://idena.navarra.es/orb/ad1/cl01",
                                  "http://idena.navarra.es/ori/ad1/cl01",
                                  "http://idena.navarra.es/orr/ad1/cl01",
                                  "http://idena.navarra.es/sjr/an1/qa01",
                                  "http://idena.navarra.es/sju/ar1/qa02",
                                  "http://idena.navarra.es/srr/an1/qa01",
                                  "http://idena.navarra.es/srr/an2/qa01",
                                  "http://idena.navarra.es/tjn/an4/qa01",
                                  "http://idena.navarra.es/vll/an1/qa01"
                               ]
                           }
                       }
                   },
                   {
                       "@name": "DescribeSensor",
                       "dCP": {
                           "hTTP": {
                               "get": {
                                   "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/kvp?",
                                   "constraint": {
                                       "@name": "Content-Type",
                                       "allowedValues": {
                                           "value": "application/x-kvp"
                                       }
                                   }
                               },
                               "post": [
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/exi",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/exi"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/json",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/json"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/pox",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": [
                                                 "application/xml",
                                                 "text/xml"
                                              ]
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/soap",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/soap+xml"
                                          }
                                      }
                                  }
                               ]
                           }
                       },
                       "parameter": [
                          {
                              "@name": "procedure",
                              "allowedValues": {
                                  "value": [
                                     "http://idena.navarra.es/olk/ad1/cl01",
                                     "http://idena.navarra.es/orb/ad1/cl01",
                                     "http://idena.navarra.es/ori/ad1/cl01",
                                     "http://idena.navarra.es/orr/ad1/cl01",
                                     "http://idena.navarra.es/sjr/an1/qa01",
                                     "http://idena.navarra.es/sju/ar1/qa02",
                                     "http://idena.navarra.es/srr/an1/qa01",
                                     "http://idena.navarra.es/srr/an2/qa01",
                                     "http://idena.navarra.es/tjn/an4/qa01",
                                     "http://idena.navarra.es/vll/an1/qa01"
                                  ]
                              }
                          },
                          {
                              "@name": "procedureDescriptionFormat",
                              "allowedValues": {
                                  "value": [
                                     "http://www.opengis.net/sensorML/1.0.1",
                                     "http://www.opengis.net/sensorml/2.0",
                                     "http://www.opengis.net/waterml/2.0/observationProcess"
                                  ]
                              }
                          },
                          {
                              "@name": "validTime",
                              "anyValue": null
                          }
                       ]
                   },
                   {
                       "@name": "GetCapabilities",
                       "dCP": {
                           "hTTP": {
                               "get": {
                                   "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/kvp?",
                                   "constraint": {
                                       "@name": "Content-Type",
                                       "allowedValues": {
                                           "value": "application/x-kvp"
                                       }
                                   }
                               },
                               "post": [
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/exi",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/exi"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/json",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/json"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/pox",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": [
                                                 "application/xml",
                                                 "text/xml"
                                              ]
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/soap",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/soap+xml"
                                          }
                                      }
                                  }
                               ]
                           }
                       },
                       "parameter": [
                          {
                              "@name": "AcceptFormats",
                              "allowedValues": {
                                  "value": "application/xml"
                              }
                          },
                          {
                              "@name": "AcceptVersions",
                              "allowedValues": {
                                  "value": [
                                     "1.0.0",
                                     "2.0.0"
                                  ]
                              }
                          },
                          {
                              "@name": "Sections",
                              "allowedValues": {
                                  "value": [
                                     "All",
                                     "Contents",
                                     "FilterCapabilities",
                                     "InsertionCapabilities",
                                     "OperationsMetadata",
                                     "ServiceIdentification",
                                     "ServiceProvider"
                                  ]
                              }
                          },
                          {
                              "@name": "updateSequence",
                              "anyValue": null
                          }
                       ]
                   },
                   {
                       "@name": "GetDataAvailability",
                       "dCP": {
                           "hTTP": {
                               "get": {
                                   "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/kvp?",
                                   "constraint": {
                                       "@name": "Content-Type",
                                       "allowedValues": {
                                           "value": "application/x-kvp"
                                       }
                                   }
                               },
                               "post": [
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/exi",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/exi"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/json",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/json"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/pox",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": [
                                                 "application/xml",
                                                 "text/xml"
                                              ]
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/soap",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/soap+xml"
                                          }
                                      }
                                  }
                               ]
                           }
                       },
                       "parameter": [
                          {
                              "@name": "featureOfInterest",
                              "allowedValues": {
                                  "value": [
                                     "http://idena.navarra.es/olk/ad1",
                                     "http://idena.navarra.es/orb/ad1",
                                     "http://idena.navarra.es/ori/ad1",
                                     "http://idena.navarra.es/orr/ad1",
                                     "http://idena.navarra.es/sjr/an1",
                                     "http://idena.navarra.es/sju/ar1",
                                     "http://idena.navarra.es/srr/an1",
                                     "http://idena.navarra.es/srr/an2",
                                     "http://idena.navarra.es/tjn/an4",
                                     "http://idena.navarra.es/vll/an1"
                                  ]
                              }
                          },
                          {
                              "@name": "observedProperty",
                              "allowedValues": {
                                  "value": [
                                     "http://sweet.jpl.nasa.gov/2.3/matrElementalMolecule.owl#Cl2",
                                     "http://sweet.jpl.nasa.gov/2.3/phenHydro.owl#WaterFlow"
                                  ]
                              }
                          },
                          {
                              "@name": "procedure",
                              "allowedValues": {
                                  "value": [
                                     "http://idena.navarra.es/olk/ad1/cl01",
                                     "http://idena.navarra.es/orb/ad1/cl01",
                                     "http://idena.navarra.es/ori/ad1/cl01",
                                     "http://idena.navarra.es/orr/ad1/cl01",
                                     "http://idena.navarra.es/sjr/an1/qa01",
                                     "http://idena.navarra.es/sju/ar1/qa02",
                                     "http://idena.navarra.es/srr/an1/qa01",
                                     "http://idena.navarra.es/srr/an2/qa01",
                                     "http://idena.navarra.es/tjn/an4/qa01",
                                     "http://idena.navarra.es/vll/an1/qa01"
                                  ]
                              }
                          }
                       ]
                   },
                   {
                       "@name": "GetFeatureOfInterest",
                       "dCP": {
                           "hTTP": {
                               "get": {
                                   "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/kvp?",
                                   "constraint": {
                                       "@name": "Content-Type",
                                       "allowedValues": {
                                           "value": "application/x-kvp"
                                       }
                                   }
                               },
                               "post": [
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/exi",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/exi"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/json",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/json"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/pox",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": [
                                                 "application/xml",
                                                 "text/xml"
                                              ]
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/soap",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/soap+xml"
                                          }
                                      }
                                  }
                               ]
                           }
                       },
                       "parameter": [
                          {
                              "@name": "featureOfInterest",
                              "allowedValues": {
                                  "value": [
                                     "http://idena.navarra.es/olk/ad1",
                                     "http://idena.navarra.es/orb/ad1",
                                     "http://idena.navarra.es/ori/ad1",
                                     "http://idena.navarra.es/orr/ad1",
                                     "http://idena.navarra.es/sjr/an1",
                                     "http://idena.navarra.es/sju/ar1",
                                     "http://idena.navarra.es/srr/an1",
                                     "http://idena.navarra.es/srr/an2",
                                     "http://idena.navarra.es/tjn/an4",
                                     "http://idena.navarra.es/vll/an1"
                                  ]
                              }
                          },
                          {
                              "@name": "observedProperty",
                              "allowedValues": {
                                  "value": [
                                     "http://sweet.jpl.nasa.gov/2.3/matrElementalMolecule.owl#Cl2",
                                     "http://sweet.jpl.nasa.gov/2.3/phenHydro.owl#WaterFlow"
                                  ]
                              }
                          },
                          {
                              "@name": "procedure",
                              "allowedValues": {
                                  "value": [
                                     "http://idena.navarra.es/olk/ad1/cl01",
                                     "http://idena.navarra.es/orb/ad1/cl01",
                                     "http://idena.navarra.es/ori/ad1/cl01",
                                     "http://idena.navarra.es/orr/ad1/cl01",
                                     "http://idena.navarra.es/sjr/an1/qa01",
                                     "http://idena.navarra.es/sju/ar1/qa02",
                                     "http://idena.navarra.es/srr/an1/qa01",
                                     "http://idena.navarra.es/srr/an2/qa01",
                                     "http://idena.navarra.es/tjn/an4/qa01",
                                     "http://idena.navarra.es/vll/an1/qa01"
                                  ]
                              }
                          },
                          {
                              "@name": "spatialFilter",
                              "allowedValues": {
                                  "range": {
                                      "minimumValue": "42.7779 -1.7489",
                                      "maximumValue": "42.876 -1.5804"
                                  }
                              }
                          }
                       ]
                   },
                   {
                       "@name": "GetObservation",
                       "dCP": {
                           "hTTP": {
                               "get": {
                                   "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/kvp?",
                                   "constraint": {
                                       "@name": "Content-Type",
                                       "allowedValues": {
                                           "value": "application/x-kvp"
                                       }
                                   }
                               },
                               "post": [
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/exi",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/exi"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/json",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/json"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/pox",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": [
                                                 "application/xml",
                                                 "text/xml"
                                              ]
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/soap",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/soap+xml"
                                          }
                                      }
                                  }
                               ]
                           }
                       },
                       "parameter": [
                          {
                              "@name": "featureOfInterest",
                              "allowedValues": {
                                  "value": [
                                     "http://idena.navarra.es/olk/ad1",
                                     "http://idena.navarra.es/orb/ad1",
                                     "http://idena.navarra.es/ori/ad1",
                                     "http://idena.navarra.es/orr/ad1",
                                     "http://idena.navarra.es/sjr/an1",
                                     "http://idena.navarra.es/sju/ar1",
                                     "http://idena.navarra.es/srr/an1",
                                     "http://idena.navarra.es/srr/an2",
                                     "http://idena.navarra.es/tjn/an4",
                                     "http://idena.navarra.es/vll/an1"
                                  ]
                              }
                          },
                          {
                              "@name": "observedProperty",
                              "allowedValues": {
                                  "value": [
                                     "http://sweet.jpl.nasa.gov/2.3/matrElementalMolecule.owl#Cl2",
                                     "http://sweet.jpl.nasa.gov/2.3/phenHydro.owl#WaterFlow"
                                  ]
                              }
                          },
                          {
                              "@name": "offering",
                              "allowedValues": {
                                  "value": [
                                     "http://idena.navarra.es/orb/ad1/cl01/offering/1",
                                     "http://idena.navarra.es/ori/ad1/cl01/offering/1",
                                     "http://idena.navarra.es/orr/ad1/cl01/offering/1",
                                     "http://idena.navarra.es/sjr/an1/qa01/offering/1",
                                     "http://idena.navarra.es/sju/ar1/qa02/offering/1",
                                     "http://idena.navarra.es/srr/an1/qa01/offering/1",
                                     "http://idena.navarra.es/srr/an2/qa01/offering/1",
                                     "http://idena.navarra.es/tjn/an4/qa01/offering/1",
                                     "http://idena.navarra.es/vll/an1/qa01/offering/1"
                                  ]
                              }
                          },
                          {
                              "@name": "procedure",
                              "allowedValues": {
                                  "value": [
                                     "http://idena.navarra.es/olk/ad1/cl01",
                                     "http://idena.navarra.es/orb/ad1/cl01",
                                     "http://idena.navarra.es/ori/ad1/cl01",
                                     "http://idena.navarra.es/orr/ad1/cl01",
                                     "http://idena.navarra.es/sjr/an1/qa01",
                                     "http://idena.navarra.es/sju/ar1/qa02",
                                     "http://idena.navarra.es/srr/an1/qa01",
                                     "http://idena.navarra.es/srr/an2/qa01",
                                     "http://idena.navarra.es/tjn/an4/qa01",
                                     "http://idena.navarra.es/vll/an1/qa01"
                                  ]
                              }
                          },
                          {
                              "@name": "responseFormat",
                              "allowedValues": {
                                  "value": [
                                     "application/json",
                                     "application/netcdf",
                                     "application/netcdf; profile=OceanSITES",
                                     "application/netcdf; version=3",
                                     "application/netcdf; version=3; profile=OceanSITES",
                                     "application/netcdf; version=4",
                                     "application/netcdf; version=4; profile=OceanSITES",
                                     "application/zip; subtype=netcdf",
                                     "application/zip; subtype=netcdf; profile=OceanSITES",
                                     "application/zip; subtype=netcdf; version=3",
                                     "application/zip; subtype=netcdf; version=3; profile=OceanSITES",
                                     "application/zip; subtype=netcdf; version=4",
                                     "application/zip; subtype=netcdf; version=4; profile=OceanSITES",
                                     "http://dd.eionet.europa.eu/schemaset/id2011850eu-1.0",
                                     "http://www.opengis.net/om/2.0",
                                     "http://www.opengis.net/waterml-dr/2.0",
                                     "http://www.opengis.net/waterml/2.0"
                                  ]
                              }
                          },
                          {
                              "@name": "spatialFilter",
                              "allowedValues": {
                                  "range": {
                                      "minimumValue": "42.7779 -1.7489",
                                      "maximumValue": "42.876 -1.5804"
                                  }
                              }
                          },
                          {
                              "@name": "temporalFilter",
                              "allowedValues": {
                                  "range": {
                                      "minimumValue": "2015-07-06T10:00:00.000Z",
                                      "maximumValue": "2015-07-06T12:59:00.000Z"
                                  }
                              }
                          }
                       ]
                   },
                   {
                       "@name": "GetObservationById",
                       "dCP": {
                           "hTTP": {
                               "get": {
                                   "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/kvp?",
                                   "constraint": {
                                       "@name": "Content-Type",
                                       "allowedValues": {
                                           "value": "application/x-kvp"
                                       }
                                   }
                               },
                               "post": [
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/exi",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/exi"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/json",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/json"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/pox",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": [
                                                 "application/xml",
                                                 "text/xml"
                                              ]
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/soap",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/soap+xml"
                                          }
                                      }
                                  }
                               ]
                           }
                       },
                       "parameter": {
                           "@name": "observation",
                           "anyValue": null
                       }
                   },
                   {
                       "@name": "GetResult",
                       "dCP": {
                           "hTTP": {
                               "get": {
                                   "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/kvp?",
                                   "constraint": {
                                       "@name": "Content-Type",
                                       "allowedValues": {
                                           "value": "application/x-kvp"
                                       }
                                   }
                               },
                               "post": [
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/exi",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/exi"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/json",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/json"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/pox",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": [
                                                 "application/xml",
                                                 "text/xml"
                                              ]
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/soap",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/soap+xml"
                                          }
                                      }
                                  }
                               ]
                           }
                       },
                       "parameter": [
                          {
                              "@name": "featureOfInterest",
                              "anyValue": null
                          },
                          {
                              "@name": "observedProperty",
                              "anyValue": null
                          },
                          {
                              "@name": "offering",
                              "anyValue": null
                          }
                       ]
                   },
                   {
                       "@name": "GetResultTemplate",
                       "dCP": {
                           "hTTP": {
                               "get": {
                                   "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/kvp?",
                                   "constraint": {
                                       "@name": "Content-Type",
                                       "allowedValues": {
                                           "value": "application/x-kvp"
                                       }
                                   }
                               },
                               "post": [
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/exi",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/exi"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/json",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/json"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/pox",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": [
                                                 "application/xml",
                                                 "text/xml"
                                              ]
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/soap",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/soap+xml"
                                          }
                                      }
                                  }
                               ]
                           }
                       },
                       "parameter": [
                          {
                              "@name": "observedProperty",
                              "anyValue": null
                          },
                          {
                              "@name": "offering",
                              "anyValue": null
                          }
                       ]
                   },
                   {
                       "@name": "InsertObservation",
                       "dCP": {
                           "hTTP": {
                               "post": [
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/exi",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/exi"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/json",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/json"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/pox",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": [
                                                 "application/xml",
                                                 "text/xml"
                                              ]
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/soap",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/soap+xml"
                                          }
                                      }
                                  }
                               ]
                           }
                       },
                       "parameter": [
                          {
                              "@name": "observation",
                              "anyValue": null,
                              "dataType": {
                                  "@reference": "http://schemas.opengis.net/om/2.0/observation.xsd#OM_Observation"
                              }
                          },
                          {
                              "@name": "offering",
                              "allowedValues": {
                                  "value": [
                                     "http://idena.navarra.es/orb/ad1/cl01/offering/1",
                                     "http://idena.navarra.es/ori/ad1/cl01/offering/1",
                                     "http://idena.navarra.es/orr/ad1/cl01/offering/1",
                                     "http://idena.navarra.es/sjr/an1/qa01/offering/1",
                                     "http://idena.navarra.es/sju/ar1/qa02/offering/1",
                                     "http://idena.navarra.es/srr/an1/qa01/offering/1",
                                     "http://idena.navarra.es/srr/an2/qa01/offering/1",
                                     "http://idena.navarra.es/tjn/an4/qa01/offering/1",
                                     "http://idena.navarra.es/vll/an1/qa01/offering/1"
                                  ]
                              }
                          }
                       ]
                   },
                   {
                       "@name": "InsertResult",
                       "dCP": {
                           "hTTP": {
                               "post": [
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/exi",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/exi"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/json",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/json"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/pox",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": [
                                                 "application/xml",
                                                 "text/xml"
                                              ]
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/soap",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/soap+xml"
                                          }
                                      }
                                  }
                               ]
                           }
                       },
                       "parameter": [
                          {
                              "@name": "resultValues",
                              "anyValue": null
                          },
                          {
                              "@name": "template",
                              "anyValue": null
                          }
                       ]
                   },
                   {
                       "@name": "InsertResultTemplate",
                       "dCP": {
                           "hTTP": {
                               "post": [
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/exi",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/exi"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/json",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/json"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/pox",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": [
                                                 "application/xml",
                                                 "text/xml"
                                              ]
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/soap",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/soap+xml"
                                          }
                                      }
                                  }
                               ]
                           }
                       },
                       "parameter": {
                           "@name": "proposedTemplate",
                           "anyValue": null
                       }
                   },
                   {
                       "@name": "InsertSensor",
                       "dCP": {
                           "hTTP": {
                               "post": [
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/exi",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/exi"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/json",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/json"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/pox",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": [
                                                 "application/xml",
                                                 "text/xml"
                                              ]
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/soap",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/soap+xml"
                                          }
                                      }
                                  }
                               ]
                           }
                       },
                       "parameter": [
                          {
                              "@name": "metadata",
                              "anyValue": null,
                              "dataType": {
                                  "@reference": "http://schemas.opengis.net/sos/2.0/sosInsertionCapabilities.xsd#InsertionCapabilities"
                              }
                          },
                          {
                              "@name": "observableProperty",
                              "anyValue": null
                          },
                          {
                              "@name": "procedureDescription",
                              "anyValue": null
                          },
                          {
                              "@name": "procedureDescriptionFormat",
                              "allowedValues": {
                                  "value": [
                                     "http://www.opengis.net/sensorML/1.0.1",
                                     "http://www.opengis.net/sensorml/2.0",
                                     "http://www.opengis.net/waterml/2.0/observationProcess"
                                  ]
                              }
                          }
                       ]
                   },
                   {
                       "@name": "UpdateSensorDescription",
                       "dCP": {
                           "hTTP": {
                               "post": [
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/exi",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/exi"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/json",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/json"
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/pox",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": [
                                                 "application/xml",
                                                 "text/xml"
                                              ]
                                          }
                                      }
                                  },
                                  {
                                      "@href": "http://pmplrenta03:8080/52n-sos-webapp/sos/soap",
                                      "constraint": {
                                          "@name": "Content-Type",
                                          "allowedValues": {
                                              "value": "application/soap+xml"
                                          }
                                      }
                                  }
                               ]
                           }
                       },
                       "parameter": [
                          {
                              "@name": "description",
                              "anyValue": null
                          },
                          {
                              "@name": "procedure",
                              "allowedValues": {
                                  "value": [
                                     "http://idena.navarra.es/olk/ad1/cl01",
                                     "http://idena.navarra.es/orb/ad1/cl01",
                                     "http://idena.navarra.es/ori/ad1/cl01",
                                     "http://idena.navarra.es/orr/ad1/cl01",
                                     "http://idena.navarra.es/sjr/an1/qa01",
                                     "http://idena.navarra.es/sju/ar1/qa02",
                                     "http://idena.navarra.es/srr/an1/qa01",
                                     "http://idena.navarra.es/srr/an2/qa01",
                                     "http://idena.navarra.es/tjn/an4/qa01",
                                     "http://idena.navarra.es/vll/an1/qa01"
                                  ]
                              }
                          },
                          {
                              "@name": "procedureDescriptionFormat",
                              "allowedValues": {
                                  "value": [
                                     "http://www.opengis.net/sensorML/1.0.1",
                                     "http://www.opengis.net/sensorml/2.0",
                                     "http://www.opengis.net/waterml/2.0/observationProcess"
                                  ]
                              }
                          }
                       ]
                   }
                ],
                "parameter": [
                   {
                       "@name": "crs",
                       "allowedValues": {
                           "value": [
                              "http://www.opengis.net/def/crs/EPSG/0/31466",
                              "http://www.opengis.net/def/crs/EPSG/0/31467",
                              "http://www.opengis.net/def/crs/EPSG/0/4258",
                              "http://www.opengis.net/def/crs/EPSG/0/4326",
                              "http://www.opengis.net/def/crs/EPSG/0/4979"
                           ]
                       }
                   },
                   {
                       "@name": "language",
                       "allowedValues": {
                           "value": "eng"
                       }
                   },
                   {
                       "@name": "service",
                       "allowedValues": {
                           "value": "SOS"
                       }
                   },
                   {
                       "@name": "version",
                       "allowedValues": {
                           "value": [
                              "1.0.0",
                              "2.0.0"
                           ]
                       }
                   }
                ]
            },
            "filterCapabilities": {
                "filter_Capabilities": {
                    "conformance": {
                        "constraint": [
                           {
                               "@name": "ImplementsQuery",
                               "noValues": null,
                               "defaultValue": "false"
                           },
                           {
                               "@name": "ImplementsAdHocQuery",
                               "noValues": null,
                               "defaultValue": "false"
                           },
                           {
                               "@name": "ImplementsFunctions",
                               "noValues": null,
                               "defaultValue": "false"
                           },
                           {
                               "@name": "ImplementsResourceld",
                               "noValues": null,
                               "defaultValue": "false"
                           },
                           {
                               "@name": "ImplementsMinStandardFilter",
                               "noValues": null,
                               "defaultValue": "false"
                           },
                           {
                               "@name": "ImplementsStandardFilter",
                               "noValues": null,
                               "defaultValue": "false"
                           },
                           {
                               "@name": "ImplementsMinSpatialFilter",
                               "noValues": null,
                               "defaultValue": "true"
                           },
                           {
                               "@name": "ImplementsSpatialFilter",
                               "noValues": null,
                               "defaultValue": "true"
                           },
                           {
                               "@name": "ImplementsMinTemporalFilter",
                               "noValues": null,
                               "defaultValue": "true"
                           },
                           {
                               "@name": "ImplementsTemporalFilter",
                               "noValues": null,
                               "defaultValue": "true"
                           },
                           {
                               "@name": "ImplementsVersionNav",
                               "noValues": null,
                               "defaultValue": "false"
                           },
                           {
                               "@name": "ImplementsSorting",
                               "noValues": null,
                               "defaultValue": "false"
                           },
                           {
                               "@name": "ImplementsExtendedOperators",
                               "noValues": null,
                               "defaultValue": "false"
                           },
                           {
                               "@name": "ImplementsMinimumXPath",
                               "noValues": null,
                               "defaultValue": "false"
                           },
                           {
                               "@name": "ImplementsSchemaElementFunc",
                               "noValues": null,
                               "defaultValue": "false"
                           }
                        ]
                    },
                    "spatial_Capabilities": {
                        "geometryOperands": {
                            "geometryOperand": {
                                "@ns": "http://www.opengis.net/gml/3.2",
                                "@name": "ns:Envelope"
                            }
                        },
                        "spatialOperators": {
                            "spatialOperator": {
                                "@name": "BBOX",
                                "geometryOperands": {
                                    "geometryOperand": {
                                        "@ns": "http://www.opengis.net/gml/3.2",
                                        "@name": "ns:Envelope"
                                    }
                                }
                            }
                        }
                    },
                    "temporal_Capabilities": {
                        "temporalOperands": {
                            "temporalOperand": [
                               {
                                   "@ns": "http://www.opengis.net/gml/3.2",
                                   "@name": "ns:TimeInstant"
                               },
                               {
                                   "@ns": "http://www.opengis.net/gml/3.2",
                                   "@name": "ns:TimePeriod"
                               }
                            ]
                        },
                        "temporalOperators": {
                            "temporalOperator": [
                               {
                                   "@name": "Before",
                                   "temporalOperands": {
                                       "temporalOperand": [
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimeInstant"
                                          },
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimePeriod"
                                          }
                                       ]
                                   }
                               },
                               {
                                   "@name": "After",
                                   "temporalOperands": {
                                       "temporalOperand": [
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimeInstant"
                                          },
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimePeriod"
                                          }
                                       ]
                                   }
                               },
                               {
                                   "@name": "Begins",
                                   "temporalOperands": {
                                       "temporalOperand": [
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimeInstant"
                                          },
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimePeriod"
                                          }
                                       ]
                                   }
                               },
                               {
                                   "@name": "Ends",
                                   "temporalOperands": {
                                       "temporalOperand": [
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimeInstant"
                                          },
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimePeriod"
                                          }
                                       ]
                                   }
                               },
                               {
                                   "@name": "EndedBy",
                                   "temporalOperands": {
                                       "temporalOperand": [
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimeInstant"
                                          },
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimePeriod"
                                          }
                                       ]
                                   }
                               },
                               {
                                   "@name": "BegunBy",
                                   "temporalOperands": {
                                       "temporalOperand": [
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimeInstant"
                                          },
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimePeriod"
                                          }
                                       ]
                                   }
                               },
                               {
                                   "@name": "During",
                                   "temporalOperands": {
                                       "temporalOperand": [
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimeInstant"
                                          },
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimePeriod"
                                          }
                                       ]
                                   }
                               },
                               {
                                   "@name": "TEquals",
                                   "temporalOperands": {
                                       "temporalOperand": [
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimeInstant"
                                          },
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimePeriod"
                                          }
                                       ]
                                   }
                               },
                               {
                                   "@name": "TContains",
                                   "temporalOperands": {
                                       "temporalOperand": [
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimeInstant"
                                          },
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimePeriod"
                                          }
                                       ]
                                   }
                               },
                               {
                                   "@name": "TOverlaps",
                                   "temporalOperands": {
                                       "temporalOperand": [
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimeInstant"
                                          },
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimePeriod"
                                          }
                                       ]
                                   }
                               },
                               {
                                   "@name": "Meets",
                                   "temporalOperands": {
                                       "temporalOperand": [
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimeInstant"
                                          },
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimePeriod"
                                          }
                                       ]
                                   }
                               },
                               {
                                   "@name": "MetBy",
                                   "temporalOperands": {
                                       "temporalOperand": [
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimeInstant"
                                          },
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimePeriod"
                                          }
                                       ]
                                   }
                               },
                               {
                                   "@name": "OverlappedBy",
                                   "temporalOperands": {
                                       "temporalOperand": [
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimeInstant"
                                          },
                                          {
                                              "@ns": "http://www.opengis.net/gml/3.2",
                                              "@name": "ns:TimePeriod"
                                          }
                                       ]
                                   }
                               }
                            ]
                        }
                    }
                }
            }
        }
    }
};