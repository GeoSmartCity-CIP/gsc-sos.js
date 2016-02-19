"undefined" == typeof XML && (XML = function $XML$() {
});
XML.XTree = function $XML$XTree$() {
  return this;
};
XML.XTree.prototype.parseXml = function $XML$XTree$$parseXml$($xml$$) {
  var $dom$$ = null;
  if (window.DOMParser) {
    try {
      $dom$$ = (new DOMParser).parseFromString($xml$$, "text/xml");
    } catch ($e$$) {
      $dom$$ = null;
    }
  } else {
    if (window.ActiveXObject) {
      try {
        $dom$$ = new ActiveXObject("Microsoft.XMLDOM"), $dom$$.async = !1, $dom$$.loadXML($xml$$) || console.log($dom$$.parseError.reason + $dom$$.parseError.srcText);
      } catch ($e$$0$$) {
        $dom$$ = null;
      }
    } else {
      console.log("XML.Xtree: Error on parse XML");
    }
  }
  return $dom$$;
};
XML.XTree.prototype.toJson = function $XML$XTree$$toJson$($xml$$0$$, $tab$$) {
  var $X$$ = {toObj:function($xml$$) {
    var $o$$ = {}, $toCamelCase$$ = function $$toCamelCase$$$($str$$) {
      return $str$$.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function($match$$, $index$$) {
        return 0 === +$match$$ ? "" : 0 == $index$$ ? $match$$.toLowerCase() : $match$$.toUpperCase();
      });
    };
    if (1 == $xml$$.nodeType) {
      if ($xml$$.attributes.length) {
        for (var $i$$4_n$$ = 0;$i$$4_n$$ < $xml$$.attributes.length;$i$$4_n$$++) {
          var $attrName_nodeName_textChild$$ = -1 < $xml$$.attributes[$i$$4_n$$].nodeName.indexOf(":") ? $xml$$.attributes[$i$$4_n$$].nodeName.split(":").pop() : $xml$$.attributes[$i$$4_n$$].nodeName, $attrName_nodeName_textChild$$ = $toCamelCase$$($attrName_nodeName_textChild$$);
          $o$$["@" + $attrName_nodeName_textChild$$] = ($xml$$.attributes[$i$$4_n$$].nodeValue || "").toString();
        }
      }
      if ($xml$$.firstChild) {
        for (var $cdataChild$$ = $attrName_nodeName_textChild$$ = 0, $hasElementChild$$ = !1, $i$$4_n$$ = $xml$$.firstChild;$i$$4_n$$;$i$$4_n$$ = $i$$4_n$$.nextSibling) {
          1 == $i$$4_n$$.nodeType ? $hasElementChild$$ = !0 : 3 == $i$$4_n$$.nodeType && $i$$4_n$$.nodeValue.match(/[^ \f\n\r\t\v]/) ? $attrName_nodeName_textChild$$++ : 4 == $i$$4_n$$.nodeType && $cdataChild$$++;
        }
        if ($hasElementChild$$) {
          if (2 > $attrName_nodeName_textChild$$ && 2 > $cdataChild$$) {
            for ($X$$.removeWhite($xml$$), $i$$4_n$$ = $xml$$.firstChild;$i$$4_n$$;$i$$4_n$$ = $i$$4_n$$.nextSibling) {
              $attrName_nodeName_textChild$$ = $i$$4_n$$.nodeName, $attrName_nodeName_textChild$$ = $attrName_nodeName_textChild$$.split(":").pop(), $attrName_nodeName_textChild$$ = $toCamelCase$$($attrName_nodeName_textChild$$), 3 == $i$$4_n$$.nodeType ? $o$$["#text"] = $X$$.escape($i$$4_n$$.nodeValue) : 4 == $i$$4_n$$.nodeType ? $o$$["#cdata"] = $X$$.escape($i$$4_n$$.nodeValue) : $o$$[$attrName_nodeName_textChild$$] ? $o$$[$attrName_nodeName_textChild$$] instanceof Array ? $o$$[$attrName_nodeName_textChild$$][$o$$[$attrName_nodeName_textChild$$].length] = 
              $X$$.toObj($i$$4_n$$) : $o$$[$attrName_nodeName_textChild$$] = [$o$$[$attrName_nodeName_textChild$$], $X$$.toObj($i$$4_n$$)] : $o$$[$attrName_nodeName_textChild$$] = $X$$.toObj($i$$4_n$$);
            }
          } else {
            $xml$$.attributes.length ? $o$$["#text"] = $X$$.escape($X$$.innerXml($xml$$)) : $o$$ = $X$$.escape($X$$.innerXml($xml$$));
          }
        } else {
          if ($attrName_nodeName_textChild$$) {
            $xml$$.attributes.length ? $o$$["#text"] = $X$$.escape($X$$.innerXml($xml$$)) : $o$$ = $X$$.escape($X$$.innerXml($xml$$));
          } else {
            if ($cdataChild$$) {
              if (1 < $cdataChild$$) {
                $o$$ = $X$$.escape($X$$.innerXml($xml$$));
              } else {
                for ($i$$4_n$$ = $xml$$.firstChild;$i$$4_n$$;$i$$4_n$$ = $i$$4_n$$.nextSibling) {
                  $o$$["#cdata"] = $X$$.escape($i$$4_n$$.nodeValue);
                }
              }
            }
          }
        }
      }
      $xml$$.attributes.length || $xml$$.firstChild || ($o$$ = null);
    } else {
      9 == $xml$$.nodeType ? $o$$ = $X$$.toObj($xml$$.documentElement) : alert("unhandled node type: " + $xml$$.nodeType);
    }
    return $o$$;
  }, toJson:function($o$$, $name$$, $ind$$) {
    var $json$$ = $name$$ ? '"' + $name$$ + '"' : "";
    if ($o$$ instanceof Array) {
      for (var $arr$$8_i$$ = 0, $m_n$$ = $o$$.length;$arr$$8_i$$ < $m_n$$;$arr$$8_i$$++) {
        $o$$[$arr$$8_i$$] = $X$$.toJson($o$$[$arr$$8_i$$], "", $ind$$ + "\t");
      }
      $json$$ += ($name$$ ? ":[" : "[") + (1 < $o$$.length ? "\n" + $ind$$ + "\t" + $o$$.join(",\n" + $ind$$ + "\t") + "\n" + $ind$$ : $o$$.join("")) + "]";
    } else {
      if (null == $o$$) {
        $json$$ += ($name$$ && ":") + "null";
      } else {
        if ("object" == typeof $o$$) {
          $arr$$8_i$$ = [];
          for ($m_n$$ in $o$$) {
            $arr$$8_i$$[$arr$$8_i$$.length] = $X$$.toJson($o$$[$m_n$$], $m_n$$, $ind$$ + "\t");
          }
          $json$$ += ($name$$ ? ":{" : "{") + (1 < $arr$$8_i$$.length ? "\n" + $ind$$ + "\t" + $arr$$8_i$$.join(",\n" + $ind$$ + "\t") + "\n" + $ind$$ : $arr$$8_i$$.join("")) + "}";
        } else {
          $json$$ = "string" == typeof $o$$ ? $json$$ + (($name$$ && ":") + '"' + $o$$.toString() + '"') : $json$$ + (($name$$ && ":") + $o$$.toString());
        }
      }
    }
    return $json$$;
  }, innerXml:function($c_node$$) {
    var $s$$0$$ = "";
    if ("innerHTML" in $c_node$$) {
      $s$$0$$ = $c_node$$.innerHTML;
    } else {
      var $asXml$$ = function $$asXml$$$($n$$) {
        var $s$$ = "";
        if (1 == $n$$.nodeType) {
          for (var $s$$ = $s$$ + ("<" + $n$$.nodeName), $c$$1_i$$ = 0;$c$$1_i$$ < $n$$.attributes.length;$c$$1_i$$++) {
            $s$$ += " " + $n$$.attributes[$c$$1_i$$].nodeName + '="' + ($n$$.attributes[$c$$1_i$$].nodeValue || "").toString() + '"';
          }
          if ($n$$.firstChild) {
            $s$$ += ">";
            for ($c$$1_i$$ = $n$$.firstChild;$c$$1_i$$;$c$$1_i$$ = $c$$1_i$$.nextSibling) {
              $s$$ += $asXml$$($c$$1_i$$);
            }
            $s$$ += "</" + $n$$.nodeName + ">";
          } else {
            $s$$ += "/>";
          }
        } else {
          3 == $n$$.nodeType ? $s$$ += $n$$.nodeValue : 4 == $n$$.nodeType && ($s$$ += "<![CDATA[" + $n$$.nodeValue + "]]\x3e");
        }
        return $s$$;
      };
      for ($c_node$$ = $c_node$$.firstChild;$c_node$$;$c_node$$ = $c_node$$.nextSibling) {
        $s$$0$$ += $asXml$$($c_node$$);
      }
    }
    return $s$$0$$;
  }, escape:function($txt$$) {
    return $txt$$.replace(/[\\]/g, "\\\\").replace(/[\"]/g, '\\"').replace(/[\n]/g, "\\n").replace(/[\r]/g, "\\r");
  }, removeWhite:function($e$$) {
    $e$$.normalize();
    for (var $n$$ = $e$$.firstChild;$n$$;) {
      if (3 == $n$$.nodeType) {
        if ($n$$.nodeValue.match(/[^ \f\n\r\t\v]/)) {
          $n$$ = $n$$.nextSibling;
        } else {
          var $nxt$$ = $n$$.nextSibling;
          $e$$.removeChild($n$$);
          $n$$ = $nxt$$;
        }
      } else {
        1 == $n$$.nodeType && $X$$.removeWhite($n$$), $n$$ = $n$$.nextSibling;
      }
    }
    return $e$$;
  }};
  9 == $xml$$0$$.nodeType && ($xml$$0$$ = $xml$$0$$.documentElement);
  var $json$$ = $X$$.toJson($X$$.toObj($X$$.removeWhite($xml$$0$$)), -1 < $xml$$0$$.nodeName.indexOf(":") ? $xml$$0$$.nodeName.split(":").pop() : $xml$$0$$.nodeName, "\t"), $json$$ = "{\n" + $tab$$ + ($tab$$ ? $json$$.replace(/\t/g, $tab$$) : $json$$.replace(/\t|\n/g, "")) + "\n}";
  return JSON.parse($json$$);
};
XML.XTree.prototype.getJson = function $XML$XTree$$getJson$($xml$$) {
  if ($xml$$ = this.parseXml($xml$$)) {
    return this.toJson($xml$$, "\t");
  }
};
var SOS = function $SOS$($options$$) {
  if (!(this instanceof SOS)) {
    throw Error("SOS " + SOS.Const.ErrorText.SOS_VIA_NEW);
  }
  this.config = this.sensorDescFormatter = this.foiFormatter = this.obsFormatter = this.capsFormatter = this.events = this.scope = this.capabilitiesPromise = this.url = null;
  this.initialize($options$$);
};
SOS.bindingType = {XML:"xml", JSON:"json"};
SOS.offeringType = {SOS_1:"sos_1", SOS_2:"sos_2"};
SOS.Const = {};
SOS.Const.ErrorText = {SOS_VIA_NEW:" must be constructed via new", SOS_URL_MISSING:"Error requiere URL del servicio", SOS_CAPABILITIES_ERROR:"Error en la solicitud del capabilities", SOS_SENSOR_DESCRIPTION_ERROR:"Error en la solicitud de la descripci\u00f3n", SOS_FEATURE_OF_INTEREST_ERROR:"Error en la solicitud de features of interest", SOS_OBSERVATION_ERROR:"Error en la solicitud de observaciones", XML:{UNKNOWN_PARAM:"Error par\u00e1metro desconocido", WRONG_PARAM:"Error par\u00e1metro incorrecto", 
EMPTY_PARAM:"Error par\u00e1metro valor vac\u00edo"}, FOI:{SOS_FOI_GET_BY_POINT_SRS_MISSING:"Error requiere SRS", SOS_FOI_GET_BY_POINT_COORDS_MISSING:"Error requiere array con coordenadas", SOS_FOI_GET_BY_POINT_RADIUS_MISSING:"Error requiere radio en unidad de medida del mapa"}};
SOS.Const.Events = {SOS_CAPABILITIES_AVAILABLE:"sosCapabilitiesAvailable", SOS_OFFERINGS_CAPABILITIES_AVAILABLE:"sosOffsCapabilitiesAvailable", SOS_SENSOR_DESCRIPTION_AVAILABLE:"sosSensorDescriptionAvailable", SOS_FEATURE_OF_INTEREST_AVAILABLE:"sosFeatureOfInterestAvailable", SOS_FEATURES_OF_INTEREST_AVAILABLE:"sosFeaturesOfInterestAvailable", SOS_OBSERVATION_AVAILABLE:"sosObservationAvailable", SOS_LATEST_OBSERVATION_AVAILABLE:"sosLatestObservationAvailable", SOS_OFFERING_OBSERVATION_AVAILABLE:"sosOfferingObsAvailable", 
SOS_OFFERING_RESULT_AVAILABLE:"sosOfferingResultAvailable", SOS_OBSERVATION_BY_ID_AVAILABLE:"sosObservationByIdAvailable"};
SOS.prototype.getResponseFormatType = function $SOS$$getResponseFormatType$($post$$) {
  switch(this.bindingType) {
    case "xml":
      return "text/xml";
    case "json":
      return "application/json";
  }
};
SOS.prototype.getResponseFormat = function $SOS$$getResponseFormat$() {
  switch(this.bindingType) {
    case "xml":
      return 'text/xml;subtype="om/1.0.0"';
    case "json":
      return "application/json;charset=UTF-8";
  }
};
SOS.prototype.initialize = function $SOS$$initialize$($options$$) {
  this.url = null;
  $options$$.bindingType ? this.bindingType = $options$$.bindingType : (this.bindingType = this.bindingType.XML, console.log("SOS bindingType missing."));
  SOS.Proxy.init();
  this.url = null;
  this.config = {version:"2.0.0", async:!0, observation:{responseFormatType:this.getResponseFormatType(), responseFormat:this.getResponseFormat(), resultModel:"om:Measurement"}, post:{setUrlFromCapabilities:!0, constraint:"Content-Type", responseFormatType:this.getResponseFormatType(!0), url:null}};
  this.availableOfferings = [];
  this.events = new SOS.Events;
  SOS.Utils.extend(this, $options$$);
  this.obsFormatter = $options$$.entity && $options$$.entity instanceof SOS.entity.Observation ? $options$$.entity : new SOS.entity.Observation({sos:this, defaultSource:this.bindingType});
  this.foiFormatter = $options$$.entity && $options$$.entity instanceof SOS.entity.FeatureOfInterest ? $options$$.entity : new SOS.entity.FeatureOfInterest({sos:this, defaultSource:this.bindingType});
  this.sensorDescFormatter = $options$$.entity && $options$$.entity instanceof SOS.entity.DescribeSensor ? $options$$.entity : new SOS.entity.DescribeSensor({sos:this, defaultSource:this.bindingType});
  this.capsFormatter = $options$$.entity && $options$$.entity instanceof SOS.entity.Capabilities ? $options$$.entity : new SOS.entity.Capabilities({sos:this, defaultSource:this.bindingType});
  this.url && (this.config.post.url = this.url);
};
SOS.prototype.copyMandatoryObjectProperties = function $SOS$$copyMandatoryObjectProperties$($obj$$) {
  "object" === typeof $obj$$ && ($obj$$.config = this.config, $obj$$.url = this.url);
  return $obj$$;
};
SOS.prototype.registerUserCallback = function $SOS$$registerUserCallback$($params$$) {
  SOS.Utils.isValidObject($params$$) && "string" === typeof $params$$.event && "function" === typeof $params$$.callback && (SOS.Utils.isValidObject($params$$.scope) || ($params$$.scope = this), this.events.register($params$$.event, $params$$.callback));
};
SOS.prototype.unregisterUserCallback = function $SOS$$unregisterUserCallback$($params$$) {
  SOS.Utils.isValidObject($params$$) && "string" === typeof $params$$.event && "function" === typeof $params$$.callback && (SOS.Utils.isValidObject($params$$.scope) || ($params$$.scope = this), this.events.unregister($params$$.event, $params$$.callback));
};
SOS.prototype.getCapabilities = function $SOS$$getCapabilities$($callback$$) {
  var $_sos$$ = this, $options$$ = {scope:$_sos$$, callback:$callback$$};
  return new SOS.Promise(function($resolve$$, $reject$$) {
    $_sos$$.capsFormatter.getCapabilities($options$$).then(function($data$$) {
      $resolve$$($data$$);
    });
  });
};
SOS.prototype.getCapabilitiesOfferings = function $SOS$$getCapabilitiesOfferings$($callback$$) {
  var $_sos$$ = this;
  SOS.OffsCapabilities = SOS.OffsCapabilities || {};
  if (SOS.OffsCapabilities[$_sos$$.url] || $_sos$$.offsCapabilitiesPromise instanceof SOS.Promise) {
    return $_sos$$.offsCapabilitiesPromise instanceof SOS.Promise ? $_sos$$.offsCapabilitiesPromise : new SOS.Promise(function($resolve$$, $reject$$) {
      $resolve$$(SOS.OffsCapabilities[$_sos$$.url]);
    });
  }
  $_sos$$.offsCapabilitiesPromise = new SOS.Promise(function($resolve$$, $reject$$) {
    $callback$$ && $_sos$$.registerUserCallback({event:SOS.Const.Events.SOS_OFFERINGS_CAPABILITIES_AVAILABLE, callback:$callback$$});
    SOS.Request.POST({url:$_sos$$.url, headers:{"Content-Type":$_sos$$.capsFormatter.getContentType()}, data:'<?xml version="1.0" encoding="UTF-8"?> <sos:GetCapabilities xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:sos="http://www.opengis.net/sos/2.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:swe="http://www.opengis.net/swe/2.0" service="SOS" xsi:schemaLocation="http://www.opengis.net/sos/2.0 http://schemas.opengis.net/sos/2.0/sosGetCapabilities.xsd"> <ows:AcceptVersions> <ows:Version>2.0.0</ows:Version> </ows:AcceptVersions> <ows:Sections> <ows:Section>Contents</ows:Section> </ows:Sections> </sos:GetCapabilities>', 
    scope:$_sos$$, async:$_sos$$.async, failure:function($error$$) {
      $reject$$("Error getOfferingsCapabilities - " + $_sos$$.url);
    }, success:function($data$$) {
      $data$$ && $data$$.responseText && (0 < $data$$.responseText.indexOf("ExceptionText") ? $reject$$("Error getCapabilities") : ($data$$ = (new SOS.source.XML).read($data$$.responseText), $data$$.Capabilities && ($data$$ = $data$$.Capabilities), SOS.OffsCapabilities[$_sos$$.url] = $data$$, $_sos$$.events.triggerEvent(SOS.Const.Events.SOS_OFFERINGS_CAPABILITIES_AVAILABLE), $resolve$$(SOS.OffsCapabilities[$_sos$$.url]), $_sos$$.offsCapabilitiesPromise = null));
    }});
  });
  return $_sos$$.offsCapabilitiesPromise;
};
SOS.prototype.haveValidCapabilitiesObject = function $SOS$$haveValidCapabilitiesObject$() {
  return SOS.Utils.isValidObject(this.capsFormatter.data);
};
SOS.prototype.setObservationResponseFormatFromTypeSuggestion = function $SOS$$setObservationResponseFormatFromTypeSuggestion$($type$$) {
  if (this.haveValidCapabilitiesObject() && SOS.Utils.isValidObject(this.capsFormatter.data)) {
    var $allowedValues$$ = this.capsFormatter.getOperationParameterValues("GetObservation", "responseFormat");
    if ($allowedValues$$) {
      for (var $i$$ = 0;$i$$ < $allowedValues$$.length;$i$$++) {
        if (0 <= $allowedValues$$[$i$$].indexOf($type$$)) {
          this.config.observation.responseFormat = $allowedValues$$[$i$$];
          break;
        }
      }
    }
  }
};
SOS.prototype.getOfferingList = function $SOS$$getOfferingList$($sosOfferingType$$) {
  var $_sos$$ = this;
  $sosOfferingType$$ = $sosOfferingType$$ || SOS.offeringType.SOS_2;
  return new SOS.Promise(function($resolve$$, $reject$$) {
    $_sos$$.getCapabilitiesOfferings().then(function() {
      switch($sosOfferingType$$) {
        case "sos_1":
          $resolve$$($_sos$$.getSimpleOfferings());
          break;
        case "sos_2":
          $resolve$$($_sos$$.getOfferings());
      }
    });
  });
};
SOS.prototype._bindOfferings = function $SOS$$_bindOfferings$() {
  var $_sos$$ = this;
  SOS.OffsCapabilities = SOS.OffsCapabilities || {};
  var $capabilities$$ = SOS.OffsCapabilities[$_sos$$.url];
  if ($capabilities$$) {
    var $offeringList$$ = {};
    $capabilities$$ && $capabilities$$.contents.contents && ($capabilities$$.contents = $capabilities$$.contents.contents.offering);
    var $getObservedArea$$ = function $$getObservedArea$$$($off$$) {
      return $off$$.observedArea || $off$$.observedArea && $off$$.observedArea.envelope ? {crs:$off$$.observedArea.envelope["@srsName"].split("/").pop(), lowerCorner:$off$$.observedArea.envelope.lowerCorner.split(" "), upperCorner:$off$$.observedArea.envelope.upperCorner.split(" ")} : {};
    }, $getFOI$$ = function $$getFOI$$$($off$$) {
      var $foiID$$ = [], $property$$;
      for ($property$$ in $off$$) {
        "relatedFeature" == $property$$ && $off$$[$property$$].featureRelationship && $foiID$$.push($off$$[$property$$].featureRelationship.target["@href"]);
      }
      return $foiID$$;
    }, $contentsIsArray$$ = function $$contentsIsArray$$$($c$$) {
      for (var $i$$ = 0;$i$$ < $c$$.length;$i$$++) {
        var $off$$ = $c$$[$i$$].observationOffering || $c$$[$i$$];
        $off$$ && ($_sos$$.availableOfferings.push(new SOS.Offering({sos:$_sos$$, bindingType:SOS.bindingType.JSON, identifier:$off$$.identifier, name:$off$$.name && $off$$.name["#text"] || "", featureOfInterestType:$off$$.featureOfInterestType, featureOfInterestIds:$getFOI$$($off$$), observedProperties:$off$$.observableProperty, observationType:$off$$.observationType, observedArea:$getObservedArea$$($off$$), phenomenonTime:$off$$.phenomenonTime, procedures:$off$$.procedure, procedureDescriptionFormat:$off$$.procedureDescriptionFormat, 
        responseFormat:$off$$.responseFormat, resultTime:$off$$.resultTime})), $offeringList$$[$off$$.identifier] = {featureOfInterestIds:$getFOI$$($off$$), name:$off$$.name && $off$$.name["#text"], observedProperties:$off$$.observableProperty, procedures:$off$$.procedure instanceof Array ? $off$$.procedure : [$off$$.procedure], responseFormats:$off$$.responseFormat, responseModes:$off$$.responseFormat, resultModels:[], time:{timePeriod:{beginPosition:$off$$.resultTime && $off$$.resultTime.timePeriod ? 
        $off$$.resultTime.timePeriod.beginPosition : "", endPosition:$off$$.resultTime && $off$$.resultTime.timePeriod ? $off$$.resultTime.timePeriod.endPosition : ""}}}, $offeringList$$[$off$$.identifier].bounds = $_sos$$.availableOfferings[$i$$] && $_sos$$.availableOfferings[$i$$].observedArea ? {crs:$_sos$$.availableOfferings[$i$$].observedArea && $_sos$$.availableOfferings[$i$$].observedArea.crs, bottom:$_sos$$.availableOfferings[$i$$].observedArea.lowerCorner && $_sos$$.availableOfferings[$i$$].observedArea.lowerCorner.split(" ")[0], 
        left:$_sos$$.availableOfferings[$i$$].observedArea.lowerCorner && $_sos$$.availableOfferings[$i$$].observedArea.lowerCorner.split(" ")[1], right:$_sos$$.availableOfferings[$i$$].observedArea.upperCorner && $_sos$$.availableOfferings[$i$$].observedArea.upperCorner.split(" ")[0], top:$_sos$$.availableOfferings[$i$$].observedArea.upperCorner && $_sos$$.availableOfferings[$i$$].observedArea.upperCorner.split(" ")[1]} : {});
      }
    }, $contentsIsObject$$ = function $$contentsIsObject$$$($c$$) {
      for (var $_off$$ in $c$$) {
        var $off$$ = $c$$[$_off$$];
        scope.availableOfferings.push(new SOS.Offering({sos:$_sos$$, bindingType:SOS.bindingType.JSON, identifier:$off$$.identifier, name:$off$$.name && $off$$.name["#text"] || "", featureOfInterestType:$off$$.featureOfInterestType, featureOfInterestIds:$getFOI$$($off$$), observedProperties:$off$$.observableProperty, observationType:$off$$.observationType, observedArea:$getObservedArea$$($off$$), phenomenonTime:$off$$.phenomenonTime, procedures:$off$$.procedure, procedureDescriptionFormat:$off$$.procedureDescriptionFormat, 
        responseFormat:$off$$.responseFormat, resultTime:$off$$.resultTime}));
        $offeringList$$[$off$$.identifier] = {featureOfInterestIds:$getFOI$$($off$$), name:$off$$.name && $off$$.name["#text"], observedProperties:$off$$.observableProperty, procedures:$off$$.procedure instanceof Array ? $off$$.procedure : [$off$$.procedure], responseFormats:$off$$.responseFormat, responseModes:$off$$.responseFormat, resultModels:[], time:{timePeriod:{beginPosition:$off$$.resultTime && $off$$.resultTime.timePeriod ? $off$$.resultTime.timePeriod.beginPosition : "", endPosition:$off$$.resultTime && 
        $off$$.resultTime.timePeriod ? $off$$.resultTime.timePeriod.endPosition : ""}}};
        $offeringList$$[$off$$.identifier].bounds = $_sos$$.availableOfferings[i] && $_sos$$.availableOfferings[i].observedArea ? {crs:$_sos$$.availableOfferings[i].observedArea && $_sos$$.availableOfferings[i].observedArea.crs, bottom:$_sos$$.availableOfferings[i].observedArea.lowerCorner && $_sos$$.availableOfferings[i].observedArea.lowerCorner.split(" ")[0], left:$_sos$$.availableOfferings[i].observedArea.lowerCorner && $_sos$$.availableOfferings[i].observedArea.lowerCorner.split(" ")[1], right:$_sos$$.availableOfferings[i].observedArea.upperCorner && 
        $_sos$$.availableOfferings[i].observedArea.upperCorner.split(" ")[0], top:$_sos$$.availableOfferings[i].observedArea.upperCorner && $_sos$$.availableOfferings[i].observedArea.upperCorner.split(" ")[1]} : {};
      }
    };
    $capabilities$$.contents instanceof Array ? $contentsIsArray$$($capabilities$$.contents) : $contentsIsObject$$($capabilities$$.contents);
    $offeringList$$ && ($capabilities$$.contents.offeringList = $offeringList$$);
  }
};
SOS.prototype._getOfferings = function $SOS$$_getOfferings$($isComplete$$) {
  var $offs$$ = [];
  SOS.OffsCapabilities = SOS.OffsCapabilities || {};
  var $capabilities$$ = SOS.OffsCapabilities[this.url];
  if ($capabilities$$) {
    $capabilities$$ && !$capabilities$$.contents.offeringList ? (this._bindOfferings(this), $offs$$ = $isComplete$$ ? this.availableOfferings : $capabilities$$.contents.offeringList) : $offs$$ = !$isComplete$$ && $capabilities$$ ? $capabilities$$.contents.offeringList : $capabilities$$ ? this.availableOfferings : [];
  } else {
    return this.getOfferingList(SOS.offeringType.SOS_2);
  }
  return new SOS.Promise(function($resolve$$, $reject$$) {
    $resolve$$($offs$$);
  });
};
SOS.prototype.getSimpleOfferings = function $SOS$$getSimpleOfferings$() {
  return this._getOfferings(!1);
};
SOS.prototype.getOfferings = function $SOS$$getOfferings$() {
  return this._getOfferings(!0);
};
SOS.prototype.getOfferingIds = function $SOS$$getOfferingIds$() {
  var $_sos$$ = this, $result$$ = [];
  return new SOS.Promise(function($resolve$$, $reject$$) {
    $_sos$$.getOfferingList(SOS.offeringType.SOS_2).then(function($offList$$) {
      if ($offList$$ instanceof Array) {
        for (var $i$$ = 0;$i$$ < $offList$$.length;$i$$++) {
          var $o$$ = $offList$$[$i$$];
          $o$$.identifier && $result$$.push($o$$.identifier);
        }
      } else {
        for ($i$$ in $offList$$) {
          $o$$ = $offList$$[$i$$], $result$$.push($o$$);
        }
      }
      $resolve$$($result$$);
    });
  });
};
SOS.prototype.getOfferingNames = function $SOS$$getOfferingNames$() {
  var $_sos$$ = this, $result$$ = [];
  return new SOS.Promise(function($resolve$$, $reject$$) {
    $_sos$$.getOfferingList(SOS.offeringType.SOS_2).then(function($offList$$) {
      for (var $id$$ in $offList$$) {
        $result$$.push($offList$$[$id$$].name);
      }
      $resolve$$($result$$);
    });
  });
};
SOS.prototype.getOffering = function $SOS$$getOffering$($id$$) {
  var $_sos$$ = this, $offering$$;
  return new SOS.Promise(function($resolve$$, $reject$$) {
    if ($_sos$$.availableOfferings) {
      for (var $i$$ = 0;$i$$ < $_sos$$.availableOfferings.length;$i$$++) {
        if ($_sos$$.availableOfferings[$i$$].identifier.toLowerCase() == $id$$.toLowerCase()) {
          $offering$$ = $_sos$$.availableOfferings[$i$$];
          break;
        }
      }
    } else {
      $_sos$$.getOfferingList(SOS.offeringType.SOS_2).then(function($offList$$) {
        $_sos$$.getOffering($id$$);
      });
    }
    $resolve$$($offering$$);
  });
};
SOS.prototype.getOfferingByName = function $SOS$$getOfferingByName$($name$$) {
  var $_sos$$ = this;
  return new SOS.Promise(function($resolve$$, $reject$$) {
    if ($_sos$$.availableOfferings) {
      for (var $i$$ = 0;$i$$ < $_sos$$.availableOfferings.length;$i$$++) {
        $_sos$$.availableOfferings[$i$$].name.toLowerCase() == $name$$.toLowerCase() && $resolve$$($_sos$$.availableOfferings[$i$$]);
      }
    } else {
      $_sos$$.getOfferingList(SOS.offeringType.SOS_2).then(function($offList$$) {
        if ($offList$$) {
          for (var $off$$ in $offList$$) {
            $off$$.name.toLowerCase() == $name$$.toLowerCase() && $resolve$$($off$$);
          }
        }
      });
    }
    $resolve$$(void 0);
  });
};
SOS.prototype.getOfferingsForProcedureId = function $SOS$$getOfferingsForProcedureId$($procedureId$$) {
  var $_sos$$ = this, $result$$ = [];
  return new SOS.Promise(function($resolve$$, $reject$$) {
    $_sos$$.getOfferingIds().then(function($offIds$$) {
      for (var $i$$ = 0;$i$$ < $offIds$$.length;$i$$++) {
        for (var $offering$$ = $_sos$$.getOffering($offIds$$[$i$$]), $procIds$$ = $offering$$.getProcedureIds(), $j$$ = 0;$j$$ < $procIds$$.length;$j$$++) {
          if ($procIds$$[$j$$] == $procedureId$$) {
            $result$$.push($offering$$);
            break;
          }
        }
      }
      $resolve$$($result$$);
    });
  });
};
SOS.prototype.getOfferingsForFeatureOfInterestId = function $SOS$$getOfferingsForFeatureOfInterestId$($foiId$$) {
  var $_sos$$ = this, $result$$ = [];
  return new SOS.Promise(function($resolve$$, $reject$$) {
    $_sos$$.getOfferingList(SOS.offeringType.SOS_2).then(function($offList$$) {
      if ($offList$$ instanceof Array) {
        for (var $i$$13_offId$$ = 0;$i$$13_offId$$ < $offList$$.length;$i$$13_offId$$++) {
          var $o$$ = $offList$$[$i$$13_offId$$];
          $o$$.featureOfInterestIds && $o$$.featureOfInterestIds instanceof Array && -1 < $o$$.featureOfInterestIds.indexOf($foiId$$) && $_sos$$.getOffering($o$$.identifier).then(function($off$$) {
            $result$$.push($off$$);
          });
        }
      } else {
        for ($i$$13_offId$$ in $offList$$) {
          $o$$ = $offList$$[$i$$13_offId$$], $o$$.featureOfInterestIds && $o$$.featureOfInterestIds instanceof Array && -1 < $o$$.featureOfInterestIds.indexOf($foiId$$) && $_sos$$.getOffering($i$$13_offId$$).then(function($off$$) {
            $result$$.push($off$$);
          });
        }
      }
      $resolve$$($result$$);
    });
  });
};
SOS.prototype.getLatestObservationsForFeatureOfInterestId = function $SOS$$getLatestObservationsForFeatureOfInterestId$($foiId$$) {
  var $_sos$$ = this;
  $_sos$$.foiId = $foiId$$;
  $_sos$$.getOfferingsForFeatureOfInterestId($foiId$$).then(function($offerings$$) {
    for (var $i$$ = 0, $len$$ = $offerings$$.length;$i$$ < $len$$;$i$$++) {
      $_sos$$.getLatestObservationsForOffering($offerings$$[$i$$]);
    }
  });
};
SOS.prototype.getLatestObservationsForOffering = function $SOS$$getLatestObservationsForOffering$($offering$$3_params$$) {
  $offering$$3_params$$ = {offering:$offering$$3_params$$.id, observedProperties:$offering$$3_params$$.observedProperties};
  this.foiId && ($offering$$3_params$$.foi = {featuresOfInterest:this.foiId});
  this.obsFormatter.getObservationLatest($offering$$3_params$$);
};
SOS.prototype.getObservationsForOffering = function $SOS$$getObservationsForOffering$($offering$$4_params$$, $start$$, $end$$) {
  $offering$$4_params$$ = {offering:$offering$$4_params$$.id, observedProperties:$offering$$4_params$$.observedProperties};
  this.foiId && ($offering$$4_params$$.foi = {featuresOfInterest:this.foiId});
  this.obsFormatter.getObservationFirst($offering$$4_params$$);
};
SOS.prototype.haveValidObservationsObject = function $SOS$$haveValidObservationsObject$() {
  return SOS.Utils.isValidObject(this.SOSObservations);
};
SOS.prototype.getCountOfObservations = function $SOS$$getCountOfObservations$() {
  var $n$$ = 0;
  this.haveValidObservationsObject() && SOS.Utils.isValidObject(this.SOSObservations.measurements) && ($n$$ = this.SOSObservations.measurements.length);
  return $n$$;
};
SOS.prototype.getObservationRecord = function $SOS$$getObservationRecord$($i$$) {
  var $record$$ = {};
  this.haveValidObservationsObject() && ($record$$ = this.SOSObservations.measurements[$i$$], $record$$ = this.addPropertiesToObservationRecord($record$$));
  return $record$$;
};
SOS.prototype.getFilteredObservationRecord = function $SOS$$getFilteredObservationRecord$($i$$, $filter$$) {
  var $record$$;
  if (this.haveValidObservationsObject()) {
    var $foi_r$$ = this.SOSObservations.measurements[$i$$];
    SOS.Utils.isValidObject($filter$$) ? SOS.Utils.isValidObject($filter$$.foiId) ? ($foi_r$$ = this.getFeatureOfInterestFromObservationRecord($foi_r$$)) && $foi_r$$.attributes.id == $filter$$.foiId && ($record$$ = this.SOSObservations.measurements[$i$$]) : SOS.Utils.isValidObject($filter$$.observedProperty) && $foi_r$$.observedProperty == $filter$$.observedProperty && ($record$$ = this.SOSObservations.measurements[$i$$]) : $record$$ = this.SOSObservations.measurements[$i$$];
    $record$$ = this.addPropertiesToObservationRecord($record$$);
  }
  return $record$$;
};
SOS.prototype.addPropertiesToObservationRecord = function $SOS$$addPropertiesToObservationRecord$($record$$) {
  SOS.Utils.isValidObject($record$$) && ($record$$.time = $record$$.samplingTime.timeInstant.timePosition, $record$$.observedPropertyTitle = SOS.Utils.toTitleCase(SOS.Utils.toDisplayName(SOS.Utils.fqnToName($record$$.observedProperty))), $record$$.uomTitle = SOS.Utils.toDisplayUom($record$$.result.uom));
  return $record$$;
};
SOS.prototype.observationRecordHasValidFeatureOfInterest = function $SOS$$observationRecordHasValidFeatureOfInterest$($ob$$, $opts$$) {
  $opts$$ = $opts$$ || {foisIndex:0, featuresIndex:0};
  return SOS.Utils.isValidObject($ob$$.fois) && SOS.Utils.isValidObject($ob$$.fois[$opts$$.foisIndex]) && SOS.Utils.isValidObject($ob$$.fois[$opts$$.foisIndex].features) && SOS.Utils.isValidObject($ob$$.fois[$opts$$.foisIndex].features[$opts$$.featuresIndex]);
};
SOS.prototype.getFeatureOfInterestFromObservationRecord = function $SOS$$getFeatureOfInterestFromObservationRecord$($ob$$, $opts$$) {
  $opts$$ = $opts$$ || {foisIndex:0, featuresIndex:0};
  return $ob$$.fois[$opts$$.foisIndex].features[$opts$$.featuresIndex];
};
SOS.prototype.getFeatureOfInterest = function $SOS$$getFeatureOfInterest$($foiId$$) {
  this.foiFormatter.getFeatureOfInterest({featureOfInterest:$foiId$$});
};
SOS.prototype.describeSensor = function $SOS$$describeSensor$($procedureId$$) {
  this.sensorDescFormatter.getDescribeSensor({idProcedure:$procedureId$$});
};
SOS = SOS || {};
SOS.Utils = {Geom:{createBBox:function $SOS$Utils$Geom$createBBox$($originCoords$$, $radius$$) {
  for (var $angle$$ = -.25 * Math.PI, $rotatedAngle_y$$, $x$$, $xPoints$$ = [], $yPoints$$ = [], $i$$ = 0;4 > $i$$;++$i$$) {
    $rotatedAngle_y$$ = $angle$$ + 2 * $i$$ * Math.PI / 4, $x$$ = $originCoords$$[0] + $radius$$ * Math.cos($rotatedAngle_y$$), $rotatedAngle_y$$ = $originCoords$$[1] + $radius$$ * Math.sin($rotatedAngle_y$$), $xPoints$$.push($x$$), $yPoints$$.push($rotatedAngle_y$$);
  }
  return {lowerCorner:[Math.min.apply(null, $xPoints$$), Math.min.apply(null, $yPoints$$)], upperCorner:[Math.max.apply(null, $xPoints$$), Math.max.apply(null, $yPoints$$)]};
}}, Converter:{Types:{INT:"int", FLOAT:"float"}, DataTypeConverter:function $SOS$Utils$Converter$DataTypeConverter$() {
  this.createConverter = function $this$createConverter$($type$$) {
    var $converter$$;
    switch($type$$) {
      case SOS.Utils.Converter.Types.FLOAT:
        $converter$$ = new SOS.Utils.Converter.CFloat;
        break;
      case SOS.Utils.Converter.Types.INT:
        $converter$$ = new SOS.Utils.Converter.CInt;
    }
    $converter$$.type = $type$$;
    $converter$$.convert || ($converter$$.convert = function $$converter$$$convert$() {
      throw Error("Missing convert function!!");
    });
    return $converter$$;
  };
}, CFloat:function $SOS$Utils$Converter$CFloat$() {
  this.is = function $this$is$($value$$) {
    return null != $value$$.toString().match(SOS.Utils.regExes.isFloatNumber);
  };
  this.convert = function $this$convert$($value$$) {
    return parseFloat($value$$);
  };
}, CInt:function $SOS$Utils$Converter$CInt$() {
  this.is = function $this$is$($value$$) {
    return null != $value$$.toString().match(SOS.Utils.regExes.isIntNumber);
  };
  this.convert = function $this$convert$($value$$) {
    return parseInt($value$$);
  };
}}, regExes:{trimSpace:/^\s*|\s*$/g, removeSpace:/\s*/g, splitSpace:/\s+/, trimComma:/\s*,\s*/g, isIntNumber:/^(\d+)/, isFloatNumber:/-?\d+[\.\,]\d+/}, getParameterString:function $SOS$Utils$getParameterString$($a$$) {
  var $b$$ = [], $c$$;
  for ($c$$ in $a$$) {
    var $d$$ = $a$$[$c$$];
    if (null != $d$$ && "function" != typeof $d$$) {
      if ("object" == typeof $d$$ && $d$$.constructor == Array) {
        for (var $e$$ = [], $f$$, $g$$ = 0, $h$$ = $d$$.length;$g$$ < $h$$;$g$$++) {
          $f$$ = $d$$[$g$$], $e$$.push(encodeURIComponent(null === $f$$ || void 0 === $f$$ ? "" : $f$$));
        }
        $d$$ = $e$$.join(",");
      } else {
        $d$$ = encodeURIComponent($d$$);
      }
      $b$$.push(encodeURIComponent($c$$) + "=" + $d$$);
    }
  }
  return $b$$.join("&");
}, uomDisplayTitles:{Cel:"&deg;C", deg:"&deg;", "m/s":"m s<sup>-1</sup>"}, nonPrintingCharacterLabels:{" ":"(space)", "\t":"(tab)", "\n":"(newline)", "\r\n":"(carriage return/newline)", "\r":"(carriage return)"}, fullyQualifiedNames:{url:{test:/^\s*http/i, re:/^.*\/(.+)$/, s:"$1"}, urn:{test:/^\s*urn/i, re:/^.*:/, s:""}}, indexOf:function $SOS$Utils$indexOf$($a$$, $b$$) {
  if ("function" == typeof $a$$.indexOf) {
    return $a$$.indexOf($b$$);
  }
  for (var $c$$ = 0, $d$$ = $a$$.length;$c$$ < $d$$;$c$$++) {
    if ($a$$[$c$$] == $b$$) {
      return $c$$;
    }
  }
  return -1;
}, isValidObject:function $SOS$Utils$isValidObject$($x$$) {
  return "undefined" !== typeof $x$$ && null !== $x$$;
}, isArray:function $SOS$Utils$isArray$($x$$) {
  return "[object Array]" === Object.prototype.toString.call($x$$);
}, isNumber:function $SOS$Utils$isNumber$($x$$) {
  return !isNaN(parseFloat($x$$)) && isFinite($x$$);
}, getUniqueList:function $SOS$Utils$getUniqueList$($x$$) {
  for (var $a$$ = [], $i$$ = 0, $len$$ = $x$$.length;$i$$ < $len$$;$i$$++) {
    -1 === this.indexOf($a$$, $x$$[$i$$]) && $a$$.push($x$$[$i$$]);
  }
  return $a$$;
}, toTitleCase:function $SOS$Utils$toTitleCase$($a$$3_x$$) {
  var $j$$1_y$$ = $a$$3_x$$;
  if ("string" == typeof $a$$3_x$$) {
    $a$$3_x$$ = $a$$3_x$$.split(/ /);
    for (var $j$$1_y$$ = 0, $len$$ = $a$$3_x$$.length;$j$$1_y$$ < $len$$;$j$$1_y$$++) {
      $a$$3_x$$[$j$$1_y$$] = $a$$3_x$$[$j$$1_y$$].replace(/^(.)/, function($match$$, $$1$$, $offset$$, $original$$) {
        return $$1$$.toUpperCase();
      });
    }
    $j$$1_y$$ = $a$$3_x$$.join(" ");
  } else {
    if (this.isArray($a$$3_x$$)) {
      for (var $j$$1_y$$ = [], $i$$ = 0, $len$$ = $a$$3_x$$.length;$i$$ < $len$$;$i$$++) {
        $j$$1_y$$.push(this.toTitleCase($a$$3_x$$[$i$$]));
      }
    }
  }
  return $j$$1_y$$;
}, toDisplayName:function $SOS$Utils$toDisplayName$($x$$) {
  var $y$$ = $x$$;
  if ("string" == typeof $x$$) {
    $y$$ = $x$$.replace(/_/g, " ");
  } else {
    if (this.isArray($x$$)) {
      for (var $y$$ = [], $i$$ = 0, $len$$ = $x$$.length;$i$$ < $len$$;$i$$++) {
        $y$$.push(this.toDisplayName($x$$[$i$$]));
      }
    }
  }
  return $y$$;
}, _fqnToName:function $SOS$Utils$_fqnToName$($x$$, $re$$, $s$$) {
  return $x$$.replace($re$$, $s$$);
}, _lookupFqnFromName:function $SOS$Utils$_lookupFqnFromName$($x$$, $a$$, $re$$, $s$$) {
  for (var $y$$ = $x$$, $i$$ = 0, $len$$ = $a$$.length;$i$$ < $len$$;$i$$++) {
    if (this._fqnToName($a$$[$i$$], $re$$, $s$$) === $x$$) {
      $y$$ = $a$$[$i$$];
      break;
    }
  }
  return $y$$;
}, fqnToName:function $SOS$Utils$fqnToName$($x$$, $opts$$) {
  var $y$$ = $x$$, $fqn_i$$ = this.fullyQualifiedNames;
  if (this.isValidObject($fqn_i$$)) {
    if ("string" == typeof $x$$) {
      $y$$ = $opts$$ && $opts$$.hasOwnProperty("re") && $opts$$.hasOwnProperty("s") ? this._fqnToName($x$$, $opts$$.re, $opts$$.s) : $fqn_i$$.url.test.test($x$$) ? this._fqnToName($x$$, $fqn_i$$.url.re, $fqn_i$$.url.s) : this._fqnToName($x$$, $fqn_i$$.urn.re, $fqn_i$$.urn.s);
    } else {
      if (this.isArray($x$$)) {
        for (var $y$$ = [], $fqn_i$$ = 0, $len$$ = $x$$.length;$fqn_i$$ < $len$$;$fqn_i$$++) {
          $y$$.push(this.fqnToName($x$$[$fqn_i$$], $opts$$));
        }
      }
    }
  }
  return $y$$;
}, lookupFqnFromName:function $SOS$Utils$lookupFqnFromName$($x$$, $a$$, $opts$$) {
  var $y$$ = $x$$, $fqn$$1_i$$ = this.fullyQualifiedNames;
  if (this.isValidObject($fqn$$1_i$$)) {
    if ("string" == typeof $x$$) {
      $y$$ = $opts$$ && $opts$$.hasOwnProperty("re") && $opts$$.hasOwnProperty("s") ? this._lookupFqnFromName($x$$, $a$$, $opts$$.re, $opts$$.s) : $fqn$$1_i$$.url.test.test($a$$[0]) ? this._lookupFqnFromName($x$$, $a$$, $fqn$$1_i$$.url.re, $fqn$$1_i$$.url.s) : this._lookupFqnFromName($x$$, $a$$, $fqn$$1_i$$.urn.re, $fqn$$1_i$$.urn.s);
    } else {
      if (this.isArray($x$$)) {
        for (var $y$$ = [], $fqn$$1_i$$ = 0, $len$$ = $x$$.length;$fqn$$1_i$$ < $len$$;$fqn$$1_i$$++) {
          $y$$.push(this.lookupFqnFromName($x$$[$fqn$$1_i$$], $a$$, $opts$$));
        }
      }
    }
  }
  return $y$$;
}, urlToName:function $SOS$Utils$urlToName$($x$$) {
  return this.fqnToName($x$$, this.fullyQualifiedNames.url);
}, lookupUrlFromName:function $SOS$Utils$lookupUrlFromName$($x$$, $a$$) {
  return this.lookupFqnFromName($x$$, $a$$, this.fullyQualifiedNames.url);
}, urnToName:function $SOS$Utils$urnToName$($x$$) {
  return this.fqnToName($x$$, this.fullyQualifiedNames.urn);
}, lookupUrnFromName:function $SOS$Utils$lookupUrnFromName$($x$$, $a$$) {
  return this.lookupFqnFromName($x$$, $a$$, this.fullyQualifiedNames.urn);
}, toDisplayUom:function $SOS$Utils$toDisplayUom$($x$$) {
  var $y$$ = $x$$;
  if (this.isValidObject(this.uomDisplayTitles)) {
    if ("string" == typeof $x$$) {
      this.uomDisplayTitles[$x$$] && ($y$$ = this.uomDisplayTitles[$x$$]);
    } else {
      if (this.isArray($x$$)) {
        for (var $y$$ = [], $i$$ = 0, $len$$ = $x$$.length;$i$$ < $len$$;$i$$++) {
          $y$$.push(this.toDisplayUom($x$$[$i$$]));
        }
      }
    }
  }
  return $y$$;
}, nonPrintingCharacterToLabel:function $SOS$Utils$nonPrintingCharacterToLabel$($x$$) {
  var $y$$ = $x$$;
  if (this.isValidObject(this.nonPrintingCharacterLabels)) {
    if ("string" == typeof $x$$) {
      this.nonPrintingCharacterLabels[$x$$] && ($y$$ = this.nonPrintingCharacterLabels[$x$$]);
    } else {
      if (this.isArray($x$$)) {
        for (var $y$$ = [], $i$$ = 0, $len$$ = $x$$.length;$i$$ < $len$$;$i$$++) {
          $y$$.push(this.nonPrintingCharacterToLabel($x$$[$i$$]));
        }
      }
    }
  }
  return $y$$;
}, newlineToBr:function $SOS$Utils$newlineToBr$($x$$) {
  var $y$$ = $x$$;
  if ("string" == typeof $x$$) {
    $y$$ = $x$$.replace(/(\r\n|\n|\r)/g, "<br/>");
  } else {
    if (this.isArray($x$$)) {
      for (var $y$$ = [], $i$$ = 0, $len$$ = $x$$.length;$i$$ < $len$$;$i$$++) {
        $y$$.push(this.newlineToBr($x$$[$i$$]));
      }
    }
  }
  return $y$$;
}, applyTemplate:function $SOS$Utils$applyTemplate$($x$$, $template$$, $reFlags$$) {
  $reFlags$$ = $reFlags$$ || "gi";
  var $t$$ = $template$$;
  if (this.isArray($x$$)) {
    for (var $t$$ = [], $i$$ = 0, $len$$ = $x$$.length;$i$$ < $len$$;$i$$++) {
      $t$$.push(this.applyTemplate($x$$[$i$$], $template$$, $reFlags$$));
    }
  } else {
    if ($t$$) {
      for ($i$$ in $x$$) {
        $t$$ = $t$$.replace(new RegExp("\\[%\\s*" + $i$$ + "\\s*%\\]", $reFlags$$), $x$$[$i$$]);
      }
    }
  }
  return $t$$;
}, isoToDateObject:function $SOS$Utils$isoToDateObject$($x$$) {
  var $d$$2_y$$ = $x$$;
  if ("string" == typeof $x$$) {
    var $a$$8_len$$11_t$$ = $x$$.split(/T/);
    2 > $a$$8_len$$11_t$$.length && ($a$$8_len$$11_t$$[1] = "00:00:00.000Z");
    $d$$2_y$$ = $a$$8_len$$11_t$$[0].split(/-/);
    $a$$8_len$$11_t$$[1] = $a$$8_len$$11_t$$[1].replace(/Z$/, "");
    var $ms_tz$$ = /([-+])(\d{2})[:]?(\d{2})?/.exec($a$$8_len$$11_t$$[1]), $i$$ = 0;
    $ms_tz$$ && (2 < $ms_tz$$.length && ($i$$ += 60 * parseInt($ms_tz$$[2], 10)), 3 < $ms_tz$$.length && ($i$$ += parseInt($ms_tz$$[3], 10)), 1 < $ms_tz$$.length && "+" === $ms_tz$$[1] && ($i$$ *= -1));
    $a$$8_len$$11_t$$[1] = $a$$8_len$$11_t$$[1].replace(/[-+].+$/, "");
    $a$$8_len$$11_t$$ = $a$$8_len$$11_t$$[1].split(/:/);
    $ms_tz$$ = $a$$8_len$$11_t$$[2].replace(/^\d+\./, "");
    $a$$8_len$$11_t$$[2] = $a$$8_len$$11_t$$[2].replace(/\.\d+$/, "");
    $d$$2_y$$ = new Date(Date.UTC(parseInt($d$$2_y$$[0], 10), parseInt($d$$2_y$$[1] - 1, 10), parseInt($d$$2_y$$[2], 10), parseInt($a$$8_len$$11_t$$[0], 10), parseInt($a$$8_len$$11_t$$[1], 10), parseInt($a$$8_len$$11_t$$[2], 10), parseInt($ms_tz$$, 10)));
    isNaN($d$$2_y$$) ? $d$$2_y$$ = $x$$ : 0 != $i$$ && $d$$2_y$$.setTime($d$$2_y$$.getTime() + 6E4 * $i$$);
  } else {
    if (this.isArray($x$$)) {
      for ($d$$2_y$$ = [], $i$$ = 0, $a$$8_len$$11_t$$ = $x$$.length;$i$$ < $a$$8_len$$11_t$$;$i$$++) {
        $d$$2_y$$.push(this.isoToDateObject($x$$[$i$$]));
      }
    }
  }
  return $d$$2_y$$;
}, isoToJsTimestamp:function $SOS$Utils$isoToJsTimestamp$($x$$) {
  var $y$$ = $x$$;
  if ("string" == typeof $x$$) {
    $y$$ = this.isoToDateObject($x$$).getTime();
  } else {
    if (this.isArray($x$$)) {
      for (var $y$$ = [], $i$$ = 0, $len$$ = $x$$.length;$i$$ < $len$$;$i$$++) {
        $y$$.push(this.isoToJsTimestamp($x$$[$i$$]));
      }
    }
  }
  return $y$$;
}, jsTimestampToIso:function $SOS$Utils$jsTimestampToIso$($D$$1_x$$) {
  var $y$$ = $D$$1_x$$;
  if ("string" == typeof $D$$1_x$$ || "number" == typeof $D$$1_x$$) {
    $D$$1_x$$ = new Date($D$$1_x$$), isNaN($D$$1_x$$) || ($y$$ = $D$$1_x$$.toISOString());
  } else {
    if (this.isArray($D$$1_x$$)) {
      for (var $y$$ = [], $i$$ = 0, $len$$ = $D$$1_x$$.length;$i$$ < $len$$;$i$$++) {
        $y$$.push(this.jsTimestampToIso($D$$1_x$$[$i$$]));
      }
    }
  }
  return $y$$;
}, isoToTimeInterval:function $SOS$Utils$isoToTimeInterval$($start$$, $end$$) {
  var $t$$ = {start:null, end:null};
  $t$$.start = this.isoToDateObject($start$$);
  $t$$.end = this.isoToDateObject($end$$);
  return $t$$;
}, adjustTimeInterval:function $SOS$Utils$adjustTimeInterval$($t$$, $startOffset$$, $endOffset$$) {
  $t$$.start.setTime($t$$.start.getTime() + $startOffset$$);
  $t$$.end.setTime($t$$.end.getTime() + $endOffset$$);
  return $t$$;
}, parseRelativeTime:function $SOS$Utils$parseRelativeTime$($s$$6_x$$) {
  var $t$$ = {start:null, end:null}, $local$$ = new Date, $T$$ = $local$$.getTime(), $u$$ = 0, $c$$ = 0, $d$$ = 0;
  $t$$.start = new Date($T$$);
  $t$$.end = new Date($T$$);
  $s$$6_x$$ = $s$$6_x$$.replace(/to|current/i, "this");
  $s$$6_x$$ = $s$$6_x$$.replace(/yester|previous/i, "last");
  /hour$/i.test($s$$6_x$$) && ($u$$ = 36E5, $c$$ = $T$$ % $u$$);
  /day$/i.test($s$$6_x$$) && ($u$$ = 864E5, $c$$ = $T$$ % $u$$);
  /week$/i.test($s$$6_x$$) && ($d$$ = 864E5, $u$$ = 6048E5, $c$$ = $local$$.getUTCDay() * $d$$ + $T$$ % $d$$);
  /month$/i.test($s$$6_x$$) && ($d$$ = 864E5, $u$$ = 26784E5, $c$$ = ($local$$.getUTCDate() - 1) * $d$$ + $T$$ % $d$$);
  /year$/i.test($s$$6_x$$) && ($d$$ = 864E5, $u$$ = 316224E5, $c$$ = ($local$$.getUTCDayOfYear() - 1) * $d$$ + $T$$ % $d$$);
  /^this/i.test($s$$6_x$$) && this.adjustTimeInterval($t$$, -$c$$, -$c$$ + $u$$ - 1);
  /^last/i.test($s$$6_x$$) && this.adjustTimeInterval($t$$, -$c$$ - $u$$, -$c$$ - 1);
  /^rolling/i.test($s$$6_x$$) && this.adjustTimeInterval($t$$, -$u$$, -1);
  return $t$$;
}, extractColumn:function $SOS$Utils$extractColumn$($x$$, $n$$) {
  var $y$$ = [];
  if (this.isArray($x$$)) {
    for (var $i$$ = 0, $len$$ = $x$$.length;$i$$ < $len$$;$i$$++) {
      $y$$.push($x$$[$i$$][$n$$]);
    }
  }
  return $y$$;
}, sum:function $SOS$Utils$sum$($x$$) {
  for (var $y$$ = 0, $i$$ = 0, $len$$ = $x$$.length;$i$$ < $len$$;$i$$++) {
    $y$$ += parseFloat($x$$[$i$$]);
  }
  return $y$$;
}, computeStats:function $SOS$Utils$computeStats$($x$$) {
  var $y$$ = {N:0, sum:0, min:0, max:0, mean:0, median:0, q1:0, q3:0, variance:0, sd:0};
  if (this.isArray($x$$) && 1 < $x$$.length) {
    $y$$.N = $x$$.length;
    $y$$.sum = this.sum($x$$);
    $y$$.mean = $y$$.sum / $y$$.N;
    $y$$.min = Math.min.apply(null, $x$$);
    $y$$.max = Math.max.apply(null, $x$$);
    var $sorted_t$$ = $x$$.slice(0);
    $sorted_t$$.sort(function($a$$, $b$$) {
      return $a$$ - $b$$;
    });
    var $floor_i$$ = Math.floor($y$$.N / 2);
    $y$$.median = 0 == $y$$.N % 2 ? this.sum($sorted_t$$.slice($floor_i$$, $floor_i$$ + 2)) / 2 : $sorted_t$$[$floor_i$$ + 1];
    $floor_i$$ = Math.floor($y$$.N / 4);
    $y$$.q1 = 0 == $y$$.N % 2 ? this.sum($sorted_t$$.slice($floor_i$$, $floor_i$$ + 2)) / 2 : $sorted_t$$[$floor_i$$ + 1];
    $floor_i$$ *= 3;
    $y$$.q3 = 0 == $y$$.N % 2 ? this.sum($sorted_t$$.slice($floor_i$$, $floor_i$$ + 2)) / 2 : $sorted_t$$[$floor_i$$ + 1];
    for (var $floor_i$$ = $sorted_t$$ = 0, $len$$ = $x$$.length;$floor_i$$ < $len$$;$floor_i$$++) {
      $sorted_t$$ += Math.pow($x$$[$floor_i$$] - $y$$.mean, 2);
    }
    $y$$.variance = $sorted_t$$ / ($y$$.N - 1);
    $y$$.sd = Math.sqrt($y$$.variance);
  }
  return $y$$;
}, computeHistogram:function $SOS$Utils$computeHistogram$($sorted$$1_x$$) {
  var $y$$ = {min:0, max:0, lower:0, upper:0, nBins:0, binWidth:0, data:[]};
  if (this.isArray($sorted$$1_x$$) && 1 < $sorted$$1_x$$.length) {
    var $j$$ = 0;
    $sorted$$1_x$$ = $sorted$$1_x$$.slice(0);
    $sorted$$1_x$$.sort(function($a$$, $b$$) {
      return $a$$ - $b$$;
    });
    $y$$.min = Math.min.apply(null, $sorted$$1_x$$);
    $y$$.max = Math.max.apply(null, $sorted$$1_x$$);
    $y$$.lower = Math.floor($y$$.min);
    $y$$.upper = Math.ceil($y$$.max);
    $y$$.nBins = 10;
    if (0 < $y$$.upper - $y$$.lower) {
      $y$$.binWidth = Math.pow(10, Math.round(Math.log($y$$.upper - $y$$.lower) / Math.log(10))) / $y$$.nBins;
      for (var $i$$ = $y$$.lower;$i$$ < $y$$.upper;$i$$ += $y$$.binWidth) {
        for (var $bin$$ = [$i$$, 0], $len$$ = $sorted$$1_x$$.length;$j$$ < $len$$;$j$$++) {
          if ($sorted$$1_x$$[$j$$] < $i$$ + $y$$.binWidth) {
            $bin$$[1]++;
          } else {
            break;
          }
        }
        $y$$.data.push($bin$$);
      }
    }
  }
  return $y$$;
}, mergeSeries:function $SOS$Utils$mergeSeries$($x$$, $options$$) {
  $options$$ = $options$$ || {n:0, m:1, missing:null};
  var $ivar$$ = [], $dataIndices$$ = [], $y$$ = [];
  if (this.isArray($x$$)) {
    if (1 < $x$$.length) {
      for (var $i$$ = 0, $ilen_len$$ = $x$$.length;$i$$ < $ilen_len$$;$i$$++) {
        $ivar$$ = $ivar$$.concat(this.extractColumn($x$$[$i$$], $options$$.n)), $dataIndices$$.push(0);
      }
      $ivar$$.sort(function($a$$, $b$$) {
        return $a$$ - $b$$;
      });
      $ivar$$ = this.getUniqueList($ivar$$);
      $i$$ = 0;
      for ($ilen_len$$ = $ivar$$.length;$i$$ < $ilen_len$$;$i$$++) {
        var $row$$ = [];
        $row$$[0] = $ivar$$[$i$$];
        for (var $j$$ = 0, $jlen$$ = $x$$.length;$j$$ < $jlen$$;$j$$++) {
          $row$$[$j$$ + 1] = $options$$.missing;
          for (var $k$$ = $dataIndices$$[$j$$], $klen$$ = $x$$[$j$$].length;$k$$ < $klen$$;$k$$++) {
            if ($x$$[$j$$][$k$$][$options$$.n] == $ivar$$[$i$$]) {
              $row$$[$j$$ + 1] = $x$$[$j$$][$k$$][$options$$.m];
              $dataIndices$$[$j$$] = $k$$;
              break;
            }
          }
        }
        $y$$.push($row$$);
      }
    } else {
      $y$$ = $x$$[0];
    }
  }
  return $y$$;
}, removeMissingDataRows:function $SOS$Utils$removeMissingDataRows$($x$$, $options$$) {
  $options$$ = $options$$ || {missing:null};
  var $y$$ = [];
  if (this.isArray($x$$) && this.isArray($x$$[0])) {
    for (var $i$$ = 0, $ilen$$ = $x$$.length;$i$$ < $ilen$$;$i$$++) {
      for (var $foundMissing$$ = !1, $j$$ = 0, $jlen$$ = $x$$[$i$$].length;$j$$ < $jlen$$;$j$$++) {
        if ($x$$[$i$$][$j$$] == $options$$.missing) {
          $foundMissing$$ = !0;
          break;
        }
      }
      0 == $foundMissing$$ && $y$$.push($x$$[$i$$]);
    }
  }
  return $y$$;
}, reorderColumns:function $SOS$Utils$reorderColumns$($x$$, $cols$$) {
  var $y$$ = [];
  if (this.isArray($x$$) && this.isArray($x$$[0]) && this.isArray($cols$$) && Math.max.apply(null, $cols$$) < $x$$[0].length && 0 <= Math.min.apply(null, $cols$$)) {
    for (var $i$$ = 0, $ilen$$ = $x$$.length;$i$$ < $ilen$$;$i$$++) {
      for (var $row$$ = [], $j$$ = 0, $jlen$$ = $cols$$.length;$j$$ < $jlen$$;$j$$++) {
        $row$$.push($x$$[$i$$][$cols$$[$j$$]]);
      }
      $y$$.push($row$$);
    }
  }
  return $y$$;
}, removeColumns:function $SOS$Utils$removeColumns$($x$$, $cols$$) {
  var $i$$38_y$$ = [], $keepCols$$ = [];
  if (this.isArray($x$$) && this.isArray($x$$[0]) && this.isArray($cols$$) && Math.max.apply(null, $cols$$) < $x$$[0].length && 0 <= Math.min.apply(null, $cols$$)) {
    for (var $i$$38_y$$ = 0, $ilen$$ = $x$$[0].length;$i$$38_y$$ < $ilen$$;$i$$38_y$$++) {
      for (var $removeColumn$$ = !1, $j$$ = 0, $jlen$$ = $cols$$.length;$j$$ < $jlen$$;$j$$++) {
        if ($i$$38_y$$ == $cols$$[$j$$]) {
          $removeColumn$$ = !0;
          break;
        }
      }
      0 == $removeColumn$$ && $keepCols$$.push($i$$38_y$$);
    }
    $i$$38_y$$ = this.reorderColumns($x$$, $keepCols$$);
  }
  return $i$$38_y$$;
}, extend:function $SOS$Utils$extend$($a$$, $b$$) {
  $a$$ = $a$$ || {};
  if ($b$$) {
    for (var $c$$ in $b$$) {
      var $d$$ = $b$$[$c$$];
      void 0 !== $d$$ && ($a$$[$c$$] = $d$$);
    }
    !("function" == typeof window.Event && $b$$ instanceof window.Event) && $b$$.hasOwnProperty && $b$$.hasOwnProperty("toString") && ($a$$.toString = $b$$.toString);
  }
  return $a$$;
}, applyDefaults:function $SOS$Utils$applyDefaults$($to$$, $from$$) {
  $to$$ = $to$$ || {};
  var $fromIsEvt$$ = "function" == typeof window.Event && $from$$ instanceof window.Event, $key$$;
  for ($key$$ in $from$$) {
    if (void 0 === $to$$[$key$$] || !$fromIsEvt$$ && $from$$.hasOwnProperty && $from$$.hasOwnProperty($key$$) && !$to$$.hasOwnProperty($key$$)) {
      $to$$[$key$$] = $from$$[$key$$];
    }
  }
  !$fromIsEvt$$ && $from$$ && $from$$.hasOwnProperty && $from$$.hasOwnProperty("toString") && !$to$$.hasOwnProperty("toString") && ($to$$.toString = $from$$.toString);
  return $to$$;
}, urlAppend:function $SOS$Utils$urlAppend$($url$$, $paramStr$$) {
  var $newUrl$$ = $url$$;
  if ($paramStr$$) {
    var $parts$$ = ($url$$ + " ").split(/[?&]/), $newUrl$$ = $newUrl$$ + (" " === $parts$$.pop() ? $paramStr$$ : $parts$$.length ? "&" + $paramStr$$ : "?" + $paramStr$$)
  }
  return $newUrl$$;
}};
SOS.inherit = function $SOS$inherit$($C$$, $P$$) {
  var $F_i$$ = function $$F_i$$$() {
  };
  $F_i$$.prototype = $P$$.prototype;
  $C$$.prototype = new $F_i$$;
  var $l$$, $o$$, $F_i$$ = 2;
  for ($l$$ = arguments.length;$F_i$$ < $l$$;$F_i$$++) {
    $o$$ = arguments[$F_i$$], "function" === typeof $o$$ && ($o$$ = $o$$.prototype), SOS.Utils.extend($C$$.prototype, $o$$);
  }
};
SOS = SOS || {};
SOS.Const.PROXY_HOST = "Proxy/proxy.ashx?";
(function() {
  var $loc$$ = window.location, $pathName$$ = $loc$$.pathname.substring(0, $loc$$.pathname.lastIndexOf("/") + 1);
  SOS.sosLocation = $loc$$.href.substring(0, $loc$$.href.length - (($loc$$.pathname + $loc$$.search + $loc$$.hash).length - $pathName$$.length));
})();
SOS.Proxy = {use:!1, url:SOS.sosLocation + SOS.Const.PROXY_HOST, init:function $SOS$Proxy$init$($options$$) {
  if (SOS.Utils.isValidObject($options$$)) {
    for (var $p$$ in $options$$) {
      this[$p$$] = $options$$[$p$$];
    }
  }
  this.use ? this.enable() : this.disable();
}, enable:function $SOS$Proxy$enable$($options$$) {
  if (SOS.Utils.isValidObject($options$$)) {
    for (var $p$$ in $options$$) {
      this[$p$$] = $options$$[$p$$];
    }
  }
  this.url && (SOS.ProxyHost = this.url);
  return this.url;
}, disable:function $SOS$Proxy$disable$() {
  SOS.ProxyHost = null;
}};
SOS = SOS || {};
SOS.Promise = function $SOS$Promise$($fn$$) {
  function $resolve$$0$$($newValue$$) {
    $newValue$$ && "function" === typeof $newValue$$.then ? $newValue$$.then($resolve$$0$$, $reject$$0$$) : ($state$$ = "resolved", $value$$ = $newValue$$, $deferred$$ && $handle$$($deferred$$));
  }
  function $reject$$0$$($reason$$) {
    $state$$ = "rejected";
    $value$$ = $reason$$;
    $deferred$$ && $handle$$($deferred$$);
  }
  function $handle$$($handler$$) {
    if ("pending" === $state$$) {
      $deferred$$ = $handler$$;
    } else {
      var $handlerCallback_ret$$;
      ($handlerCallback_ret$$ = "resolved" === $state$$ ? $handler$$.onResolved : $handler$$.onRejected) ? ($handlerCallback_ret$$ = $handlerCallback_ret$$($value$$), $handler$$.resolve($handlerCallback_ret$$)) : "resolved" === $state$$ ? $handler$$.resolve($value$$) : $handler$$.reject($value$$);
    }
  }
  var $state$$ = "pending", $value$$, $deferred$$ = null;
  this.then = function $this$then$($onResolved$$, $onRejected$$) {
    return new SOS.Promise(function($resolve$$, $reject$$) {
      $handle$$({onResolved:$onResolved$$, onRejected:$onRejected$$, resolve:$resolve$$, reject:$reject$$});
    });
  };
  $fn$$($resolve$$0$$, $reject$$0$$);
};
SOS = SOS || {};
SOS.Events = function $SOS$Events$() {
  this.listeners = {};
};
SOS.Events.prototype.enable = function $SOS$Events$$enable$() {
  var $self$$ = this;
  $self$$.listeners || ($self$$.listeners = {});
  $self$$.triggerEvent = function $$self$$$triggerEvent$($ev$$, $args$$) {
    SOS.Events.prototype.triggerEvent.call($self$$, $ev$$, $args$$);
    console.log($ev$$);
  };
  $self$$.register = function $$self$$$register$($ev$$, $fn$$) {
    SOS.Events.prototype.register.call($self$$, $ev$$, $fn$$);
  };
  $self$$.unregister = function $$self$$$unregister$($ev$$, $fn$$) {
    SOS.Events.prototype.unregister.call($self$$, $ev$$, $fn$$);
  };
};
SOS.Events.prototype.triggerEvent = function $SOS$Events$$triggerEvent$($ev$$, $args$$) {
  if (this.listeners[$ev$$]) {
    for (var $selfListieners$$ = this.listeners[$ev$$].reverse(), $i$$ = 0;$i$$ < $selfListieners$$.length;$i$$++) {
      $args$$ ? $selfListieners$$[$i$$].apply(window, $args$$) : $selfListieners$$[$i$$].call(window);
    }
  }
};
SOS.Events.prototype.register = function $SOS$Events$$register$($ev$$, $fn$$) {
  this.enable.call(this, $ev$$);
  var $list$$ = this.listeners[$ev$$] || [];
  if ($fn$$ instanceof Function) {
    for (var $exists$$ = !1, $i$$ = 0;$i$$ < $list$$.length;$i$$++) {
      $list$$[$i$$] === $fn$$ && ($exists$$ = !0);
    }
    !1 === $exists$$ && $list$$.push($fn$$);
  }
  this.listeners[$ev$$] = $list$$;
};
SOS.Events.prototype.unregister = function $SOS$Events$$unregister$($ev$$, $fn$$) {
  if (this.listeners[$ev$$] && 0 < this.listeners[$ev$$].length) {
    if ($fn$$) {
      for (var $fns$$ = [], $i$$ = 0;$i$$ < this.listeners[$ev$$].length;$i$$++) {
        $fn$$ != this.listeners[$ev$$][$i$$] && $fns$$.push(this.listeners[$ev$$][$i$$]);
      }
      this.listeners[$ev$$] = $fns$$;
    } else {
      this.listeners[$ev$$] = [];
    }
  }
};
SOS.Request = {DEFAULT_CONFIG:{method:"GET", url:window.location.href, async:!0, user:void 0, password:void 0, params:null, proxy:SOS.ProxyHost, headers:{}, data:null, callback:function $SOS$Request$DEFAULT_CONFIG$callback$() {
}, success:null, failure:null, scope:null}, events:new SOS.Events, _getXMLHttpRequest:function $SOS$Request$_getXMLHttpRequest$() {
  try {
    return new XMLHttpRequest;
  } catch ($e$$) {
    console.log("XMLHttpRequest missing");
  }
}, createXMLHttpRequest:function $SOS$Request$createXMLHttpRequest$($config$$) {
  var $_req$$ = this, $defaultConfig_url$$ = SOS.Utils.extend($_req$$.DEFAULT_CONFIG, {proxy:SOS.ProxyHost});
  $config$$ = SOS.Utils.applyDefaults($config$$, $defaultConfig_url$$);
  var $request$$ = $_req$$._getXMLHttpRequest();
  if ($request$$) {
    $defaultConfig_url$$ = SOS.Utils.urlAppend((SOS.ProxyHost || "") + $config$$.url, SOS.Utils.getParameterString($config$$.params || {}));
    $request$$.open($config$$.method, $defaultConfig_url$$, $config$$.async, $config$$.user, $config$$.password);
    for (var $header$$ in $config$$.headers) {
      $request$$.setRequestHeader($header$$, $config$$.headers[$header$$]);
    }
    $request$$.onreadystatechange = function $$request$$$onreadystatechange$() {
      if ($request$$.readyState == $request$$.DONE) {
        $config$$.callback.apply($config$$.scope, [$request$$]);
        if (!$request$$.status || 200 <= $request$$.status && 300 > $request$$.status) {
          if ($_req$$.events.triggerEvent("success", {}), $config$$.success) {
            var $exception$$1_match$$;
            a: {
              if ($request$$ && ($exception$$1_match$$ = /<ows:ExceptionText>([\s\S]*?)<\/ows:ExceptionText>/g.exec($request$$.responseText))) {
                $exception$$1_match$$ = $exception$$1_match$$[1];
                break a;
              }
              $exception$$1_match$$ = null;
            }
            null == $exception$$1_match$$ ? $config$$.success.apply($config$$.scope, [$request$$]) : $config$$.failure && $config$$.failure.apply($config$$.scope, [$exception$$1_match$$]);
          }
        }
        $request$$.status && (200 > $request$$.status || 300 <= $request$$.status) && ($_req$$.events.triggerEvent("failure", {}), $config$$.failure && $config$$.failure.apply($config$$.scope, [$request$$]));
      }
    };
    !1 === $config$$.async ? $request$$.send($config$$.data) : window.setTimeout(function() {
      0 !== $request$$.readyState && $request$$.send($config$$.data);
    }, 0);
  }
}, GET:function $SOS$Request$GET$($params$$) {
  $params$$ = SOS.Utils.extend($params$$, {method:"GET"});
  return this.createXMLHttpRequest($params$$);
}, POST:function $SOS$Request$POST$($params$$) {
  $params$$ = SOS.Utils.extend($params$$, {method:"POST"});
  return this.createXMLHttpRequest($params$$);
}};
SOS = SOS || {};
SOS.Source = function $SOS$Source$() {
};
SOS.Source.prototype.reader = {};
SOS.Source.prototype.read = function $SOS$Source$$read$($text$$) {
  throw Error("Read not implemented.");
};
SOS.Source.prototype.write = function $SOS$Source$$write$($obj$$) {
  throw Error("Write not implemented.");
};
SOS.source = SOS.source || {};
SOS.source.XML = function $SOS$source$XML$($options$$) {
  this.initialize(this);
};
SOS.inherit(SOS.source.XML, SOS.Source);
SOS.source.XML.prototype.initialize = function $SOS$source$XML$$initialize$($src$$) {
  $src$$.reader = new XML.XTree;
};
SOS.source.XML.prototype.read = function $SOS$source$XML$$read$($text$$) {
  return this.reader.getJson($text$$);
};
SOS.source.XML.prototype.write = function $SOS$source$XML$$write$($params$$, $allowedFilters$$) {
  for (var $k$$ in $params$$) {
    if (!(new RegExp("(\\b" + $k$$ + "\\b)", "g")).test($allowedFilters$$.join(","))) {
      throw Error(SOS.Const.ErrorText.XML.UNKNOWN_PARAM + ": " + $k$$);
    }
    if (!$params$$[$k$$] || $params$$[$k$$] && 0 == $params$$[$k$$].toString().trim().length) {
      throw Error(SOS.Const.ErrorText.XML.EMPTY_PARAM);
    }
  }
};
SOS.source.JSON = function $SOS$source$JSON$($options$$) {
};
SOS.inherit(SOS.source.JSON, SOS.Source);
SOS.source.JSON.prototype.write = function $SOS$source$JSON$$write$($data$$) {
  return JSON.stringify($data$$);
};
SOS.source.JSON.prototype.read = function $SOS$source$JSON$$read$($data$$) {
  return JSON.parse($data$$);
};
SOS.Offering = function $SOS$Offering$($options$$) {
  this.entityName = "Offering";
  this.initialize($options$$);
};
SOS.Offering.prototype.initialize = function $SOS$Offering$$initialize$($options$$) {
  this.sos = $options$$.sos || sos;
  this.observationData = "";
  this.identifier = $options$$.identifier || $options$$.id || "";
  this.name = $options$$.name || "";
  this.featureOfInterestIds = $options$$.featureOfInterestIds instanceof Array && $options$$.featureOfInterestIds || $options$$.featureOfInterestIds && [$options$$.featureOfInterestIds] || [];
  this.featureOfInterestType = $options$$.featureOfInterestType instanceof Array && $options$$.featureOfInterestType || $options$$.featureOfInterestType && [$options$$.featureOfInterestType] || [];
  this.observedProperties = $options$$.observedProperties instanceof Array && $options$$.observedProperties || $options$$.observedProperties && [$options$$.observedProperties] || [];
  this.observationType = $options$$.observationType instanceof Array && $options$$.observationType || $options$$.observationType && [$options$$.observationType] || [];
  this.observedArea = $options$$.observedArea && $options$$.observedArea.crs && $options$$.observedArea.lowerCorner && $options$$.observedArea.upperCorner ? $options$$.observedArea && $options$$.observedArea.crs + " - " + $options$$.observedArea.lowerCorner + $options$$.observedArea.upperCorner : {crs:"", lowerLeft:[], upperRight:[]};
  this.phenomenonTime = $options$$.phenomenonTime instanceof Array && $options$$.phenomenonTime || $options$$.phenomenonTime && [$options$$.phenomenonTime] || [];
  this.procedures = $options$$.procedures instanceof Array && $options$$.procedures || [$options$$.procedures];
  this.procedureDescriptionFormat = $options$$.procedureDescriptionFormat instanceof Array && $options$$.procedureDescriptionFormat || $options$$.procedureDescriptionFormat && [$options$$.procedureDescriptionFormat] || [];
  this.responseFormat = $options$$.responseFormat instanceof Array && $options$$.responseFormat || $options$$.responseFormat && [$options$$.responseFormat] || [];
  this.resultTime = $options$$.resultTime instanceof Array && $options$$.resultTime || $options$$.resultTime && [$options$$.resultTime] || [];
};
SOS.Offering.prototype.destroy = function $SOS$Offering$$destroy$() {
};
SOS.Offering.prototype.getFeatureOfInterestIds = function $SOS$Offering$$getFeatureOfInterestIds$() {
  return SOS.Utils.getUniqueList(this.featureOfInterestIds);
};
SOS.Offering.prototype.getProcedureIds = function $SOS$Offering$$getProcedureIds$() {
  return SOS.Utils.getUniqueList(this.procedures);
};
SOS.Offering.prototype.getObservedPropertyIds = function $SOS$Offering$$getObservedPropertyIds$() {
  return SOS.Utils.getUniqueList(this.observedProperties);
};
SOS.Offering.prototype.getObservedPropertyNames = function $SOS$Offering$$getObservedPropertyNames$() {
  return SOS.Utils.fqnToName(SOS.Utils.getUniqueList(this.observedProperties));
};
SOS.Offering.prototype.filterObservedProperties = function $SOS$Offering$$filterObservedProperties$($fqns_list$$) {
  SOS.Utils.isArray($fqns_list$$) || ($fqns_list$$ = [$fqns_list$$]);
  var $masterList$$ = SOS.Utils.isValidObject(this.observedPropertiesOriginal) ? this.observedPropertiesOriginal : this.observedProperties;
  $fqns_list$$ = SOS.Utils.lookupFqnFromName($fqns_list$$, $masterList$$);
  SOS.Utils.isValidObject(this.observedPropertiesOriginal) || (this.observedPropertiesOriginal = this.observedProperties);
  this.observedProperties = $fqns_list$$;
};
SOS.Offering.prototype.unfilterObservedProperties = function $SOS$Offering$$unfilterObservedProperties$() {
  SOS.Utils.isValidObject(this.observedPropertiesOriginal) && (this.observedProperties = this.observedPropertiesOriginal, delete this.observedPropertiesOriginal);
};
SOS.Offering.prototype.getLatestObservations = function $SOS$Offering$$getLatestObservations$($callback$$) {
  0 < arguments.length && this.sos.registerUserCallback({event:SOS.Const.Events.SOS_OFFERING_OBSERVATION_AVAILABLE, callback:$callback$$});
  var $params$$ = {offering:this.identifier || this.id, observedProperties:this.observedProperties};
  this.sos.foiId && ($params$$.foi = {featuresOfInterest:this.sos.foiId});
  this.sos.obsFormatter.getObservationLatest($params$$, $callback$$, this);
};
SOS.Offering.prototype.getObservations = function $SOS$Offering$$getObservations$($start$$, $end$$, $callback$$) {
  2 < arguments.length && this.sos.registerUserCallback({event:SOS.Const.Events.SOS_OFFERING_OBSERVATION_AVAILABLE, callback:$callback$$});
  var $params$$ = {offering:this.id || this.identifier, observedProperties:this.observedProperties, temporal:{start:$start$$, end:$end$$, operator:"During", on:"phenomenonTime", operand:"TimePeriod"}};
  this.sos.foiId && ($params$$.foi = {featuresOfInterest:this.sos.foiId});
  this.sos.obsFormatter.getObservationByScope($params$$, $callback$$, SOS.Const.Events.SOS_OFFERING_OBSERVATION_AVAILABLE, this);
};
SOS.Offering.prototype.getCountOfObservations = function $SOS$Offering$$getCountOfObservations$() {
  var $n$$ = 0;
  this.observationData && SOS.Utils.isValidObject(this.observationData) && ($n$$ = this.observationData instanceof Array ? this.observationData.length : 1);
  return $n$$;
};
SOS.Offering.prototype.getObservationRecord = function $SOS$Offering$$getObservationRecord$($i$$) {
  var $record$$ = {};
  this.observationData && ($record$$ = this.observationData instanceof Array ? this.observationData[$i$$] : this.observationData);
  return $record$$;
};
SOS.Offering.prototype.getFilteredObservationRecord = function $SOS$Offering$$getFilteredObservationRecord$($i$$, $filter$$) {
  var $record$$;
  if (this.observationData) {
    var $foi$$1_r$$ = this.observationData[$i$$];
    SOS.Utils.isValidObject($filter$$) ? SOS.Utils.isValidObject($filter$$.foiId) ? ($foi$$1_r$$ = _sos.getFeatureOfInterestFromObservationRecord($foi$$1_r$$)) && $foi$$1_r$$.attributes.id == $filter$$.foiId && ($record$$ = _sos.SOSObservations.measurements[$i$$]) : SOS.Utils.isValidObject($filter$$.observedProperty) && $foi$$1_r$$.observedProperty == $filter$$.observedProperty && ($record$$ = _sos.SOSObservations.measurements[$i$$]) : $record$$ = _sos.SOSObservations.measurements[$i$$];
    $record$$ = _sos.addPropertiesToObservationRecord($record$$);
  }
  return $record$$;
};
SOS.Offering.prototype.getResults = function $SOS$Offering$$getResults$($start$$, $end$$, $callback$$) {
  2 < arguments.length && this.sos.registerUserCallback({event:SOS.Const.Events.SOS_OFFERING_RESULT_AVAILABLE, callback:$callback$$});
  this.sos.obsFormatter.getObservationByScope({offering:this.id || this.identifier, observedProperties:this.observedProperties}, $callback$$, SOS.Const.Events.SOS_OFFERING_OBSERVATION_AVAILABLE, this);
};
SOS = SOS || {};
SOS.method = SOS.method || {};
SOS.Method = function $SOS$Method$() {
};
SOS.inherit(SOS.Method, SOS.Source);
SOS.method.GET = function $SOS$method$GET$($scope$$) {
  this.scope = $scope$$;
};
SOS.inherit(SOS.method.GET, SOS.Method);
SOS.method.GET.prototype.read = function $SOS$method$GET$$read$($data$$) {
  this.scope.data = this.scope.sources && this.scope.sources[this.scope.defaultSource] ? this.scope.sources[this.scope.defaultSource].read($data$$) : this.scope.sources.xml.read($data$$);
};
SOS.method.GET.prototype.write = function $SOS$method$GET$$write$($options$$) {
  return this.scope.sources && this.scope.sources[this.scope.defaultSource] ? this.scope.sources[this.scope.defaultSource].write($options$$) : this.scope.sources.xml.write($options$$);
};
SOS = SOS || {};
SOS.entity = SOS.entity || {};
SOS.Entity = function $SOS$Entity$($options$$) {
  var $_ent$$ = this;
  $options$$ = $options$$ || {};
  if (!(this instanceof SOS.Entity)) {
    throw Error("Error " + $_ent$$.entityName + " " + SOS.Const.ErrorText.SOS_VIA_NEW);
  }
  $_ent$$.data = null;
  $_ent$$.sources = {};
  if (!$options$$.sos && !$options$$.url) {
    throw Error(SOS.Const.ErrorText.SOS_URL_MISSING);
  }
  $_ent$$.sos = $options$$.sos || new SOS({url:$options$$.url, bindingType:SOS.bindingType.XML, entity:$_ent$$});
  $_ent$$.defaultSource = $options$$.defaultSource || $options$$ || "xml";
  $_ent$$.postCfg = null;
  $_ent$$.dcp = $_ent$$.dcp || [];
  $_ent$$.postUrl = $_ent$$.postUrl || "";
  $_ent$$.sources && ($_ent$$.sources.xml || ($_ent$$.sources.xml = $_ent$$.bindSourceXML()), $_ent$$.sources.json || ($_ent$$.sources.json = $_ent$$.bindSourceJSON()));
  $_ent$$.get = new SOS.method.GET($_ent$$);
  $_ent$$.capsOperation && $_ent$$.sos.registerUserCallback({event:SOS.Const.Events.SOS_CAPABILITIES_AVAILABLE, callback:function() {
    $_ent$$.bindUrlConfig();
  }});
};
SOS.Entity.prototype.bindUrlConfig = function $SOS$Entity$$bindUrlConfig$() {
  var $_ent$$ = this, $_getUrl$$ = function $$_getUrl$$$() {
    $_ent$$.postCfg = [];
    if ($_ent$$.dcp) {
      if ($_ent$$.dcp instanceof Array) {
        for (var $i$$45_post$$ = 0;$i$$45_post$$ < $_ent$$.dcp.length;$i$$45_post$$++) {
          "post" == $_ent$$.dcp[$i$$45_post$$].method.toLowerCase() && $_ent$$.postCfg.push({"@href":$_ent$$.dcp[$i$$45_post$$].href, constraint:{allowedValues:{value:$_ent$$.dcp[$i$$45_post$$].constraints["Content-Type"].allowedValues}}});
        }
      } else {
        $_ent$$.dcp && $_ent$$.dcp.hTTP && ($_ent$$.postCfg = $_ent$$.dcp.hTTP.post);
      }
    }
    if ($_ent$$.postCfg) {
      if ($i$$45_post$$ = $_ent$$.postCfg, $i$$45_post$$ instanceof Array) {
        for ($i$$45_post$$ = 0;$i$$45_post$$ < $_ent$$.postCfg.length;$i$$45_post$$++) {
          var $url$$ = $_ent$$.postCfg[$i$$45_post$$]["@href"], $format$$;
          for ($format$$ in $_ent$$.postCfg[$i$$45_post$$].constraint.allowedValues) {
            if ($_ent$$.postCfg[$i$$45_post$$].constraint.allowedValues[$format$$] instanceof Array) {
              for (var $j$$ = 0;$j$$ < $_ent$$.postCfg[$i$$45_post$$].constraint.allowedValues[$format$$].length;$j$$++) {
                if ($_ent$$.postCfg[$i$$45_post$$].constraint.allowedValues[$format$$][$j$$] == $_ent$$.sos.config.post.responseFormatType) {
                  return $url$$;
                }
              }
            }
            if ($_ent$$.postCfg[$i$$45_post$$].constraint.allowedValues[$format$$] == $_ent$$.sos.config.post.responseFormatType) {
              return $url$$;
            }
          }
        }
      } else {
        return $i$$45_post$$["@href"];
      }
    }
  }, $ope$$ = $_ent$$.sos.capsFormatter.getOperation($_ent$$.capsOperation);
  $ope$$ && ($_ent$$.dcp = $ope$$.dCP || $ope$$.dcp, $_ent$$.postUrl = $_getUrl$$());
};
SOS.Entity.prototype.getPostUrl = function $SOS$Entity$$getPostUrl$() {
  var $_ent$$ = this;
  return $_ent$$.postUrl ? new SOS.Promise(function($resolve$$, $reject$$) {
    $resolve$$($_ent$$.postUrl);
  }) : new SOS.Promise(function($resolve$$, $reject$$) {
    $_ent$$.sos.getCapabilities().then(function($caps$$) {
      null == $_ent$$.sos.capsFormatter.data && ($_ent$$.sos.capsFormatter.data = $caps$$);
      $_ent$$.bindUrlConfig();
      $resolve$$($_ent$$.postUrl);
    });
  });
};
SOS.Entity.prototype.getContentType = function $SOS$Entity$$getContentType$() {
  if (this.sources && this.sources[this.defaultSource]) {
    switch(this.defaultSource) {
      case "json":
        return "application/json";
      case "xml":
        return "application/xml";
    }
  }
};
SOS.Entity.prototype.bindSourceXML = function $SOS$Entity$$bindSourceXML$() {
  throw Error("bindSourceXML not implemented.");
};
SOS.Entity.prototype.bindSourceJSON = function $SOS$Entity$$bindSourceJSON$() {
  throw Error("bindSourceJSON not implemented.");
};
SOS.entity.Capabilities = function $SOS$entity$Capabilities$($options$$) {
  this.entityName = "Capabilities";
  SOS.Entity.apply(this, arguments);
  this.getCapabilities();
};
SOS.inherit(SOS.entity.Capabilities, SOS.Entity);
SOS.entity.Capabilities.prototype.getCapabilities = function $SOS$entity$Capabilities$$getCapabilities$($options$$) {
  var $_ent$$ = this;
  $options$$ = $options$$ || {};
  if ($_ent$$.sos && !$_ent$$.sos.url) {
    throw Error(SOS.Const.ErrorText.SOS_URL_MISSING);
  }
  SOS.Capabilities = SOS.Capabilities || {};
  if (SOS.Capabilities[$_ent$$.sos.url] || $_ent$$.sos.capabilitiesPromise instanceof SOS.Promise) {
    return $_ent$$.sos.capabilitiesPromise instanceof SOS.Promise ? $_ent$$.sos.capabilitiesPromise : new SOS.Promise(function($resolve$$, $reject$$) {
      $resolve$$(SOS.Capabilities[$_ent$$.sos.url]);
    });
  }
  $_ent$$.sos.capabilitiesPromise = new SOS.Promise(function($resolve$$, $reject$$) {
    $options$$.callback && $options$$.scope.registerUserCallback({event:SOS.Const.Events.SOS_CAPABILITIES_AVAILABLE, callback:$options$$.callback});
    SOS.Request.POST({url:$_ent$$.sos.url, headers:{"Content-Type":$_ent$$.getContentType()}, data:$_ent$$.get.write(), scope:$_ent$$.sos, async:$_ent$$.sos.async, failure:function($error$$) {
      console.log(SOS.Const.ErrorText.SOS_CAPABILITIES_ERROR);
      console.log($error$$);
      $reject$$(SOS.Const.ErrorText.SOS_CAPABILITIES_ERROR + " :" + $error$$);
    }, success:function($response$$) {
      $response$$ && $response$$.responseText && ($_ent$$.get.read($response$$.responseText), $_ent$$.data && ($_ent$$.data.Capabilities && ($_ent$$.data = $_ent$$.data.Capabilities), $_ent$$.sos.SOSCapabilities = $_ent$$.data, $_ent$$.sos.setObservationResponseFormatFromTypeSuggestion($_ent$$.sos.config.observation.responseFormatType)), SOS.Capabilities[$_ent$$.sos.url] = $_ent$$.data, $_ent$$.sos.events.triggerEvent(SOS.Const.Events.SOS_CAPABILITIES_AVAILABLE), $resolve$$(SOS.Capabilities[$_ent$$.sos.url]), 
      $_ent$$.sos.capabilitiesPromise = null);
    }});
  });
  return $_ent$$.sos.capabilitiesPromise;
};
SOS.entity.Capabilities.prototype.getOperation = function $SOS$entity$Capabilities$$getOperation$($ope$$) {
  if (SOS.Utils.isValidObject(SOS.Capabilities[this.sos.url])) {
    var $_opes$$ = this.getOperationMetadata();
    if ($_opes$$ instanceof Array) {
      for (var $i$$ = 0;$i$$ < $_opes$$.length;$i$$++) {
        if ($_opes$$[$i$$]["@name"].toLowerCase() == $ope$$.toLowerCase().replace(SOS.Utils.regExes.trimSpace, "")) {
          return $_opes$$[$i$$];
        }
      }
    } else {
      if ($_opes$$ instanceof Object && SOS.Utils.isValidObject($_opes$$)) {
        for ($i$$ in $_opes$$) {
          if ($i$$.toLowerCase() == $ope$$.toLowerCase().replace(SOS.Utils.regExes.trimSpace, "")) {
            return $_opes$$[$i$$];
          }
        }
      }
    }
  }
  return null;
};
SOS.entity.Capabilities.prototype.getOperationParameters = function $SOS$entity$Capabilities$$getOperationParameters$($ope$$) {
  $ope$$ = this.getOperation($ope$$);
  if (SOS.Utils.isValidObject($ope$$)) {
    return $ope$$.parameter || $ope$$.parameters;
  }
};
SOS.entity.Capabilities.prototype.getOperationParameterValues = function $SOS$entity$Capabilities$$getOperationParameterValues$($ope$$, $param$$) {
  var $opeData$$ = this.getOperationParameters($ope$$);
  if (SOS.Utils.isValidObject($opeData$$)) {
    if ($opeData$$ instanceof Array) {
      for (var $i$$ = 0;$i$$ < $opeData$$.length;$i$$++) {
        if ($opeData$$[$i$$]["@name"].toLowerCase() == $param$$.toLowerCase().replace(SOS.Utils.regExes.trimSpace, "")) {
          return $opeData$$[$i$$].allowedValues ? $opeData$$[$i$$].allowedValues.value || $opeData$$[$i$$].allowedValues : null;
        }
      }
    } else {
      if ($opeData$$ instanceof Object) {
        for ($i$$ in $opeData$$) {
          if ($i$$.toLowerCase() == $param$$.toLowerCase().replace(SOS.Utils.regExes.trimSpace, "")) {
            return $opeData$$[$i$$].allowedValues ? $opeData$$[$i$$].allowedValues.value || $opeData$$[$i$$].allowedValues : $opeData$$[$i$$];
          }
        }
      }
    }
  }
  return [];
};
SOS.entity.Capabilities.prototype.getOperationMetadata = function $SOS$entity$Capabilities$$getOperationMetadata$() {
  if (SOS.Capabilities[this.sos.url]) {
    var $data$$ = SOS.Capabilities[this.sos.url];
    if ($data$$.operationsMetadata) {
      return $data$$.operationsMetadata.operation;
    }
    if ($data$$.operationMetadata) {
      return $data$$.operationMetadata.operations;
    }
  }
  return [];
};
SOS.entity.Capabilities.prototype.bindSourceXML = function $SOS$entity$Capabilities$$bindSourceXML$() {
  var $xmlSource$$ = new SOS.source.XML;
  $xmlSource$$.write = function $$xmlSource$$$write$() {
    return '<?xml version="1.0" encoding="UTF-8"?> <sos:GetCapabilities xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:sos="http://www.opengis.net/sos/2.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:swe="http://www.opengis.net/swe/2.0" service="SOS" xsi:schemaLocation="http://www.opengis.net/sos/2.0 http://schemas.opengis.net/sos/2.0/sosGetCapabilities.xsd"> <ows:AcceptVersions> <ows:Version>2.0.0</ows:Version> </ows:AcceptVersions> <ows:Sections> <ows:Section>ServiceIdentification</ows:Section> <ows:Section>ServiceProvider</ows:Section> <ows:Section>OperationsMetadata</ows:Section> <ows:Section>FilterCapabilities</ows:Section> </ows:Sections> </sos:GetCapabilities>';
  };
  return $xmlSource$$;
};
SOS.entity.Capabilities.prototype.bindSourceJSON = function $SOS$entity$Capabilities$$bindSourceJSON$() {
  var $jsonSource$$ = new SOS.source.JSON;
  $jsonSource$$.write = function $$jsonSource$$$write$() {
    return this.__proto__.write({request:"GetCapabilities", service:"SOS", sections:["ServiceIdentification", "ServiceProvider", "OperationsMetadata", "FilterCapabilities", "Contents"]});
  };
  return $jsonSource$$;
};
SOS.entity.DescribeSensor = function $SOS$entity$DescribeSensor$($options$$) {
  this.capsOperation = this.entityName = "DescribeSensor";
  SOS.Entity.apply(this, arguments);
  this.responseFormatType = $options$$.responseFormatType || "http://www.opengis.net/sensorml/2.0";
  this.onCapAllowedProcedures = [];
  this.onCapAllowedProceduresDescFormat = [];
};
SOS.inherit(SOS.entity.DescribeSensor, SOS.Entity);
SOS.entity.DescribeSensor.prototype.getDescribeSensor = function $SOS$entity$DescribeSensor$$getDescribeSensor$($params$$) {
  var $_ent$$ = this;
  return new SOS.Promise(function($resolve$$, $reject$$) {
    $_ent$$.sos.getCapabilities().then(function() {
      $_ent$$.getPostUrl().then(function($url$$) {
        $url$$ && 0 < $url$$.length ? $_ent$$.getOnCapAllowedProceduresDescFormat().then(function($format$$) {
          $params$$.procedureDescriptionFormat || ("string" == typeof $_ent$$.onCapAllowedProceduresDescFormat ? $params$$.procedureDescriptionFormat = $_ent$$.onCapAllowedProceduresDescFormat : $_ent$$.onCapAllowedProceduresDescFormat instanceof Array && 1 == $_ent$$.onCapAllowedProceduresDescFormat.length ? $params$$.procedureDescriptionFormat = $_ent$$.onCapAllowedProceduresDescFormat[0] : -1 < $_ent$$.onCapAllowedProceduresDescFormat.indexOf($_ent$$.responseFormatType) ? $params$$.procedureDescriptionFormat = 
          $_ent$$.responseFormatType : $params$$.procedureDescriptionFormat = $_ent$$.onCapAllowedProceduresDescFormat[0]);
          SOS.Request.POST({url:$_ent$$.postUrl, async:$_ent$$.sos.config.async, failure:function($error$$) {
            console.log(SOS.Const.ErrorText.SOS_SENSOR_DESCRIPTION_ERROR);
            console.log($error$$);
            $reject$$(SOS.Const.ErrorText.SOS_SENSOR_DESCRIPTION_ERROR + " :" + $error$$);
          }, success:function($response$$) {
            $_ent$$.data && ($response$$ && $response$$.responseText && $_ent$$.get.read($response$$.responseText), $_ent$$.sos.SOSSensorDescription = $_ent$$.data.DescribeSensorResponse, $_ent$$.sos.events.triggerEvent(SOS.Const.Events.SOS_SENSOR_DESCRIPTION_AVAILABLE), $resolve$$($_ent$$.sos.SOSSensorDescription));
          }, data:$_ent$$.get.write($params$$)});
        }) : $resolve$$([]);
      });
    });
  });
};
SOS.entity.DescribeSensor.prototype.getOnCapAllowedProceduresDescFormat = function $SOS$entity$DescribeSensor$$getOnCapAllowedProceduresDescFormat$() {
  var $_ent$$ = this;
  return new SOS.Promise(function($resolve$$, $reject$$) {
    $_ent$$.sos.getCapabilities().then(function() {
      0 == $_ent$$.onCapAllowedProceduresDescFormat.length && ($_ent$$.onCapAllowedProceduresDescFormat = $_ent$$.sos.capsFormatter.getOperationParameterValues("DescribeSensor", "procedureDescriptionFormat"));
      $resolve$$($_ent$$.onCapAllowedProceduresDescFormat);
    });
  });
};
SOS.entity.DescribeSensor.prototype.getOnCapAllowedProcedures = function $SOS$entity$DescribeSensor$$getOnCapAllowedProcedures$() {
  var $_ent$$ = this;
  return new SOS.Promise(function($resolve$$, $reject$$) {
    $_ent$$.sos.getCapabilities().then(function() {
      0 == $_ent$$.onCapAllowedProcedures.length && ($_ent$$.onCapAllowedProcedures = $_ent$$.sos.capsFormatter.getOperationParameterValues("DescribeSensor", "procedure"));
      $resolve$$($_ent$$.onCapAllowedProcedures);
    });
  });
};
SOS.entity.DescribeSensor.prototype.bindSourceXML = function $SOS$entity$DescribeSensor$$bindSourceXML$() {
  var $xmlSource$$ = new SOS.source.XML({required:[]});
  $xmlSource$$.write = function $$xmlSource$$$write$($params$$) {
    this.__proto__.write($params$$, ["idProcedure", "procedureDescriptionFormat"]);
    return '<?xml version="1.0" encoding="UTF-8"?> <swes:DescribeSensor xmlns:swes="http://www.opengis.net/swes/2.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:gml="http://www.opengis.net/gml/3.2" service="SOS" version="2.0.0" xsi:schemaLocation="http://www.opengis.net/swes/2.0 http://schemas.opengis.net/swes/2.0/swes.xsd"> <swes:procedure>' + $params$$.idProcedure + "</swes:procedure> " + ($params$$.procedureDescriptionFormat ? "<swes:procedureDescriptionFormat>" + $params$$.procedureDescriptionFormat + 
    "</swes:procedureDescriptionFormat> " : " ") + "</swes:DescribeSensor>";
  };
  return $xmlSource$$;
};
SOS.entity.DescribeSensor.prototype.bindSourceJSON = function $SOS$entity$DescribeSensor$$bindSourceJSON$() {
  var $jsonSource$$ = new SOS.source.JSON;
  $jsonSource$$.write = function $$jsonSource$$$write$($params$$) {
    var $data$$ = {request:"DescribeSensor", service:"SOS", version:"2.0.0", procedure:$params$$.idProcedure};
    $params$$.procedureDescriptionFormat && ($data$$.procedureDescriptionFormat = $params$$.procedureDescriptionFormat);
    return this.__proto__.write($data$$);
  };
  return $jsonSource$$;
};
SOS.entity.FeatureOfInterest = function $SOS$entity$FeatureOfInterest$($options$$) {
  this.entityName = "FeatureOfInterest";
  this.capsOperation = "GetFeatureOfInterest";
  SOS.Entity.apply(this, arguments);
  this.allowedFOIs = [];
  this.onCapAllowedFOIs = [];
  this.onCapAllowedProcedures = [];
  this.onCapAllowedObservedProperty = [];
  this.onCapAllowedIDFeaturesOfInterest = [];
  this.onCapAllowedRangeSpatialFilter = null;
  this.valueReference = $options$$.valueReference || "sams:shape";
};
SOS.inherit(SOS.entity.FeatureOfInterest, SOS.Entity);
SOS.entity.FeatureOfInterest.prototype._bindFOI = function $SOS$entity$FeatureOfInterest$$_bindFOI$($ff$$) {
  return new SOS.entity.FeatureOfInterestRecord(SOS.Utils.extend($ff$$, {sos:this.sos}));
};
SOS.entity.FeatureOfInterest.prototype.getFeatureOfInterest = function $SOS$entity$FeatureOfInterest$$getFeatureOfInterest$($params$$, $callback$$) {
  var $_ent$$ = this;
  return new SOS.Promise(function($resolve$$, $reject$$) {
    $_ent$$.sos.getCapabilities().then(function() {
      $_ent$$.getPostUrl().then(function($url$$) {
        $url$$ && 0 < $url$$.length ? SOS.Request.POST({url:$url$$, async:$_ent$$.sos.config.async, failure:function($error$$) {
          console.log(SOS.Const.ErrorText.SOS_FEATURE_OF_INTEREST_ERROR);
          console.log($error$$);
          $reject$$(SOS.Const.ErrorText.SOS_FEATURE_OF_INTEREST_ERROR + " :" + $error$$);
        }, success:function($features$$inline_5_response$$) {
          $features$$inline_5_response$$ && $features$$inline_5_response$$.responseText && $_ent$$.get.read($features$$inline_5_response$$.responseText);
          if ($_ent$$.data) {
            $features$$inline_5_response$$ = [];
            $_ent$$.allowedFOIs = [];
            $_ent$$.sos.SOSFeatureOfInterest = $features$$inline_5_response$$ = $_ent$$.data.featureOfInterest || $_ent$$.data.GetFeatureOfInterestResponse && $_ent$$.data.GetFeatureOfInterestResponse.featureMember || [];
            if ($features$$inline_5_response$$ instanceof Array) {
              for (var $f$$inline_7_i$$ = 0;$f$$inline_7_i$$ < $features$$inline_5_response$$.length;$f$$inline_7_i$$++) {
                ($features$$inline_5_response$$[$f$$inline_7_i$$].sF_SpatialSamplingFeature || $features$$inline_5_response$$[$f$$inline_7_i$$]) && $_ent$$.allowedFOIs.push($_ent$$._bindFOI($features$$inline_5_response$$[$f$$inline_7_i$$].sF_SpatialSamplingFeature || $features$$inline_5_response$$[$f$$inline_7_i$$]));
              }
            } else {
              for ($f$$inline_7_i$$ in $features$$inline_5_response$$) {
                $_ent$$.allowedFOIs.push($_ent$$._bindFOI($features$$inline_5_response$$[$f$$inline_7_i$$]));
              }
            }
            $resolve$$($_ent$$.allowedFOIs);
            $_ent$$.sos.events.triggerEvent(SOS.Const.Events.SOS_FEATURE_OF_INTEREST_AVAILABLE);
          }
          $callback$$ && $callback$$();
        }, data:$_ent$$.get.write($params$$)}) : $resolve$$([]);
      });
    });
  });
};
SOS.entity.FeatureOfInterest.prototype.getFeatureOfInterestByPoint = function $SOS$entity$FeatureOfInterest$$getFeatureOfInterestByPoint$($srs$$, $bbox$$, $radius$$, $params$$, $callback$$) {
  if (!$srs$$) {
    throw Error(SOS.Const.ErrorText.FOI.SOS_FOI_GET_BY_POINT_SRS_MISSING);
  }
  if (!$bbox$$) {
    throw Error(SOS.Const.ErrorText.FOI.SOS_FOI_GET_BY_POINT_COORDS_MISSING);
  }
  if (!($bbox$$ instanceof Array) || $bbox$$ instanceof Array && 2 != $bbox$$.length) {
    throw Error(SOS.Const.ErrorText.FOI.SOS_FOI_GET_BY_POINT_COORDS_MISSING);
  }
  if (!$radius$$) {
    throw Error(SOS.Const.ErrorText.FOI.SOS_FOI_GET_BY_POINT_RADIUS_MISSING);
  }
  $params$$ = $params$$ || {};
  var $allowedCvtr$$ = [], $converter$$inline_12_i$$ = new SOS.Utils.Converter.DataTypeConverter;
  $allowedCvtr$$.push($converter$$inline_12_i$$.createConverter(SOS.Utils.Converter.Types.FLOAT));
  $allowedCvtr$$.push($converter$$inline_12_i$$.createConverter(SOS.Utils.Converter.Types.INT));
  for ($converter$$inline_12_i$$ = 0;$converter$$inline_12_i$$ < $allowedCvtr$$.length;$converter$$inline_12_i$$++) {
    $allowedCvtr$$[$converter$$inline_12_i$$].is($radius$$) && $allowedCvtr$$[$converter$$inline_12_i$$].convert($radius$$);
  }
  $bbox$$ = SOS.Utils.Geom.createBBox($bbox$$, $radius$$);
  $params$$.spatial = {srs:$srs$$, lowerCorner:$bbox$$.lowerCorner, upperCorner:$bbox$$.upperCorner};
  return this.getFeatureOfInterest($params$$, $callback$$);
};
SOS.entity.FeatureOfInterest.prototype.getProcedures = function $SOS$entity$FeatureOfInterest$$getProcedures$($foiID$$, $callback$$) {
  var $_ent$$ = this, $result$$ = [];
  $foiID$$ instanceof Array || ($foiID$$ = [$foiID$$]);
  return new SOS.Promise(function($resolve$$, $reject$$) {
    $_ent$$.sos.getOfferingList(SOS.offeringType.SOS_2).then(function($offList$$) {
      $offList$$ = $offList$$ || [];
      $offList$$ instanceof Array || ($offList$$ = [$offList$$]);
      for (var $z$$ = 0;$z$$ < $foiID$$.length;$z$$++) {
        for (var $i$$ = 0;$i$$ < $offList$$.length;$i$$++) {
          var $o$$ = $offList$$[$i$$];
          $o$$.featureOfInterestIds && $o$$.featureOfInterestIds instanceof Array && -1 < $o$$.featureOfInterestIds.indexOf($foiID$$[$z$$]) && $_ent$$.sos.getOffering($o$$.identifier).then(function($off$$) {
            $result$$ = $result$$.concat($off$$.procedures);
          });
        }
      }
      $resolve$$($result$$);
    });
  });
};
SOS.entity.FeatureOfInterest.prototype.getAllowedFOIs = function $SOS$entity$FeatureOfInterest$$getAllowedFOIs$() {
  return this.allowedFOIs || [];
};
SOS.entity.FeatureOfInterest.prototype.getOnCapAllowedProcedures = function $SOS$entity$FeatureOfInterest$$getOnCapAllowedProcedures$() {
  var $_ent$$ = this;
  return new SOS.Promise(function($resolve$$, $reject$$) {
    $_ent$$.sos.getCapabilities().then(function() {
      0 == $_ent$$.onCapAllowedProcedures.length && ($_ent$$.onCapAllowedProcedures = $_ent$$.sos.capsFormatter.getOperationParameterValues("GetFeatureOfInterest", "procedure"));
      $resolve$$($_ent$$.onCapAllowedProcedures);
    });
  });
};
SOS.entity.FeatureOfInterest.prototype.getOnCapAllowedObservedProperty = function $SOS$entity$FeatureOfInterest$$getOnCapAllowedObservedProperty$() {
  var $_ent$$ = this;
  return new SOS.Promise(function($resolve$$, $reject$$) {
    $_ent$$.sos.getCapabilities().then(function() {
      0 == $_ent$$.onCapAllowedObservedProperty.length && ($_ent$$.onCapAllowedObservedProperty = $_ent$$.sos.capsFormatter.getOperationParameterValues("GetFeatureOfInterest", "observedProperty"));
      $resolve$$($_ent$$.onCapAllowedObservedProperty);
    });
  });
};
SOS.entity.FeatureOfInterest.prototype.getOnCapAllowedIDFeaturesOfInterest = function $SOS$entity$FeatureOfInterest$$getOnCapAllowedIDFeaturesOfInterest$() {
  var $_ent$$ = this;
  return new SOS.Promise(function($resolve$$, $reject$$) {
    $_ent$$.sos.getCapabilities().then(function() {
      0 == $_ent$$.onCapAllowedIDFeaturesOfInterest.length && ($_ent$$.onCapAllowedIDFeaturesOfInterest = $_ent$$.sos.capsFormatter.getOperationParameterValues("GetFeatureOfInterest", "featureOfInterest"));
      $resolve$$($_ent$$.onCapAllowedIDFeaturesOfInterest);
    });
  });
};
SOS.entity.FeatureOfInterest.prototype.getOnCapAllowedRangeSpatialFilter = function $SOS$entity$FeatureOfInterest$$getOnCapAllowedRangeSpatialFilter$() {
  var $_ent$$ = this;
  return new SOS.Promise(function($resolve$$, $reject$$) {
    $_ent$$.sos.getCapabilities().then(function() {
      if (null == $_ent$$.onCapAllowedRangeSpatialFilter) {
        var $allowedValues$$ = $_ent$$.sos.capsFormatter.getOperationParameterValues("GetFeatureOfInterest", "spatialFilter");
        $allowedValues$$ instanceof Object && ($_ent$$.onCapAllowedRangeSpatialFilter = {min:$allowedValues$$.min && $allowedValues$$.min.split(" ") || $allowedValues$$.range && $allowedValues$$.range.minimumValue.split(" "), max:$allowedValues$$.max && $allowedValues$$.max.split(" ") || $allowedValues$$.range && $allowedValues$$.range.maximumValue.split(" ")});
      }
      $resolve$$($_ent$$.onCapAllowedRangeSpatialFilter);
    });
  });
};
SOS.entity.FeatureOfInterest.prototype.getAvailableFeaturesOfInterest = function $SOS$entity$FeatureOfInterest$$getAvailableFeaturesOfInterest$() {
  var $_ent$$ = this;
  return new SOS.Promise(function($resolve$$, $reject$$) {
    $_ent$$.sos.getCapabilities().then(function() {
      var $_parse$$ = function $$_parse$$$($features$$3_response$$) {
        $features$$3_response$$ && $features$$3_response$$.responseText && $_ent$$.get.read($features$$3_response$$.responseText);
        if ($_ent$$.data && $_ent$$.data.GetFeatureOfInterestResponse && $_ent$$.data.GetFeatureOfInterestResponse.featureMember) {
          $features$$3_response$$ = $_ent$$.data.GetFeatureOfInterestResponse.featureMember;
          for (var $i$$ = 0;$i$$ < $features$$3_response$$.length;$i$$++) {
            $_ent$$.onCapAllowedFOIs.push($_ent$$._bindFOI($features$$3_response$$[$i$$].sF_SpatialSamplingFeature || $features$$3_response$$[$i$$]));
          }
        }
        $_ent$$.sos.events.triggerEvent(SOS.Const.Events.SOS_FEATURES_OF_INTEREST_AVAILABLE, {item:$_ent$$.onCapAllowedFOIs});
      };
      0 == $_ent$$.onCapAllowedIDFeaturesOfInterest.length && ($_ent$$.onCapAllowedIDFeaturesOfInterest = $_ent$$.sos.capsFormatter.getOperationParameterValues("GetFeatureOfInterest", "featureOfInterest"));
      0 < $_ent$$.onCapAllowedIDFeaturesOfInterest.length && 0 == $_ent$$.onCapAllowedFOIs.length && $_ent$$.getFeatureOfInterest({featuresOfInterest:$_ent$$.onCapAllowedIDFeaturesOfInterest}, $_parse$$);
    });
  });
};
SOS.entity.FeatureOfInterest.prototype.bindSourceXML = function $SOS$entity$FeatureOfInterest$$bindSourceXML$() {
  var $_ent$$ = this, $xmlSource$$ = new SOS.source.XML({required:[]});
  $xmlSource$$.write = function $$xmlSource$$$write$($params$$) {
    this.__proto__.write($params$$, ["procedure", "observedProperty", "featureOfInterest", "spatial"]);
    if ($params$$.spatial) {
      if (!$params$$.spatial.srs) {
        throw Error(SOS.Const.ErrorText.XML.WRONG_PARAM);
      }
      if (!$params$$.spatial.lowerCorner || $params$$.spatial.lowerCorner && !($params$$.spatial.lowerCorner instanceof Array)) {
        throw Error(SOS.Const.ErrorText.XML.WRONG_PARAM);
      }
      if (!$params$$.spatial.upperCorner || $params$$.spatial.upperCorner && !($params$$.spatial.upperCorner instanceof Array)) {
        throw Error(SOS.Const.ErrorText.XML.WRONG_PARAM);
      }
    }
    var $filterNodes$$ = {procedure:"<sos:procedure>filter</sos:procedure> ", observedProperty:"<sos:observedProperty>filter</sos:observedProperty> ", featureOfInterest:"<sos:featureOfInterest>filter</sos:featureOfInterest> "}, $getFilterNodes$$ = function $$getFilterNodes$$$($filterNodeType$$, $filters$$) {
      for (var $i$$ = 0;$i$$ < $filters$$.length;$i$$++) {
        $getRequest$$ += $filterNodes$$[$filterNodeType$$].replace(/filter/g, $filters$$[$i$$]);
      }
    }, $getRequest$$ = '<?xml version="1.0" encoding="UTF-8"?> <sos:GetFeatureOfInterest xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:sos="http://www.opengis.net/sos/2.0" xmlns:fes="http://www.opengis.net/fes/2.0" xmlns:gml="http://www.opengis.net/gml/3.2" xmlns:swe="http://www.opengis.net/swe/2.0" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:swes="http://www.opengis.net/swes/2.0" service="SOS" version="2.0.0" xsi:schemaLocation="http://www.opengis.net/sos/2.0 http://schemas.opengis.net/sos/2.0/sos.xsd"> ';
    $params$$.procedure && $getFilterNodes$$("procedure", $params$$.procedure instanceof Array ? $params$$.procedure : [$params$$.procedure]);
    $params$$.observedProperty && $getFilterNodes$$("observedProperty", $params$$.observedProperty instanceof Array ? $params$$.observedProperty : [$params$$.observedProperty]);
    $params$$.featureOfInterest && $getFilterNodes$$("featureOfInterest", $params$$.featureOfInterest instanceof Array ? $params$$.featureOfInterest : [$params$$.featureOfInterest]);
    $params$$.spatial && $params$$.spatial.srs && $params$$.spatial.lowerCorner && 1 < $params$$.spatial.lowerCorner.length && $params$$.spatial.upperCorner && 1 < $params$$.spatial.upperCorner.length && ($getRequest$$ += "<sos:spatialFilter> <fes:BBOX> <fes:ValueReference>" + $_ent$$.valueReference + '</fes:ValueReference> <gml:Envelope srsName="' + (0 > $params$$.spatial.srs.toString().indexOf("/") ? "http://www.opengis.net/def/crs/EPSG/0/" + $params$$.spatial.srs.toString() + '"' : $params$$.spatial.srs) + 
    "> <gml:lowerCorner>" + $params$$.spatial.lowerCorner[0] + " " + $params$$.spatial.lowerCorner[1] + "</gml:lowerCorner> <gml:upperCorner>" + $params$$.spatial.upperCorner[0] + " " + $params$$.spatial.upperCorner[1] + "</gml:upperCorner> </gml:Envelope> </fes:BBOX> </sos:spatialFilter> ");
    return $getRequest$$ += "</sos:GetFeatureOfInterest> ";
  };
  return $xmlSource$$;
};
SOS.entity.FeatureOfInterest.prototype.bindSourceJSON = function $SOS$entity$FeatureOfInterest$$bindSourceJSON$($jsonSource$$2_params$$) {
  $jsonSource$$2_params$$ = new SOS.source.JSON;
  $jsonSource$$2_params$$.write = function $$jsonSource$$2_params$$$write$($params$$) {
    var $data$$ = {request:"GetFeatureOfInterest", service:"SOS", version:"2.0.0"};
    $params$$.featureOfInterest && ($data$$.featureOfInterest = $params$$.featureOfInterest instanceof Array ? $params$$.featureOfInterest : [$params$$.featureOfInterest]);
    $params$$.observedProperty && ($data$$.observedProperty = $params$$.observedProperty instanceof Array ? $params$$.observedProperty : [$params$$.observedProperty]);
    $params$$.procedure && ($data$$.procedure = $params$$.procedure instanceof Array ? $params$$.procedure : [$params$$.procedure]);
    $params$$.spatial && $params$$.spatial.geomType && $params$$.spatial.coordinates && ($data$$.spatialFilter = {bbox:{ref:"om:featureOfInterest/sams:SF_SpatialSamplingFeature/sams:shape", value:{type:$params$$.spatial.geomType, coordinates:$params$$.spatial.coordinates}}});
    return this.__proto__.write($data$$);
  };
  return $jsonSource$$2_params$$;
};
SOS.entity.FeatureOfInterestRecord = function $SOS$entity$FeatureOfInterestRecord$($options$$) {
  this.entityName = "FeatureOfInterestRecord";
  this.id = $options$$["@id"] || $options$$.id || "";
  this.idFOI = $options$$.identifier && ($options$$.identifier["#text"] || $options$$.identifier.value) || $options$$.idFOI || "";
  this.type = $options$$.type && $options$$.type["@href"] || $options$$.type || "";
  this.name = $options$$.name && ($options$$.name["#text"] || $options$$.name.value) || "";
  this.sampledFeature = $options$$.sampledFeature && ($options$$.sampledFeature["@href"] || $options$$.sampledFeature) || "";
  if ($options$$.shape || $options$$.geometry) {
    var $geom$$ = {};
    if ($options$$.geometry) {
      $geom$$.type = $options$$.geometry.type, $geom$$.srs = $options$$.geometry.srs, $geom$$.coords = $options$$.geometry.coordinates;
    } else {
      for (var $geomType$$ in $options$$.shape) {
        if ($options$$.shape[$geomType$$]["@id"] && ($geom$$.type = $options$$.shape[$geomType$$]["@id"].split("_").shift()), $options$$.shape[$geomType$$].pos && ($options$$.shape[$geomType$$].pos["@srsName"] && ($geom$$.srs = $options$$.shape[$geomType$$].pos["@srsName"].split("/").pop()), $options$$.shape[$geomType$$].pos["#text"])) {
          $geom$$.coords = $options$$.shape[$geomType$$].pos["#text"].split(" ");
          for (var $i$$ = 0;$i$$ < $geom$$.coords.length;$i$$++) {
            $geom$$.coords[$i$$] = parseInt($geom$$.coords[$i$$]);
          }
        }
      }
    }
    $geom$$.type && $geom$$.srs && $geom$$.coords && (this.geom = $geom$$);
  } else {
    this.geom = {};
  }
};
SOS.entity.Observation = function $SOS$entity$Observation$($options$$) {
  var $_ent$$ = this;
  $_ent$$.entityName = "Observation";
  $_ent$$.capsOperation = "GetObservation";
  SOS.Entity.apply($_ent$$, arguments);
  $_ent$$.filters = {};
  $_ent$$.sortByDateTime = $options$$.sortByDateTime || !0;
  $_ent$$.valueReference = $options$$.valueReference || "om:featureOfInterest/sams:SF_SpatialSamplingFeature/sams:shape";
  $_ent$$.sos.registerUserCallback({event:SOS.Const.Events.SOS_CAPABILITIES_AVAILABLE, callback:function() {
    $_ent$$._bindFiltersByCapabilities();
  }});
};
SOS.inherit(SOS.entity.Observation, SOS.Entity);
SOS.entity.Observation.prototype._bindFiltersByCapabilities = function $SOS$entity$Observation$$_bindFiltersByCapabilities$() {
  if (this.sos.capsFormatter.data && this.sos.capsFormatter.data.filterCapabilities) {
    var $operator_temporalCaps$$ = this.sos.capsFormatter.data.filterCapabilities.filter_Capabilities && this.sos.capsFormatter.data.filterCapabilities.filter_Capabilities.temporal_Capabilities || this.sos.capsFormatter.data.filterCapabilities.temporal, $ope$$ = null;
    $operator_temporalCaps$$ ? $ope$$ = $operator_temporalCaps$$.operands : $operator_temporalCaps$$.temporal_Capabilities && ($ope$$ = $operator_temporalCaps$$.temporalOperands && $operator_temporalCaps$$.temporal_Capabilities.temporalOperands);
    this.sos.obsFormatter.filters.temporalOperands = {};
    if ($ope$$ instanceof Array) {
      for (var $i$$ = 0;$i$$ < $ope$$.length;$i$$++) {
        var $operand$$ = $ope$$[$i$$].$ref.split("/").pop().replace("#", "");
        this.sos.obsFormatter.filters.temporalOperands[$operand$$] = $operand$$;
      }
    } else {
      if ($ope$$ instanceof Object && $ope$$.temporalOperand && ($ope$$ = $operator_temporalCaps$$.temporalOperands.temporalOperand, $ope$$ instanceof Array)) {
        for ($i$$ = 0;$i$$ < $ope$$.length;$i$$++) {
          $operand$$ = $ope$$[$i$$]["@name"].split(":").pop(), this.sos.obsFormatter.filters.temporalOperands[$operand$$] = $operand$$;
        }
      }
    }
    this.sos.obsFormatter.filters.temporalOperators = {};
    $ope$$ = $operator_temporalCaps$$.temporalOperators && $operator_temporalCaps$$.temporalOperators.temporalOperator || $operator_temporalCaps$$.operators;
    if ($ope$$ instanceof Array) {
      for ($i$$ = 0;$i$$ < $ope$$.length;$i$$++) {
        $operator_temporalCaps$$ = $ope$$[$i$$]["@name"], this.sos.obsFormatter.filters.temporalOperators[$operator_temporalCaps$$] = $operator_temporalCaps$$;
      }
    } else {
      if ($ope$$ instanceof Object && SOS.Utils.isValidObject($ope$$)) {
        for (var $opr$$ in $ope$$) {
          this.sos.obsFormatter.filters.temporalOperators[$opr$$] = $opr$$;
        }
      }
    }
  }
};
SOS.entity.Observation.prototype.getDataAvailable = function $SOS$entity$Observation$$getDataAvailable$() {
};
SOS.entity.Observation.prototype.getObservation = function $SOS$entity$Observation$$getObservation$($params$$, $callback$$, $event$$, $off$$) {
  var $_ent$$ = this;
  $event$$ instanceof SOS.Offering && ($off$$ = $event$$, $event$$ = null);
  return new SOS.Promise(function($resolve$$, $reject$$) {
    $_ent$$.sos.getCapabilities().then(function() {
      $_ent$$.getPostUrl().then(function($url$$) {
        $url$$ && 0 < $url$$.length ? SOS.Request.POST({url:$url$$, async:$_ent$$.sos.config.async, failure:function($error$$) {
          console.log(SOS.Const.ErrorText.SOS_OBSERVATION_ERROR);
          console.log($error$$);
          $reject$$(SOS.Const.ErrorText.SOS_OBSERVATION_ERROR + " :" + $error$$);
        }, success:function($response$$5_result$$) {
          $response$$5_result$$ && $response$$5_result$$.responseText && $_ent$$.get.read($response$$5_result$$.responseText);
          if ($_ent$$.data) {
            $_ent$$.data.GetObservationResponse && $_ent$$.data.GetObservationResponse.observationData && ($_ent$$.data = $_ent$$.sos.SOSObservations = $_ent$$.data.GetObservationResponse.observationData);
            $_ent$$.sortByDateTime && $_ent$$.data instanceof Array ? $_ent$$.data = $_ent$$.data.sort($_ent$$._sortObservations) : $_ent$$.data.oM_Observation && ($_ent$$.data = $_ent$$.sos.SOSObservations = $_ent$$.data.oM_Observation);
            $response$$5_result$$ = [];
            if ($_ent$$.data instanceof Array) {
              for (var $i$$ = 0;$i$$ < $_ent$$.data.length;$i$$++) {
                $response$$5_result$$.push(new SOS.entity.ObservationRecord($_ent$$.data[$i$$]));
              }
            } else {
              $response$$5_result$$.push(new SOS.entity.ObservationRecord($_ent$$.data));
            }
            $response$$5_result$$ && ($_ent$$.data = $_ent$$.sos.SOSObservations = $response$$5_result$$);
            $off$$ ? ($off$$.observationData = $response$$5_result$$, $_ent$$.sos.events.triggerEvent(SOS.Const.Events.SOS_OFFERING_OBSERVATION_AVAILABLE)) : $_ent$$.sos.events.triggerEvent($event$$ || SOS.Const.Events.SOS_OBSERVATION_AVAILABLE);
            $resolve$$($response$$5_result$$);
          }
          $callback$$ && $callback$$($_ent$$.data);
        }, data:$_ent$$.get.write($params$$)}) : $resolve$$([]);
      });
    });
  });
};
SOS.entity.Observation.prototype.getObservationFirst = function $SOS$entity$Observation$$getObservationFirst$($params$$, $callback$$, $entScope$$) {
  $params$$ = $params$$ || {};
  $params$$.temporal = {operator:"TEquals", on:"resultTime", operand:"TimeInstant", timeEvent:"getFirst"};
  return this.getObservation($params$$, $callback$$, SOS.Const.Events.SOS_FIRST_OBSERVATION_AVAILABLE, $entScope$$);
};
SOS.entity.Observation.prototype.getObservationLatest = function $SOS$entity$Observation$$getObservationLatest$($params$$, $callback$$, $entScope$$) {
  $params$$ = $params$$ || {};
  $params$$.temporal = {operator:"TEquals", on:"resultTime", operand:"TimeInstant", timeEvent:"latest"};
  return this.getObservation($params$$, $callback$$, SOS.Const.Events.SOS_LATEST_OBSERVATION_AVAILABLE, $entScope$$);
};
SOS.entity.Observation.prototype.getObservationFromTo = function $SOS$entity$Observation$$getObservationFromTo$($params$$, $callback$$, $entScope$$) {
  $params$$ = $params$$ || {};
  $params$$.temporal && SOS.Utils.extend($params$$.temporal, {operator:"During", on:"resultTime", operand:"TimePeriod"});
  return this.getObservation($params$$, $callback$$, SOS.Const.Events.SOS_OBSERVATION_AVAILABLE, $entScope$$);
};
SOS.entity.Observation.prototype.getFeatureOfInterest = function $SOS$entity$Observation$$getFeatureOfInterest$($opts$$) {
  $opts$$ = $opts$$ || {foisIndex:0, featuresIndex:0};
  return _ent.data.fois[$opts$$.foisIndex].features[$opts$$.featuresIndex];
};
SOS.entity.Observation.prototype._sortObservations = function $SOS$entity$Observation$$_sortObservations$($a$$, $b$$) {
  var $ret$$ = 0, $aTimeInstant$$ = $a$$.oM_Observation.resultTime.timeInstant || $a$$.oM_Observation.phenomenonTime.timeInstant, $bTimeInstant$$ = $b$$.oM_Observation.resultTime.timeInstant || $b$$.oM_Observation.phenomenonTime.timeInstant;
  $aTimeInstant$$.timePosition < $bTimeInstant$$.timePosition ? $ret$$ = -1 : $aTimeInstant$$.timePosition > $bTimeInstant$$.timePosition && ($ret$$ = 1);
  return $ret$$;
};
SOS.entity.Observation.prototype.bindSourceXML = function $SOS$entity$Observation$$bindSourceXML$() {
  var $_ent$$ = this, $xmlSource$$ = new SOS.source.XML({required:[]});
  $xmlSource$$.write = function $$xmlSource$$$write$($params$$) {
    this.__proto__.write($params$$, "offering procedure observedProperty featureOfInterest temporal spatial responseFormat".split(" "));
    var $filterNodes$$ = {offering:"<sos:offering>filter</sos:offering> ", procedure:"<sos:procedure>filter</sos:procedure> ", observedProperty:"<sos:observedProperty>filter</sos:observedProperty> ", featureOfInterest:"<sos:featureOfInterest>filter</sos:featureOfInterest> "}, $getFilterNodes$$ = function $$getFilterNodes$$$($filterNodeType$$, $filters$$) {
      for (var $i$$ = 0;$i$$ < $filters$$.length;$i$$++) {
        $getRequest$$ += $filterNodes$$[$filterNodeType$$].replace(/filter/g, $filters$$[$i$$]);
      }
    }, $getRequest$$ = '<?xml version="1.0" encoding="UTF-8"?> <sos:GetObservation xmlns:sos="http://www.opengis.net/sos/2.0" xmlns:fes="http://www.opengis.net/fes/2.0" xmlns:gml="http://www.opengis.net/gml/3.2" xmlns:swe="http://www.opengis.net/swe/2.0" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:swes="http://www.opengis.net/swes/2.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" service="SOS" version="2.0.0" xsi:schemaLocation="http://www.opengis.net/sos/2.0 http://schemas.opengis.net/sos/2.0/sos.xsd"> ';
    $params$$.procedure && $getFilterNodes$$("procedure", $params$$.procedure instanceof Array ? $params$$.procedure : [$params$$.procedure]);
    $params$$.offering && $getFilterNodes$$("offering", $params$$.offering instanceof Array ? $params$$.offering : [$params$$.offering]);
    $params$$.observedProperty && $getFilterNodes$$("observedProperty", $params$$.observedProperty instanceof Array ? $params$$.observedProperty : [$params$$.observedProperty]);
    if ($params$$.temporal && $params$$.temporal.operator && $params$$.temporal.on && ($params$$.temporal.start && $params$$.temporal.end || $params$$.temporal.timeEvent)) {
      var $formatRequestTimeString$$ = function $$formatRequestTimeString$$$($D$$) {
        var $newDate$$ = new Date($D$$.getTime() + 6E4 * $D$$.getTimezoneOffset()), $offset$$ = $D$$.getTimezoneOffset() / 60;
        $D$$ = $D$$.getHours();
        $newDate$$.setHours($D$$ - $offset$$);
        return $newDate$$.toISOString().replace(/\.\d+Z$/, "Z");
      };
      if ($params$$.temporal.start && $params$$.temporal.end) {
        var $timeString$$ = SOS.Utils.isoToTimeInterval($params$$.temporal.start, $params$$.temporal.end), $timeString$$ = SOS.Utils.adjustTimeInterval($timeString$$, -1, 1)
      }
      $getRequest$$ += "<sos:temporalFilter> <fes:" + $params$$.temporal.operator + "> <fes:ValueReference>" + $params$$.temporal.on + "</fes:ValueReference> <gml:" + $params$$.temporal.operand + ' gml:id="tp_1"> ';
      switch($params$$.temporal.operand) {
        case "TimePeriod":
          $getRequest$$ += "<gml:beginPosition>" + ($timeString$$ && $formatRequestTimeString$$($timeString$$.start) || "") + "</gml:beginPosition> ";
          $getRequest$$ += "<gml:endPosition>" + ($timeString$$ && $formatRequestTimeString$$($timeString$$.end) || "") + "</gml:endPosition> ";
          break;
        case "TimeInstant":
          $params$$.temporal.timeEvent instanceof Date ? ($timeString$$ = SOS.Utils.isoToTimeInterval($params$$.temporal.timeEvent), $getRequest$$ += "<gml:timePosition>" + ($timeString$$ && $formatRequestTimeString$$($params$$.temporal.timeEvent) || "") + "</gml:timePosition> ") : $getRequest$$ += "<gml:timePosition>" + $params$$.temporal.timeEvent + "</gml:timePosition> ";
      }
      $getRequest$$ += "</gml:" + $params$$.temporal.operand + "> </fes:" + $params$$.temporal.operator + "> </sos:temporalFilter>";
    }
    $params$$.featureOfInterest && $getFilterNodes$$("featureOfInterest", $params$$.featureOfInterest instanceof Array ? $params$$.featureOfInterest : [$params$$.featureOfInterest]);
    $params$$.spatial && $params$$.spatial.srs && $params$$.spatial.lowerCorner && 1 < $params$$.spatial.lowerCorner.length && $params$$.spatial.upperCorner && 1 < $params$$.spatial.upperCorner.length && ($getRequest$$ += "<sos:spatialFilter> <fes:BBOX> <fes:ValueReference>" + $_ent$$.valueReference + '</fes:ValueReference> <gml:Envelope srsName="' + (0 > $params$$.spatial.srs.toString().indexOf("/") ? "http://www.opengis.net/def/crs/EPSG/0/" + $params$$.spatial.srs.toString() + '"' : $params$$.spatial.srs) + 
    "> <gml:lowerCorner>" + $params$$.spatial.lowerCorner[0] + " " + $params$$.spatial.lowerCorner[1] + "</gml:lowerCorner> <gml:upperCorner>" + $params$$.spatial.upperCorner[0] + " " + $params$$.spatial.upperCorner[1] + "</gml:upperCorner> </gml:Envelope> </fes:BBOX> </sos:spatialFilter> ");
    $params$$.responseFormat && ($getRequest$$ += "<sos:responseFormat>" + $params$$.responseFormat + "</sos:responseFormat>");
    return $getRequest$$ += "</sos:GetObservation> ";
  };
  return $xmlSource$$;
};
SOS.entity.Observation.prototype.bindSourceJSON = function $SOS$entity$Observation$$bindSourceJSON$() {
  var $_ent$$ = this;
  (new SOS.source.JSON).write = function $SOS$source$JSON$write$() {
    var $data$$ = {request:"GetObservation", service:"SOS", version:"2.0.0"};
    params.procedures && ($data$$.procedure = params.procedures instanceof Array ? params.procedures : [params.procedures]);
    params.offering && ($data$$.offering = params.offering instanceof Array ? params.offering : [params.offering]);
    params.observedProperties && ($data$$.observedProperty = params.observedProperties instanceof Array ? params.observedProperties : [params.observedProperties]);
    params.featuresOfInterest && ($data$$.featureOfInterest = params.featuresOfInterest instanceof Array ? params.featuresOfInterest : [params.featuresOfInterest]);
    params.spatial && params.spatial.geomType && params.spatial.coordinates && ($data$$.spatialFilter = {bbox:{ref:$_ent$$._spatialShapeProperty, value:{type:params.spatial.geomType, coordinates:params.spatial.coordinates}}});
    if (params.temporal && params.temporal.operator && params.temporal.on && (params.temporal.start && params.temporal.end || params.temporal.timeEvent)) {
      if (params.temporal.start && params.temporal.end) {
        var $timeString$$ = SOS.Utils.isoToTimeInterval(params.temporalFilter.start, params.temporalFilter.end), $timeString$$ = SOS.Utils.adjustTimeInterval($timeString$$, -1, 1)
      }
      $data$$.temporalFilter = {};
      $data$$.temporalFilter[params.temporal.operator] = {ref:arams.temporalFilter.on};
      $data$$.temporalFilter[params.temporal.operator].value = params.temporal.start && params.temporal.end && $timeString$$ ? [$timeString$$.start.toISOString().replace(/\.\d+Z$/, "Z"), $timeString$$.end.toISOString().replace(/\.\d+Z$/, "Z")] : params.temporal.timeEvent;
    }
    return this.__proto__.write($data$$);
  };
};
SOS.entity.ObservationRecord = function $SOS$entity$ObservationRecord$($options$$) {
  this.entityName = "ObservationRecord";
  $options$$.oM_Observation && ($options$$ = $options$$.oM_Observation);
  this.id = $options$$["@id"] || $options$$.id;
  this.featuresOfInterest = [];
  if ($options$$.featureOfInterest instanceof Array) {
    for (var $converter$$2_i$$ = 0;$converter$$2_i$$ < $options$$.featureOfInterest.length;$converter$$2_i$$++) {
      this.featuresOfInterest.push({id:$options$$.featureOfInterest[$converter$$2_i$$]["@href"] || $options$$.featureOfInterest[$converter$$2_i$$].id, name:$options$$.featureOfInterest[$converter$$2_i$$]["@title"] || $options$$.featureOfInterest[$converter$$2_i$$].name});
    }
  } else {
    this.featuresOfInterest.push({id:$options$$.featureOfInterest["@href"] || $options$$.featureOfInterest.id, name:$options$$.featureOfInterest["@title"] || $options$$.featureOfInterest.name});
  }
  this.observedProperty = [];
  if ($options$$.observedProperty instanceof Array) {
    for ($converter$$2_i$$ = 0;$converter$$2_i$$ < $options$$.observedProperty.length;$converter$$2_i$$++) {
      this.observedProperty.push($options$$.observedProperty[$converter$$2_i$$]["@href"] || $options$$.observedProperty[$converter$$2_i$$]);
    }
  } else {
    this.observedProperty.push($options$$.observedProperty["@href"] || $options$$.observedProperty);
  }
  var $allowedCvtr$$1_newDate$$ = function $$allowedCvtr$$1_newDate$$$($D$$4_hours$$) {
    $D$$4_hours$$ = new Date($D$$4_hours$$);
    var $newDate$$ = new Date($D$$4_hours$$.getTime() + 6E4 * $D$$4_hours$$.getTimezoneOffset()), $offset$$ = $D$$4_hours$$.getTimezoneOffset() / 60;
    $D$$4_hours$$ = $D$$4_hours$$.getHours();
    $newDate$$.setHours($D$$4_hours$$ + $offset$$);
    return $newDate$$;
  };
  $options$$.phenomenonTime.timeInstant ? this.time = $allowedCvtr$$1_newDate$$($options$$.phenomenonTime.timeInstant.timePosition) : $options$$.phenomenonTime.timePeriod ? this.time = [$allowedCvtr$$1_newDate$$($options$$.phenomenonTime.timePeriod.beginPosition), $allowedCvtr$$1_newDate$$($options$$.phenomenonTime.timePeriod.endPosition)] : $options$$.time && (this.time = $options$$.time);
  this.procedure = [];
  if ($options$$.procedure instanceof Array) {
    for ($converter$$2_i$$ = 0;$converter$$2_i$$ < $options$$.procedure.length;$converter$$2_i$$++) {
      this.procedure.push($options$$.procedure[$converter$$2_i$$]["@href"] || $options$$.procedure[$converter$$2_i$$]);
    }
  } else {
    this.procedure.push($options$$.procedure["@href"] || $options$$.procedure);
  }
  this.type = $options$$.type && $options$$.type["@href"] ? $options$$.type["@href"] : $options$$.type;
  if ($options$$.result) {
    if ($allowedCvtr$$1_newDate$$ = [], $converter$$2_i$$ = new SOS.Utils.Converter.DataTypeConverter, $allowedCvtr$$1_newDate$$.push($converter$$2_i$$.createConverter(SOS.Utils.Converter.Types.FLOAT)), $allowedCvtr$$1_newDate$$.push($converter$$2_i$$.createConverter(SOS.Utils.Converter.Types.INT)), $options$$.result["@type"]) {
      switch($options$$.result["@type"].split(":").pop().toLowerCase()) {
        case "referencetype":
          this.result = {type:$options$$.result["@title"], uom:"", value:""};
          break;
        case "boolean":
          this.result = {uom:$options$$.result["@uom"] || "", value:"true" == $options$$.result["#text"]};
          break;
        case "integer":
          this.result = {uom:$options$$.result["@uom"] || "", value:parseInt($options$$.result["#text"])};
          break;
        case "string":
          this.result = {uom:$options$$.result["@uom"] || "", value:$options$$.result["#text"]};
          break;
        case "measuretype":
          var $val$$ = $options$$.result["#text"];
          this.result = {uom:$options$$.result["@uom"], value:$val$$};
          for ($converter$$2_i$$ = 0;$converter$$2_i$$ < $allowedCvtr$$1_newDate$$.length;$converter$$2_i$$++) {
            if ($allowedCvtr$$1_newDate$$[$converter$$2_i$$].is($val$$)) {
              $val$$ = $allowedCvtr$$1_newDate$$[$converter$$2_i$$].convert($val$$);
              this.result.value = $val$$;
              break;
            }
          }
        ;
      }
    } else {
      this.result = {type:$options$$.result.type, uom:$options$$.result.uom, value:$options$$.result.value};
    }
  }
};

