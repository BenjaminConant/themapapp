function initialize_gmaps() {

  // set the map options hash
  var empireStateBuilding = new google.maps.LatLng(40.748183,-73.985064);
  var mapOptions = {
    center: empireStateBuilding,
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  // get the maps div's HTML obj
  var map_one_canvas_obj = document.getElementById("map-canvas-one");
  var map_two_canvas_obj = document.getElementById("map-canvas-two");
  var map_three_canvas_obj = document.getElementById("map-canvas-three");
  var map_four_canvas_obj = document.getElementById("map-canvas-four");
  var map_five_canvas_obj = document.getElementById("map-canvas-five");

  // initialize a new Google Map with the options
  mapOne = new google.maps.Map(map_one_canvas_obj, mapOptions);
  mapTwo = new google.maps.Map(map_two_canvas_obj, mapOptions);
  mapThree = new google.maps.Map(map_three_canvas_obj, mapOptions);
  mapFour = new google.maps.Map(map_four_canvas_obj, mapOptions);
  mapFive = new google.maps.Map(map_five_canvas_obj, mapOptions);
}

function placeMarker(location, mapToPlace, markersArray, customIcon) {
  if (customIcon) {
    var marker = new google.maps.Marker({
      position: location,
      title:"Hello World!",
      icon: customIcon
    });
  } else {
    var marker = new google.maps.Marker({
      position: location,
      map: mapToPlace,
      draggable: true
    });
  }
  marker.setMap(mapToPlace);
  markersArray.push(marker);
}

function placeRadius(location, mapToPlace, markersArray) {
  var circle;
  var options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: mapToPlace,
    center: location,
    radius: 800,
    editable: true
  },
  circle = new google.maps.Circle(options);
  circle.setMap(mapToPlace);
  markersArray.push(circle);
}

function markYourLocation(mapToMark, markersArray){
  if(navigator.geolocation){
    // timeout at 60000 milliseconds (60 seconds)
    var options = {timeout:60000};
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      var myLocation = new google.maps.LatLng(latitude,longitude);
      var marker = new google.maps.Marker({
        position: myLocation,
        title:"Hello World!"
      });
      marker.setMap(mapToMark);
      mapToMark.setCenter(myLocation);
      markersArray.push(marker)
    },
    errorHandler,
    options);
  }else{
    alert("Sorry, browser does not support geolocation!");
  }
}

function clearMarkers(markers) {
  markers.forEach(function(marker) {
    marker.setMap(null);
  });
}

function errorHandler(err) {
  if(err.code == 1) {
    alert("Error: Access is denied!");
  }else if( err.code == 2) {
    alert("Error: Position is unavailable!");
  }
}

$(document).ready(function() {

  initialize_gmaps();

  var markersOne = [];
  var markersTwo= [];
  var markersThree = [];
  var markersFour= [];
  var markersFive= [];

  $('#mark-a-location').click(function(){
    var empireStateBuilding = new google.maps.LatLng(40.748183,-73.985064);
    placeMarker(empireStateBuilding, mapOne, markersOne);
  });

  $('#mark-a-location-with-a-custom-icon').click(function(){
    var empireStateBuilding = new google.maps.LatLng(40.748183,-73.985064);
    var empireStateIcon = "http://img4.wikia.nocookie.net/__cb20110115144507/cityville/images/0/08/Empire_State_Building-icon.png";
    placeMarker(empireStateBuilding, mapTwo, markersTwo, empireStateIcon);
  });

  mapThreeListener = google.maps.event.addListener(mapThree, 'click', function(event) {
    placeMarker(event.latLng, mapThree, markersThree);
  });


  mapFourListener = google.maps.event.addListener(mapFour, 'click', function(event) {
    placeRadius(event.latLng, mapFour, markersFour);
  });

  $('#mark-your-location').click(function(){
    markYourLocation(mapFive, markersFive);
  });

  $('#clear-map-one').click(function() {
    clearMarkers(markersOne)
  });

  $('#clear-map-two').click(function() {
    clearMarkers(markersTwo);
  });

  $('#clear-map-three').click(function() {
    clearMarkers(markersThree);
  });

  $('#clear-map-four').click(function() {
    clearMarkers(markersFour);
  });

  $('#clear-map-five').click(function() {
    clearMarkers(markersFive);
  });

});