define(['vendor/jquery', 'vendor/underscore', 'city-architect'], function ($, _, cityArchitect) {

      return {
        loadCity: function (cityId) {
          $.get('http://source-city.herokuapp.com/api/metrics/' + cityId)
            .done(function (data) {
              var cityData = _(data.fileMetrics).map(function (metric) {
                return {
                  foundations: metric.dependencies * 5,
                  height: metric.loc,
                  label: metric.label
                };
              });
              cityArchitect.buildCity(cityData);
            });
        }
      }
    }
