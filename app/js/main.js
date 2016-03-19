requirejs.config({
    baseUrl : 'js',
    urlArgs : 'ts=' + (new Date()).getTime(),
    shim : {
        'vendor/three' : {
            exports : 'THREE'
        },
        'vendor/TrackballControls' : {
            deps : ['vendor/three'],
            exports : 'THREE.TrackballControls'
        },
        'vendor/underscore' : {
            exports : '_'
        },
        'vendor/jquery' : {
            exports : '$'
        }
    }
});

<<<<<<< HEAD
//require(['city-architect', 'vendor/jquery', 'vendor/underscore'], function (cityArchitect, $, _) {
require(['city-list'], function () {
  
=======
require(['city-architect', 'vendor/jquery', 'vendor/underscore'], function (cityArchitect, $, _) {

>>>>>>> d8cbb16b54da614720e310f72d0fe7d77dc11230
//  var data = [
//    {
//      label: 'com.bla.BlaBla',
//      metrics: {
//        loc: 100,
//        dependencies: 7
//      }
//    }
//  ];

<<<<<<< HEAD
    
  
//  $.get('http://source-city.herokuapp.com/api/metrics/aHR0cHM6Ly9naXRodWIuY29tL3NwcmluZy1wcm9qZWN0cy9zcHJpbmctYm9vdC5naXQ=')
//    .done(function(data){
//      var cityData = _(data.fileMetrics).map(function (metric) {
//        return {
//          foundations : metric.dependencies * 5,
//          height : metric.loc,
//          label: metric.label
//        };
//      });
//      cityArchitect.buildCity(cityData);
//    });
=======
    $.get('http://source-city.herokuapp.com/api/metrics/aHR0cHM6Ly9naXRodWIuY29tL3NwcmluZy1wcm9qZWN0cy9zcHJpbmctYm9vdC5naXQ=')
        .done(function (data) {
            var cityData = _(data.fileMetrics).map(function (metric) {
                return {
                    foundations : metric.dependencies * 5,
                    height : metric.loc,
                    label : metric.label
                };
            });
            cityArchitect.buildCity(cityData);
        });
>>>>>>> d8cbb16b54da614720e310f72d0fe7d77dc11230

});
