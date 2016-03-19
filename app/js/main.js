requirejs.config({
  baseUrl: 'js',
  urlArgs: 'ts=' + (new Date()).getTime(),
  shim: {
    'vendor/three': {
      exports: 'THREE'
    },
    'vendor/FlyControls': {
      deps: ['vendor/three'],
      exports: 'THREE.FlyControls'
    },
    'vendor/underscore': {
      exports: '_'
    },
    'vendor/jquery': {
      exports: '$'
    }
  }
});

require(['city-architect', 'vendor/jquery', 'vendor/underscore'], function (cityArchitect, $, _) {
  
//  var data = [
//    {
//      label: 'com.bla.BlaBla',
//      metrics: {
//        loc: 100,
//        dependencies: 7
//      }
//    }
//  ];

  $.get('http://source-city.herokuapp.com/api/metrics/aHR0cHM6Ly9naXRodWIuY29tL3NvdXJjZS1jaXR5L2JhY2tlbmQuZ2l0')
    .done(function(data){
      var cityData = _(data.fileMetrics).map(function (metric) {
        return {
          foundations : metric.dependencies,
          height : metric.loc
        };
      });
      cityArchitect.buildCity(cityData);
    });

});
