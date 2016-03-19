requirejs.config({
  baseUrl: 'js',
  urlArgs: 'ts=' + (new Date()).getTime(),
  shim: {
    'vendor/three': {
      exports: 'THREE'
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

  $.get('http://source-city.herokuapp.com/api/metrics')
    .done(function(data){
    
      var cityData = _(data).map(function (fileMetrics) {
        return {
          foundations : fileMetrics.metrics.dependencies,
          height : fileMetrics.metrics.loc
        };
      });
      var city = cityArchitect.buildCity(cityData);
      document.body.appendChild(city);
    });

});
