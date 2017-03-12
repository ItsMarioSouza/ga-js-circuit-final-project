// initialize the configuration of map
function initMap() {
    // create a new instance of a map
    // configure map with options object
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.8054491, lng: -73.9654415},
        zoom: 9,
        scrollwheel: false
    });

    // use Marker constructor to add a marker to map
     var marker = new google.maps.Marker({
        position: {lat: 40.8054491, lng: -73.9654415},
        map: map,
        title: 'Monks Cafe'
    });
}