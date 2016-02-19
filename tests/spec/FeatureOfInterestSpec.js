describe("FeatureOfInterest", function () {
    var caps;

    describe("#exceptions", function () {
        it("should throw an exception if featureOfInterest not instance via new", function () {
            expect(function () {
                SOS.entity.FeatureOfInterest({ url: 'http://pmplrenta03:8080/52n-sos-webapp/service' });
            }).toThrowError('Error ' + 'FeatureOfInterest' + ' ' + SOS.Const.ErrorText.SOS_VIA_NEW);
        });

        it("should throw an exception if featureOfInterest instantiated without url", function () {
            expect(function () {
                new SOS.entity.FeatureOfInterest();
            }).toThrowError(SOS.Const.ErrorText.SOS_URL_MISSING);
        });
    });

    beforeEach(function () {
        jasmine.Ajax.install();
    });

    beforeAll(function () {
        var doneFn = jasmine.createSpy('success');
        jasmine.Ajax.withMock(function () {
            caps = new SOS.entity.Capabilities({ url: 'http://pmplrenta03:8080/52n-sos-webapp/service' });

            caps.getCapabilities().then(function (data) {
                doneFn(data);
            });

            var mostRecent = jasmine.Ajax.requests.mostRecent();
            if (mostRecent)
                mostRecent.respondWith(mock.caps.response);
        });
    });

    afterEach(function () {
        jasmine.Ajax.uninstall();
    });

    describe("#featureOfInterest by procedure", function () {
        it("should throw an exception if unknown parameter", function () {
            expect(function () {
                caps.sos.foiFormatter.getFeatureOfInterest({ procedures: '' }).then(function (data) { });
            }).toThrowError(SOS.Const.ErrorText.XML.UNKNOWN_PARAM + ': ' + 'procedures');
        });

        it("should not throw an exception with procedure parameter", function () {
            expect(function () {
                caps.sos.foiFormatter.getFeatureOfInterest({ procedure: 'procedure' }).then(function (data) { });
            }).not.toThrow();
        });

        it("should be able to get allowed procedures to filter featureOfInterest", function () {

            caps.sos.foiFormatter.getOnCapAllowedProcedures().then(function (procs) {
                procs = procs || [];
                expect(procs.length).toBeGreaterThan(0);
            });
        });

        it("should be able to get featureOfInterest by procedure", function () {
            var doneFn = jasmine.createSpy('success');
            caps.sos.foiFormatter.getOnCapAllowedProcedures().then(function (procs) {
                procs = procs || [];

                jasmine.Ajax.withMock(function () {
                    caps.sos.foiFormatter.getFeatureOfInterest({ procedure: procs[6] }).then(function (data) {
                        doneFn(data);
                    });

                    jasmine.Ajax.requests.mostRecent().respondWith(mock.foi.response);

                    expect(caps.sos.foiFormatter.allowedFOIs).toEqual([new SOS.entity.FeatureOfInterestRecord(mock.foi.json)]);
                });
            });
        });
    });

    describe("#featureOfInterest by observedProperty", function () {
        it("should throw an exception if unknown parameter", function () {
            expect(function () {
                caps.sos.foiFormatter.getFeatureOfInterest({ observedProperties: '' }).then(function (data) { });
            }).toThrowError(SOS.Const.ErrorText.XML.UNKNOWN_PARAM + ': ' + 'observedProperties');
        });

        it("should not throw an exception with observedProperty parameter", function () {
            expect(function () {
                caps.sos.foiFormatter.getFeatureOfInterest({ observedProperty: 'observedProperty' }).then(function (data) { });
            }).not.toThrow();
        });

        it("should be able to get allowed observedProperty to filter featureOfInterest", function () {

            caps.sos.foiFormatter.getOnCapAllowedObservedProperty().then(function (obs) {
                obs = obs || [];
                expect(obs.length).toBeGreaterThan(0);
            });
        });

        it("should be able to get featureOfInterest by observedProperty", function () {
            var doneFn = jasmine.createSpy('success');
            caps.sos.foiFormatter.getOnCapAllowedObservedProperty().then(function (obs) {
                obs = obs || [];

                jasmine.Ajax.withMock(function () {
                    caps.sos.foiFormatter.getFeatureOfInterest({ observedProperty: obs[1] }).then(function (data) {
                        doneFn(data);
                    });

                    jasmine.Ajax.requests.mostRecent().respondWith(mock.foi.response);

                    expect(caps.sos.foiFormatter.allowedFOIs).toEqual([new SOS.entity.FeatureOfInterestRecord(mock.foi.json)]);
                });
            });
        });
    });

    describe("#featureOfInterest by featureOfInterest", function () {
        it("should throw an exception if unknown parameter", function () {
            expect(function () {
                caps.sos.foiFormatter.getFeatureOfInterest({ featuresOfInterest: '' }).then(function (data) { });
            }).toThrowError(SOS.Const.ErrorText.XML.UNKNOWN_PARAM + ': ' + 'featuresOfInterest');
        });

        it("should not throw an exception with featureOfInterest parameter", function () {
            expect(function () {
                caps.sos.foiFormatter.getFeatureOfInterest({ featureOfInterest: 'featureOfInterest' }).then(function (data) { });
            }).not.toThrow();
        });

        it("should be able to get allowed featureOfInterest to filter featureOfInterest", function () {

            caps.sos.foiFormatter.getOnCapAllowedIDFeaturesOfInterest().then(function (fois) {
                fois = fois || [];
                expect(fois.length).toBeGreaterThan(0);
            });
        });

        it("should be able to get featureOfInterest by featureOfInterest", function () {
            var doneFn = jasmine.createSpy('success');
            caps.sos.foiFormatter.getOnCapAllowedIDFeaturesOfInterest().then(function (fois) {
                fois = fois || [];

                jasmine.Ajax.withMock(function () {
                    caps.sos.foiFormatter.getFeatureOfInterest({ featureOfInterest: fois[6] }).then(function (data) {
                        doneFn(data);
                    });

                    jasmine.Ajax.requests.mostRecent().respondWith(mock.foi.response);

                    expect(caps.sos.foiFormatter.allowedFOIs).toEqual([new SOS.entity.FeatureOfInterestRecord(mock.foi.json)]);
                });
            });
        });
    });

    describe("#featureOfInterest by spatial filter", function () {
        it("should throw an exception if unknown parameter", function () {
            expect(function () {
                caps.sos.foiFormatter.getFeatureOfInterest({
                    spatialFilter: {
                        srs: 4326,
                        lowerCorner: [-180, -90],
                        upperCorner: [180, 90]
                    }
                }).then(function (data) { });
            }).toThrowError(SOS.Const.ErrorText.XML.UNKNOWN_PARAM + ': ' + 'spatialFilter');
        });

        it("should throw an exception with spatial incorrect filter", function () {
            expect(function () {
                caps.sos.foiFormatter.getFeatureOfInterest({ spatial: {} }).then(function (data) { });
            }).toThrowError(SOS.Const.ErrorText.XML.WRONG_PARAM);
        });

        it("should not throw an exception with spatial parameter", function () {
            expect(function () {
                caps.sos.foiFormatter.getFeatureOfInterest({
                    spatial: {
                        srs: 1234,
                        lowerCorner: [-180, -90],
                        upperCorner: [180, 90]
                    }
                }).then(function (data) { });
            }).not.toThrow();
        });

        it("should be able to get featureOfInterest by spatial filter", function () {
            var doneFn = jasmine.createSpy('success');

            jasmine.Ajax.withMock(function () {
                caps.sos.foiFormatter.getFeatureOfInterest({
                    spatial: {
                        srs: 4326,
                        lowerCorner: [-180, -90],
                        upperCorner: [180, 90]
                    }
                }).then(function (data) {
                    doneFn(data);
                });

                jasmine.Ajax.requests.mostRecent().respondWith(mock.foi.response);

                expect(caps.sos.foiFormatter.allowedFOIs).toEqual([new SOS.entity.FeatureOfInterestRecord(mock.foi.json)]);
            });
        });
    });
});