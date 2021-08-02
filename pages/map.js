var map;
var InforObj = [];

/* map deafult Coordinates loaction */
var centerCords = {
  lat: -25.344,
  lng: 131.036
};
var markersOnMap = [
  {
    placeName: "China(Beijing) Meetup",
    address: "Beijing Station W St, Dongcheng Qu, Beijing Shi, China, 100021",
    date: "May 25, 2019",
    hour: "4:00 pm",
    LatLng: [
      {
        lat: 39.908996,
        lng: 116.424165
      }
    ]
  },
  {
    placeName: "Australia (Canberra) Meetup",
    address: "3015 St Charles St Ste. B",
    date: "May 21, 2019",
    hour: "6:00 pm",
    LatLng: [
      {
        lat: -35.299085,
        lng: 509.109615
      }
    ]
  },
  {
    placeName: "Israel (Tel Aviv) Meetup",
    address: "אלקטרה, Yigal Alon St 98, Tel Aviv-Yafo, 6789141",
    date: "May 30, 2019",
    hour: "6:00 pm",
    LatLng: [
      {
        lat: 32.0699945,
        lng: 34.791691
      }
    ]
  }
];

window.onload = function() {
  initMap();
};

function addMarker() {
  var image = {
    /* marker url */
    url:
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32),
    labelOrigin: new google.maps.Point(0, 42)
  };
  
  /* Create markers loop */
  for (var i = 0; i < markersOnMap.length; i++) {
     /* A. Create html data for the markers */
    var contentString =
      '<div id="content"><h2>' +
      markersOnMap[i].placeName +
      "</h2><p>" +
      markersOnMap[i].address +
      "</p><date>" +
      markersOnMap[i].date +
      "</date><p>" +
      markersOnMap[i].hour +
      "</p></div>";

    /* B. generate markers position and label */
    const marker = new google.maps.Marker({
      position: markersOnMap[i].LatLng[0],
      map: map,
      label: {
        text: markersOnMap[i].placeName,
        color: "white",
        fontSize: "17px"
      },
      icon: image
    });

    const infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    marker.addListener("click", function() {
      closeOtherInfo();
      infowindow.open(marker.get("map"), marker);
      InforObj[0] = infowindow;
    });

    google.maps.event.addListener(map, "click", function(event) {
      infowindow.close();
    });
  }/* end marker loop */
}

function closeOtherInfo() {
  if (InforObj.length > 0) {
    /* detach the info-window from the marker ... undocumented in the API docs */
    InforObj[0].set("marker", null);
    /* and close it */
    InforObj[0].close();
    /* blank the array */
    InforObj.length = 0;
  }
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    restriction: {
      latLngBounds: {
        north: 85,
        south: -85,
        west: -180,
        east: 180
      }
    },
    zoom: 2,
    disableDefaultUI: true, // a way to quickly hide all controls
    center: centerCords,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }]
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }]
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }]
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }]
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }]
      }
    ]
  });

  addMarker();
}
