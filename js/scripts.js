var apiKey = 'AIzaSyCHBNUrwUYAPNrwu1-vn4aK-zxL1dvSUFI';
var googleMapsApp = angular.module("googleMapsApp", []);
googleMapsApp.controller('googleMapsController', function($scope, $http){
	var myLatlng = {lat: 40.000, lng: -98.0000};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: myLatlng
});
	var markers = [];
	// var infoWindow = new google.maps.InfoWindow({});

	function createMarker(city){
		var icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=•%7CFE7569';
		if(city.yearRank == 1){
			icon = 'img/1.png';
		}else if(city.yearRank == 39){
			icon = 'img/atl.png';
		}
		var cityLatlng = {lat: city.lat, lng: city.lon};
		var marker = new google.maps.Marker(
			{
				position: cityLatlng,
				map: map,
				title: city.city,
				icon: icon
			}

		);
		
		google.maps.event.addListener(marker, 'click', function(){
			infoWindow.setContent('<h2>'+city.city+'</h2>')
			infoWindow.open(map, marker);
		});
		markers.push(marker);
	}
	$scope.triggerClick = function(index){
		google.maps.event.trigger(markers[index], 'click')
	}
	$scope.cities = cities;
	for(var i = 0; i < $scope.cities.length; i++){
		createMarker($scope.cities[i]);
	}
	$scope.updateMarkers = function (){
		for(var i = 0; i < markers.length; i++){
			markers[i].setMap(null);
		}
		for(var i = 0; i < $scope.filteredCities.length; i++){
			createMarker($scope.filteredCities[i]);
		}
	}
	$scope.getDirections = function(lat, lon){
		var destination = new google.maps.LatLng(lat, lon);
		var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
		directionsDisplay.setMap(map);
		directionsDisplay.setPanel(document.getElementById('list-window'));
        directionsService.route({
          origin: 'Atlanta, GA',
          destination: destination,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
    }
    $scope.zoomToCity = function(lat, lon){
    	var bounds = new google.maps.LatLngBounds();
    	var cityLatLon = new google.maps.LatLng(lat, lon);
    	map = new google.maps.Map(document.getElementById('map'), {
    		zoom: 8,
    		center: cityLatlng
    		}
    	});
   
	    infowindow = new google.maps.InfoWindow();
	        var service = new google.maps.places.PlacesService(map);
	        service.nearbySearch({
	          location: cityLatLon,
	          radius: 500,
	          type: ['store']
	        }, callback);
	      

	      function callback(results, status) {
	        if (status === google.maps.places.PlacesServiceStatus.OK) {
	          for (var i = 0; i < results.length; i++) {
	            createPointOfInterest(results[i]);
	          }
	        }
	      }

	    function createPointOfInterest(place) {
	        var placeLoc = place.geometry.location;
	        var marker = new google.maps.Marker({
	          map: map,
	          position: place.geometry.location
	        });
	    }
	        google.maps.event.addListener(marker, 'click', function() {
	          infowindow.setContent(place.name);
	          infowindow.open(map, this);
	        });
	        bounds.extend(marker.getPosition());
	    }
	// map.fitBounds(bounds);
    
});