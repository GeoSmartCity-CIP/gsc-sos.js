

module.exports = function (grunt) {    
    grunt.initConfig({
        jasmine: {
            customTemplate: {
                src: ['../../tests/spec/mock/mock.js',
                '../../src/js/lib/XML/XML_XTree.js',
                '../../src/js/SOS/SOS.js',
                '../../src/js/SOS/utility/Util.js',
                '../../src/js/SOS/utility/Proxy.js',
                '../../src/js/SOS/utility/Promise.js',
                '../../src/js/SOS/utility/Events.js',
                '../../src/js/SOS/utility/Request.js',
                '../../src/js/SOS/Source/Source.js',
                '../../src/js/SOS/Source/XML/SourceXML.js',
                '../../src/js/SOS/Source/JSON/SourceJSON.js',
                '../../src/js/SOS/Entity/Offering.js',
                '../../src/js/SOS/Method/Method.js',
                '../../src/js/SOS/Entity/Entity.js',
                '../../src/js/SOS/Entity/Entities/Capabilities.js',
                '../../src/js/SOS/Entity/Entities/DescribeSensor.js',
                '../../src/js/SOS/Entity/Entities/FeatureOfInterest.js',
                '../../src/js/SOS/Entity/Entities/FeatureOfInterestRecord.js',
                '../../src/js/SOS/Entity/Entities/Observation.js',
                '../../src/js/SOS/Entity/Entities/ObservationRecord.js'],
                options: {
                    specs: '../../tests/spec/*Spec.js',
                    vendor: [
                      "../../tests/lib/mock-ajax.js"
                    ]
                }
            }
        },
        'closure-compiler': {
            frontend: {
                closurePath: '../clousureCompiler',
                js: [
                    '../../src/js/lib/XML/XML_XTree.js',
                    '../../src/js/SOS/SOS.js',
                    '../../src/js/SOS/utility/Util.js',
                    '../../src/js/SOS/utility/Proxy.js',
                    '../../src/js/SOS/utility/Promise.js',
                    '../../src/js/SOS/utility/Events.js',
                    '../../src/js/SOS/utility/Request.js',
                    '../../src/js/SOS/Source/Source.js',
                    '../../src/js/SOS/Source/XML/SourceXML.js',
                    '../../src/js/SOS/Source/JSON/SourceJSON.js',
                    '../../src/js/SOS/Entity/Offering.js',
                    '../../src/js/SOS/Method/Method.js',
                    '../../src/js/SOS/Entity/Entity.js',
                    '../../src/js/SOS/Entity/Entities/Capabilities.js',
                    '../../src/js/SOS/Entity/Entities/DescribeSensor.js',
                    '../../src/js/SOS/Entity/Entities/FeatureOfInterest.js',
                    '../../src/js/SOS/Entity/Entities/FeatureOfInterestRecord.js',
                    '../../src/js/SOS/Entity/Entities/Observation.js',
                    '../../src/js/SOS/Entity/Entities/ObservationRecord.js'
                ],
                jsOutputFile: '../../src/gsc-sos/gsc-sos.min.js',
                maxBuffer: 500,
                //options: {
                //    debug: true,
                //	  formatting: 'PRETTY_PRINT'
                //}
                options: {
                    compilation_level: 'SIMPLE_OPTIMIZATIONS'
                }
            }
        },        
        pkg: grunt.file.readJSON('package.json'),        
        yuidoc: {
            all: {                
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {                  
                    paths: ['../../src/js/SOS'],                    
                    outdir: './docs/'
                }
            }
        }
    });

    grunt.log.write("run gruntJS");

    grunt.registerTask('default', function () {

        grunt.loadNpmTasks('grunt-contrib-jasmine');
        grunt.log.write("run  jasmine");
        grunt.task.run('jasmine');

        grunt.loadNpmTasks('grunt-contrib-yuidoc');
        grunt.log.write("run yuidoc");
        grunt.task.run('yuidoc');

    });

    grunt.loadNpmTasks('grunt-closure-compiler');
    grunt.log.write("run closure");
    grunt.task.run('closure-compiler');

};