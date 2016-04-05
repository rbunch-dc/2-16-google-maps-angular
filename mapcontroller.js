
// create the controller and inject Angular's $scope, as well as our service.
mapApp.controller("mapController", function($scope, $http, $routeParams, cityService){
	console.log($routeParams);
	var checkedPlaces = [];
	$scope.places = places;
	$scope.markers = [];

	$scope.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: new google.maps.LatLng(40.0000, -98.0000)
	 });

	var infowindow = new google.maps.InfoWindow;

  	$scope.createMarker = function (city){
	  	var latLon = city.latLon.split(",");
	  	var lat = latLon[0];
	  	var lon = latLon[1];
		var marker = new google.maps.Marker({
			lat: Number(lat),
			lon: Number(lon),
		    position: new google.maps.LatLng(lat, lon),
		    map: $scope.map,
		    title: city.city,
		    animation: google.maps.Animation.DROP
		});

	    var contentString = '<div id="content">'+
			'<div id="siteNotice">'+
			'</div>'+
			'<h1 id="firstHeading" class="firstHeading">'+city.city+'</h1>'+
			'<div id="bodyContent">'+
			'<p><b>'+city.city+'</b>, <b>'+city.state+'</b></p>'+
			'<p><b>Rank: </b>#'+city.yearRank+'</p>'+
			'<p><b>Population: </b>'+city.lastCensus+'</p>'+
			'<p><b>Population Density: </b>'+city.lastPopDensity+'</p>'+
			'<p><b>Land Area: </b>'+city.landArea+'</p>'+
			'<p><div onclick="dirClick('+lat+','+lon+')" class="get-directions">Get Directions</div></p>'+
			'</div>'+
			'</div>';

	  	marker.addListener('click', function() {
	  		infowindow.setContent(contentString);
	    	infowindow.open($scope.map, marker);
	  	});
	  $scope.markers.push(marker);
	}

	$scope.cityClick = function(i){
		google.maps.event.trigger($scope.markers[i], "click");
	}

	dirClick = function(lat, lon){
		//Swap this out for an ng-show!
		// $scope.hidePanel = true;
		$("#map-panel").addClass("hidden");
		$("#driving-directions").addClass("view-height");

		var directionsService = new google.maps.DirectionsService();
		var directionsDisplay = new google.maps.DirectionsRenderer();
		var map = new google.maps.Map(document.getElementById('map'),{
			zoom: 7,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		directionsDisplay.setMap(map);
		directionsDisplay.setPanel(document.getElementById('map-panel'))
			
		var request = {
			origin: "Atlanta, GA",
			destination: new google.maps.LatLng(lat,lon),
			travelMode: google.maps.TravelMode.DRIVING
		};
		directionsService.route(request, function(result, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(result);
			}
		});
		return $scope.hidePanel
	}

	$scope.cities = cities;
	for(var i = 0; i < cities.length; i++){
		$scope.createMarker(cities[i]);
	}


});

