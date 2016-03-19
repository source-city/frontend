define(['vendor/jquery', 'vendor/underscore', 'vendor/virtual-dom'], function($, _, virtualDom){
  
  var createElement = virtualDom.create;
  var h = virtualDom.h;
  var diff = virtualDom.diff;
  var patch = virtualDom.patch;
  
  var cityList = [];
  var tree, element;
  
  $('.showNewCity').click(function(){
    $('#newCityModal').show().toggleClass('fade');
  });

  $('.closeCityModal').click(function(){
    $('#newCityModal').toggleClass('fade').hide();
  })

  $('.buildCity').click(function(){
    $.post({
      url: 'http://source-city.herokuapp.com/api/repositories',
      contentType: 'application/json',
      data: JSON.stringify({
        url: $('input.url').val(),
        name: $('input.name').val()
      })
    }).done(function(){
      $('#newCityModal').toggleClass('fade').hide();
    });
  })

  $.get('http://source-city.herokuapp.com/api/repositories')
    .done(function(data){
      cityList = data;
      update(cityList);
      updates();
    });
  
  function updates(){
    var events = new EventSource('http://source-city.herokuapp.com/api/updates');
    events.onmessage = function(ev){
      var progress = JSON.parse(ev.data);
      var city = _(cityList).findWhere({id: progress.id});
      if(city){
        _.extend(city, progress);
      } else {
        console.log('wrong', city);
        console.log(progress.id);
        cityList.push(progress);
      }
      update(cityList);
    }
  }
  
  function update(data){
    
      var newtree = render(data);
    
      if(!tree){
        tree = newtree;
        element = createElement(tree);
        $('#repositories').append(element);
      } else {
        patch(element, diff(tree, newtree));
        tree = newtree;
      }
  }
  
  function render(data){

    return h('div.list-group',
      $.map(data, city)
    );
    
    function city(city){
      return h('a.list-group-item', [
        h('div.row', [
          label(),
          ready(),
          ((city.processed && city.processed !== city.total) ? progress() : actions())
        ])
      ]);
      
      function label(){
        return h('div.col-md-5', [
          h('h4.list-group-item-heading', [ city.name ]),
          h('p.list-group-item-text', [ city.url ])
        ]);
      }
      function ready(){
        
        var status = (city.ready ? 'READY' : 'PENDING');
        if(city.processed){
          status = ((city.processed === city.total) ? 'READY' : 'IN CONSTRUCTION');
        }
        
        return h('div.col-md-3', [
          h('h4.list-group-item-heading.status', [status])
        ]);
      }
      function progress(){
        
        var percentage = (city.processed * 100 / city.total).toFixed(0);
        
        return h('div.col-md-4.actions', [
          h('div.progress', [
            h('div.progress-bar.progress-bar-striped.active', {style: {width: percentage + '%'}})
          ])
        ]);
      }
      function actions(){
        return h('div.col-md-4.actions', [
          h('span.btn.btn-primary', [
            h('i.glyphicon.glyphicon-eye-open'),
            ' Visit this city'
          ])
        ]);
      }
    }
    
  }
  
  
});