/* ––––––––––––––––––––––––––––––––––––––––  
    EXTRA GOALS TO CONSIDER
–––––––––––––––––––––––––––––––––––––––– */
// Disabling days that are booked
// Having an option to select time


/* ––––––––––––––––––––––––––––––––––––––––  
    QUESTIONS
–––––––––––––––––––––––––––––––––––––––– */
// How do you test each field and display an error message independently for each, js.validate?
// How would I show hours? 
// Is that the best way to reet the form?
// Why does the template names {{test}} need to match the DB?


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
    Get & Push Input Form Data to DB
–––––––––––––––––––––––––––––––––––––––– */
$('.form').on('submit', function(event) {
    event.preventDefault();

    // Define variables for the values entedred in name & date feilds
        /* Variables can't be global becasuse they'd always be set to "" on page load, 
           need to define them when data is entered/form is submitted */
    var userInputName = $(".form__name").val();

    var userInputDate = $(".form__date").val();

    if (userInputName === "" || userInputDate === "") {
        // alert("Form Field(s) are Empty");
        $('.form__error-message').fadeIn();
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
    Update The DOM w/ DB Data
–––––––––––––––––––––––––––––––––––––––– */
// on initial load and addition of each reservation update the view
database.ref('reservations').on('child_added', function(results) {
    // grab element to hook to
    var reservationsList = $('.reservations-list');
    // get data from database
    var reservations = results.val();
    // get your template from your script tag
    var source = $('#reservation-template').html();
    // compile template
    var template = Handlebars.compile(source);
    // pass data to template to be evaluated within handlebars as the template is created
    var reservationTemplate = template(reservations);
    // append created templated
    reservationsList.append(reservationTemplate);
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


