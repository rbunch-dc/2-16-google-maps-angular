
mapApp.controller("cityController", function($scope, $http, $routeParams, cityService){

	//Get the city we are on out of the routesparam
	cityIndex = $routeParams.cityIndex;
	$scope.cities = cities;
	var checkedPlaces = [];
	$scope.places = places;
	$scope.markers = [];

	//Remove the zoom click function and run it as a base part of the controller
	//We are already here!
	var latLon = cities[cityIndex].latLon.split(',');
	var lat = latLon[0];
	var lon = latLon[1];
	var center = new google.maps.LatLng(lat, lon);
	
	storedMap = cityService.get();
	console.log(storedMap);
	if(storedMap === 'noMap'){
		$scope.map = new google.maps.Map(document.getElementById('city-map'), {
			center: center,
			zoom: 10
		});		
		cityService.set($scope.map);
	}else{
		$scope.map = storedMap;
		$scope.map.setCenter(center);
		$scope.map.setZoom(10);    		
	}

    var service = new google.maps.places.PlacesService($scope.map);
    service.nearbySearch({
		location: center,
		radius: 5000,
		type: 'lodging'
	}, callback);
          
	function callback(results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			for (var i = 0; i < results.length; i++) {
				createMarker(results[i]);
			}
		}
	}
     function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          position: placeLoc,
          map: $scope.map,
          title: place.city,
          animation: google.maps.Animation.DROP
        });
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open($scope.map, this);
        });
      }
});

