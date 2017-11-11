//Data Model
var churchesAndMosques = [{
        title: "Coptic Orthodox Church of Alexandria",
        lat: 31.1984027,
        lng: 29.8974113
    },
    {
        title: "Caesareum of Alexandria",
        lat: 31.2009,
        lng: 29.8972113
    },
    {
        title: "Saint Mark's Coptic Orthodox Cathedral",
        lat: 30.071546,
        lng: 31.2724026
    },
    {
        title: "Mosque of Amr ibn al-As",
        lat: 30.0101215,
        lng: 31.2309481
    },
    {
        title: "Mosque of Muhammad Ali",
        lat: 30.0287015,
        lng: 31.2577219
    },
    {
        title: "Al-Hussein Mosque",
        lat: 30.0474145,
        lng: 31.2606397
    },
    {
        title: "Al-Azhar Mosque",
        lat: 30.045688,
        lng: 31.2604964
    }

];
// create style for map
var style = [{
        elementType: 'geometry',
        stylers: [{
            color: '#ebe3cd'
        }]
    },
    {
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#523735'
        }]
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [{
            color: '#f5f1e6'
        }]
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{
            color: '#c9b2a6'
        }]
    },
    {
        featureType: 'administrative.land_parcel',
        elementType: 'geometry.stroke',
        stylers: [{
            color: '#dcd2be'
        }]
    },
    {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#ae9e90'
        }]
    },
    {
        featureType: 'landscape.natural',
        elementType: 'geometry',
        stylers: [{
            color: '#dfd2ae'
        }]
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{
            color: '#dfd2ae'
        }]
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#93817c'
        }]
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [{
            color: '#a5b076'
        }]
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#447530'
        }]
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{
            color: '#f5f1e6'
        }]
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{
            color: '#fdfcf8'
        }]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{
            color: '#f8c967'
        }]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{
            color: '#e9bc62'
        }]
    },
    {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry',
        stylers: [{
            color: '#e98d58'
        }]
    },
    {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry.stroke',
        stylers: [{
            color: '#db8555'
        }]
    },
    {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#806b63'
        }]
    },
    {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{
            color: '#dfd2ae'
        }]
    },
    {
        featureType: 'transit.line',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#8f7d77'
        }]
    },
    {
        featureType: 'transit.line',
        elementType: 'labels.text.stroke',
        stylers: [{
            color: '#ebe3cd'
        }]
    },
    {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [{
            color: '#dfd2ae'
        }]
    },
    {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{
            color: '#b9d3c2'
        }]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#92998d'
        }]
    }
];

function ViewModel() {
    var self = this;
    self.Visible = ko.observableArray([]);
    self.myMap = ko.observableArray([]);
    self.Searchquery = ko.observable('');
    self.error = ko.observable('');

    function show() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 30.071546,
                lng: 31.2724026
            },
            styles: style,
            zoom: 8
        });
        var infowindow = new google.maps.InfoWindow({});

        churchesAndMosques.forEach(function(Churche_and_mosque) {
            //Ajax request wikipedia Api
            $.ajax({
                url: 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&callback=wikiCallBack&search=',
                data: {
                    action: 'opensearch',
                    search: Churche_and_mosque.title,
                    format: 'json'
                },
                dataType: 'jsonp'
            }).done(
                function(data) {
                    marker.content = '<h3>' + data[1][0] + '</h3>' + '<div>' + '<p>' + data[2][0] + '</p>' + '</div>' + '<a href="' + data[3][0] + '">wikipedia</a>';
                }).fail(function(jqXHR, textStatus) {
                alert('failed to get wikipedia resources');
            });
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(Churche_and_mosque.lat, Churche_and_mosque.lng),
                map: map,
                title: Churche_and_mosque.title,
                description: Churche_and_mosque.description,
                URL: Churche_and_mosque.URL,
                listC: function(thisMarker) {
                    infowindow.setContent(marker.content);
                    infowindow.open(map, thisMarker);
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function() {
                        marker.setAnimation(null);
                    }, 1500);
                }
            });

            self.Visible.push(marker);
            self.myMap.push(marker);
            marker.addListener('click', function () {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {
            marker.setAnimation(null);
            }, 1000);

                infowindow.setContent(marker.content);
                infowindow.open(map, marker);
            });
        });
    }
    // search and visible marker or unvisible marker
    self.Searchquery.subscribe(function(item) {
        for (var k = 0; k < self.myMap().length; ++k) {

            self.myMap()[k].setVisible(false);
            self.Visible.remove(self.myMap()[k]);

        }
        for (var l = 0; l < self.myMap().length; ++l) {
            if (self.myMap()[l].title.toLowerCase().indexOf(item.toLowerCase()) >= 0) {
                self.myMap()[l].setVisible(true);
                self.Visible.push(self.myMap()[l]);

            }
        }
    });

    google.maps.event.addDomListener(window, 'load', show);

}
// error handling
function googleError() {

    alert("failed to get google map resources");
}