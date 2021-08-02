var places = ['restaurant', 'cafe', 'tourist_attraction']; 
var center = { 
   lat: 52.175968, 
   lng: 21.019255 
}; 
 
var localContextMapView = new google.maps.localContext.LocalContextMapView({ 
   element: document.querySelector('#map'), 
   placeTypePreferences: places, 
   maxPlaceCount: 24, 
   directionsOptions: {origin: center}, 
}); 