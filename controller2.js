var mapsApp = angular.module('mapsApp', []);
mapsApp.controller('mapsController', function ($scope){


  $scope.markers = [];
  $scope.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    //geographical center of the US
    center: new google.maps.LatLng(40.0000, -98.0000)
  });
  var infowindow = new google.maps.InfoWindow;

	function createMarker (city){
		var latLon = city.latLon.split(',');
		var lat = latLon[0];
		var lon = latLon[1];
		var marker = new google.maps.Marker(
    {
			map: $scope.map,
			position: new google.maps.LatLng(lat, lon),
			title: city.city,
      animation: google.maps.Animation.DROP,
		});

    var contentString = '<div class="city-content">'+
      '<h2>'+city.city+'</h2>'+
      '<div class="city-info">Total Population: ' + city.yearEstimate + '</div>' +
      '<div class="city-info">2010 Census: ' + city.lastCensus + '</div>' +
      '<div class="city-info">Population Change %: ' + city.change + '</div>' +
      '<div class="city-info">State: ' + city.state + '</div>' +
      '<div class="city-info">Land Area: ' + city.landArea + '</div>' +
    '</div>';

    marker.addListener('click', function() {
      infowindow.setContent(contentString);
      infowindow.open($scope.map, marker);
    });

    $scope.markers.push(marker);
	}

  $scope.cityClick = function(i){
    google.maps.event.trigger($scope.markers[i],'click');
  }

  $scope.cities = cities;
	for(i = 0; i< cities.length; i++){
		createMarker(cities[i])
	}

});


mapsApp.config(funciotn(){
  .when('/')
}


