// JavaScript Document

$(document).ready(function(e) {
	alert ("ready");
document.addEventListener("deviceready", onDeviceReady, false);

});


function onDeviceReady() {

$('#gmap').on('click', function (){

getMapLocation();

});

$('#posicion').on ('click', function (){
	getPosition();
	});
	
$('#watch').on('click', function (){
	watchPosition();
});
	
}

$('#stopw').on('click', function (){
	 navigator.geolocation.clearWatch(watchID);
	
});

	function getPosition() {

   var options = {
      enableHighAccuracy: true,
      maximumAge: 3600000
   }
	
   var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

   function onSuccess(position) {

      alert('Latitude: '          + position.coords.latitude          + '\n' +
         'Longitude: '         + position.coords.longitude         + '\n' +
         'Altitude: '          + position.coords.altitude          + '\n' +
         'Accuracy: '          + position.coords.accuracy          + '\n' +
         'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
         'Heading: '           + position.coords.heading           + '\n' +
         'Speed: '             + position.coords.speed             + '\n' +
         'Timestamp: '         + position.timestamp                + '\n');
   };

   function onError(error) {
      alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
   }
}

function watchPosition() {

   var options = {
      maximumAge: 3600000,
      timeout: 3000,
      enableHighAccuracy: true,
   }

   var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

   function onSuccess(position) {

$('#latitud').html(position.coords.latitude);
$('#longitud').html(position.coords.longitude);
$('#altitud').html(position.coords.altitude);
$('#accuracy').html(position.coords.accuracy);
$('#aaccuracy').html(position.coords.altitudeAccuracy);
$('#headingg').html(position.coords.heading);
$('#speed').html(position.coords.speed);
$('#timestamp').html(position.timestamp);
   };

   function onError(error) {
      alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
   }




}


	function getMapLocation() {

 
  navigator.geolocation.getCurrentPosition
    (onMapSuccess, onMapError, { enableHighAccuracy: true });
	
	 function onMapSuccess  (position) {
 alert ("latitud" + position.coords.latitude);
    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
 
    getMap(Latitude, Longitude);
 
}
 
// Get map by using coordinates 
 
function getMap(latitude, longitude) {
alert ("get map");
    var mapOptions = {
        center: {lat: 0, lng: 0},
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

   map = new google.maps.Map(document.getElementById("map"), mapOptions);
  
    var latLong = new google.maps.LatLng(latitude, longitude);
 
    var marker = new google.maps.Marker({
        position: latLong
    });
 
    marker.setMap(map);
    map.setZoom(15);
    map.setCenter(marker.getPosition());
	alert ("fuera get map");
}
 
// Success callback for watching your changing position 
 
var onMapWatchSuccess = function (position) {
 
    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;
 
    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {
 
        Latitude = updatedLatitude;
        Longitude = updatedLongitude;
 
        getMap(updatedLatitude, updatedLongitude);
    }
}
 
// Error callback 
 
function onMapError(error) {
    alert ('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}
 
// Watch your changing position 
 
function watchMapPosition() {
 
    return navigator.geolocation.watchPosition
    (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
}
}
