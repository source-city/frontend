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

require(['city-list', 'city-viewer'], function (cityList, cityViewer) {

  var hash = window.location.hash;
  var cityId = /#\/city\/(.+)/;
  
  if(cityId.test(hash)){
    cityViewer.loadCity(cityId.group(1));
  } else {
    cityList.loadCities();
  }
  
});
