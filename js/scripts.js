var apiKey = 'AIzaSyCHBNUrwUYAPNrwu1-vn4aK-zxL1dvSUFI';
var googleMapsApp = angular.module("googleMapsApp", []);
googleMapsApp.controller('googleMapsController', function($scope, $http){
	var myLatlng = {lat: 40.000, lng: -98.0000};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: myLatlng
});
	var markers = [];
	function createMarker(city){
		var cityLatlng = {lat: city.lat, lng: city.lon};
		var marker = new google.maps.Marker(
			{
				position: cityLatlng,
				map: map,
				title: 'Bla bla bla bla'
			}
		);
		var infoWindow = new google.maps.InfoWindow({
			content: city.city
		});
		google.maps.event.addListener(marker, 'click', function(){
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
});