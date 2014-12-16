function initialize() {
  var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(-33.9, 151.2)
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
  mapOptions);

  setMarkers(map, locations);
  // function(){
  //   console.log("moo");
  // });
  // SCOPE!!!
}

/**
* Data for the markers consisting of a name, a LatLng and a zIndex for
* the order in which these markers should display on top of each
* other.
*/
var locations = [
['Bondi Beach', -33.890542, 151.274856, 4, 150, 0],
['Coogee Beach', -33.923036, 151.259052, 5, 1, 1],
['Cronulla Beach', -34.028249, 151.157507, 3, 2, 2],
['Manly Beach', -33.80010128657071, 151.28747820854187, 2, 3, 3],
['Maroubra Beach', -33.950198, 151.259302, 1, 4,4]
];

function setMarkers(map, locations) {
  // Add markers to the map

  // Marker sizes are expressed as a Size of X,Y
  // where the origin of the image (0,0) is located
  // in the top left of the image.

  // Origins, anchor positions and coordinates of the marker
  // increase in the X direction to the right and in
  // the Y direction down.
  var image = {
    url: 'http://img3.wikia.nocookie.net/__cb20140627202734/fantendo/images/1/15/8-bit_Pikachu.png',
    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(20, 32),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(0, 32)
  };
  // Shapes define the clickable region of the icon.
  // The type defines an HTML &lt;area&gt; element 'poly' which
  // traces out a polygon as a series of X,Y points. The final
  // coordinate closes the poly by connecting to the first
  // coordinate.
  var shape = {
    coords: [0, 0, 20, 0, 20, 32, 0 , 32],
    type: 'poly'
  };
  for (var i = 0; i < locations.length; i++) {
    var location = locations[i];
    var myLatLng = new google.maps.LatLng(location[1], location[2]);
    var marker = new google.maps.Marker({
      pokemon: location[4],
      index: location[5],
      position: myLatLng,
      map: map,
      icon: image,
      shape: shape,
      title: location[0],
      zIndex: location[3]
    });

    google.maps.event.addListener(marker,'click',gameStart);
  }
}

google.maps.event.addDomListener(window, 'load', initialize);
