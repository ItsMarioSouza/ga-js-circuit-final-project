/* ––––––––––––––––––––––––––––––––––––––––  
    Google Firebase API
–––––––––––––––––––––––––––––––––––––––– */
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDec5ugKPiakUyykCmhA1mOBOFnCxK1oJA",
    authDomain: "js-circuits-final-project-1.firebaseapp.com",
    databaseURL: "https://js-circuits-final-project-1.firebaseio.com",
    storageBucket: "js-circuits-final-project-1.appspot.com",
    messagingSenderId: "189849567083"
};

firebase.initializeApp(config);


/* ––––––––––––––––––––––––––––––––––––––––  
    Global Variables
–––––––––––––––––––––––––––––––––––––––– */
var database = firebase.database();

var reservationData = {};


/* ––––––––––––––––––––––––––––––––––––––––  
    Get & Push Input Form Data
–––––––––––––––––––––––––––––––––––––––– */
$('.form').on('submit', function(event) {
    event.preventDefault();

    var userInputName = $(".form__name").val();

    var userInputDate = $(".form__date").val();
        /* Variables can't be global becasuse they would always be set to "" at page load.
           need to define them when data is ebtered or when the form is submitted */

    if (userInputName === "" || userInputDate === "") {
        alert("Form Field(s) are Empty");
    } else {
        reservationData.name = userInputName;

        reservationData.date = userInputDate;

        // RESET FORM...
            // Found this online only works wiht the [0] index, but why?
        $(".form")[0].reset();

        var reservationsReference = database.ref('reservations');

        reservationsReference.push(reservationData);

        console.log("Data Sumbitted: " + userInputName + " " + userInputDate);
    }
});






/* ––––––––––––––––––––––––––––––––––––––––  
    JQuery Datepicker
–––––––––––––––––––––––––––––––––––––––– */
$( function() {
    $( "#datePicker" ).datepicker();
});


/* ––––––––––––––––––––––––––––––––––––––––  
    Google Maps API
–––––––––––––––––––––––––––––––––––––––– */
// Initialize the configuration of map
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


