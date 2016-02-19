describe("DescribeSensor", function () {
    var caps;

    describe("#exceptions", function () {
        it("should throw an exception if describeSensor not instance via new", function () {
            expect(function () {
                SOS.entity.DescribeSensor({ url: 'http://pmplrenta03:8080/52n-sos-webapp/service' });
            }).toThrowError('Error ' + 'DescribeSensor' + ' ' + SOS.Const.ErrorText.SOS_VIA_NEW);
        });

        it("should throw an exception if describeSensor instantiated without url", function () {
            expect(function () {
                new SOS.entity.DescribeSensor();
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

    describe("#describeSensor", function () {
        it("should throw an exception if unknown parameter", function () {
            expect(function () {
                caps.sos.sensorDescFormatter.getDescribeSensor({ procedure: 'procedure' }).then(function (data) { });
            }).toThrowError(SOS.Const.ErrorText.XML.UNKNOWN_PARAM + ': ' + 'procedure');
        });

        it("should throw an exception if unknown parameter", function () {
            expect(function () {
                caps.sos.sensorDescFormatter.getDescribeSensor({ procDescriptionFormat: 'procDescriptionFormat' }).then(function (data) { });
            }).toThrowError(SOS.Const.ErrorText.XML.UNKNOWN_PARAM + ': ' + 'procDescriptionFormat');
        });

        it("should not throw an exception with procedure parameter", function () {
            expect(function () {
                caps.sos.sensorDescFormatter.getDescribeSensor({ idProcedure: 'idProcedure' }).then(function (data) { });
            }).not.toThrow();
        });

        it("should not throw an exception with procedureDescriptionFormat parameter", function () {
            expect(function () {
                caps.sos.sensorDescFormatter.getDescribeSensor({ procedureDescriptionFormat: 'procedureDescriptionFormat' }).then(function (data) { });
            }).not.toThrow();
        });

        it("should be able to get allowed procedures to get describeSensor", function () {

            caps.sos.sensorDescFormatter.getOnCapAllowedProcedures().then(function (procs) {
                procs = procs || [];
                expect(procs.length).toBeGreaterThan(0);
            });
        });

        it("should be able to get describeSensor by procedure", function () {
            var doneFn = jasmine.createSpy('success');
            caps.sos.sensorDescFormatter.getOnCapAllowedProcedures().then(function (procs) {
                procs = procs || [];

                jasmine.Ajax.withMock(function () {
                    caps.sos.sensorDescFormatter.getDescribeSensor({ idProcedure: procs[1] }).then(function (data) {
                        doneFn(data);
                    });

                    jasmine.Ajax.requests.mostRecent().respondWith(mock.sensor.response);

                    if (caps.sos.sensorDescFormatter.data == null)
                        expect(caps.sos.sensorDescFormatter.data).toBeNull();
                    else
                        expect(caps.sos.sensorDescFormatter.data).toEqual(mock.sensor.json);
                });
            });
        });
    });    
});