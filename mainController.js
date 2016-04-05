var mapApp = angular.module('mapApp', ['ngRoute', 'ngAnimate']);

//This is a factory that we can use to pass data back and forth in between our controllers
//It has both a set and a get function
//When the user chooses a city, we will call the set function on the way out and get on the way in
//When the user goes to the base map, we don't need to do anything 
mapApp.factory('cityService', function() {
	var selectedCity = {}
	function set(map) {
 		masterMap = map;
 	}

	function get() {
		// console.log(typeof(masterMap));
 		if(typeof(masterMap) === 'undefined') {
 			return 'noMap';
 		}else{
   			return masterMap;
 		}
 	}

	return {
		set: set,
		get: get
 	}
});

//This code will run as soon as the route changes.
//We will run our service update here.
//We need to remember to call our service in so that run can use it!
//routeParams is also important so we can see whats in the url
mapApp.run( function($rootScope, $location, $routeParams, cityService) {
   $rootScope.$watch(function() { 
      return $location.path(); 
    },
    function(a){  
    	if(a !== '/'){
	    	console.log('url has changed: ' + a);
    	}
    });
});

//We add a second route for /city/*
//Angular will take any parameter with a : in front of it as a wildcard
//That wildcard, is what the $routeParams will use above as it's property
mapApp.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl: 'pages/front.html',
		controller: 'mapController'
	});
	$routeProvider.when('/city/:cityIndex',{
		templateUrl: 'pages/city.html',
		controller: 'cityController'
	});
	$routeProvider.otherwise({
		redirectTo: '/',
	});
});

mapApp.controller('mainController', function($scope) {
	// MAIN CONTROLLER - PLACEHOLDER	
	$scope.dirClick = function(lat, lon){
		console.log('here');
	}
});


