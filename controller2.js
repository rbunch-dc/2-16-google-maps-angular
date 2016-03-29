var mapsApp = angular.module('mapsApp', []);
mapsApp.controller('mapsController', function ($scope){

       $scope.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          //geographical center of the US
          center: new google.maps.LatLng(40.0000, -98.0000)
        });


	function createMarker (city){
		var latLon = city.latLon.split(',');
		var lat = latLon[0];
		var lon = latLon[1];
		var marker = new google.maps.Marker({
			map: $scope.map,
			position: new google.maps.LatLng(lat, lon),
			title: city.city
		});

        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            'This is some info about ' + city.city +
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        marker.addListener('click', function() {
          infowindow.open($scope.map, marker);
        });
	}

	$scope.cities = cities;
	for(i = 0; i< cities.length; i++){
		createMarker(cities[i])
	}

});



