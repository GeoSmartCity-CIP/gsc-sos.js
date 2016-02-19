
/// <reference path="../../node_modules/grunt-contrib-jasmine/tasks/lib/jasmine.js" />
/// <reference path="../../node_modules/jasmine-ajax/lib/mock-ajax.js" />

describe("Capabilities", function () {
    var caps;
    var url = 'http://pmplrenta03:8080/52n-sos-webapp/service';
    beforeEach(function () {
        jasmine.Ajax.install();
    });

    afterEach(function () {
        jasmine.Ajax.uninstall();
    });

    describe("#exceptions", function () {
        it("should throw an exception if capabilities not instance via new", function () {
            expect(function () {
                SOS.entity.Capabilities({ url: url });
            }).toThrowError('Error ' + 'Capabilities' + ' ' + SOS.Const.ErrorText.SOS_VIA_NEW);
        });

        it("should throw an exception if capabilities instantiated without url", function () {
            expect(function () {
                new SOS.entity.Capabilities();
            }).toThrowError(SOS.Const.ErrorText.SOS_URL_MISSING);
        });
    });

    describe("#getCapabilities", function () {

        it("should be able to get capabilities", function () {
            if (SOS.Capabilities)
                delete SOS.Capabilities[url];

            var doneFn = jasmine.createSpy('success');
            jasmine.Ajax.withMock(function () {
                caps = new SOS.entity.Capabilities({ url: url });

                caps.getCapabilities().then(function (data) {
                    doneFn(data);
                });

                var mostRecent = jasmine.Ajax.requests.mostRecent();
                if (mostRecent)
                    mostRecent.respondWith(mock.caps.response);

                expect(SOS.Capabilities[caps.sos.url]).toEqual(mock.caps.json);
            });
        });

        it("should be save caps data on SOS.Capabilities", function () {
            if (SOS.Capabilities)
                delete SOS.Capabilities[url];

            var doneFn = jasmine.createSpy('success');
            jasmine.Ajax.withMock(function () {
                caps = new SOS.entity.Capabilities({ url: url });

                caps.getCapabilities().then(function (data) {
                    doneFn(data);
                });

                var mostRecent = jasmine.Ajax.requests.mostRecent();
                if (mostRecent)
                    mostRecent.respondWith(mock.caps.response);

                expect(SOS.Capabilities[caps.sos.url] != null).toBeTruthy();
            });
        });

        it("should be valid capabilities", function () {

            if (SOS.Capabilities)
                delete SOS.Capabilities[url];

            var doneFn = jasmine.createSpy('success');
            jasmine.Ajax.withMock(function () {
                caps = new SOS.entity.Capabilities({ url: url });

                caps.getCapabilities().then(function (data) {
                    doneFn(data);
                });

                var mostRecent = jasmine.Ajax.requests.mostRecent();
                if (mostRecent)
                    mostRecent.respondWith(mock.caps.response);

                expect(SOS.Capabilities[caps.sos.url].operationsMetadata != null &&
                   SOS.Capabilities[caps.sos.url].filterCapabilities != null &&
                   SOS.Capabilities[caps.sos.url].serviceIdentification != null &&
                   SOS.Capabilities[caps.sos.url].serviceProvider).toBeTruthy();
            });
        });
    });
});