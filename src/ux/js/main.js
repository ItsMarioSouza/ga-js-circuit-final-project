/* ––––––––––––––––––––––––––––––––––––––––  
    EXTRA GOALS TO CONSIDER
–––––––––––––––––––––––––––––––––––––––– */
// Disabling days that are booked
// Having an option to select time
// Display a view of only X reservations at a time
// Get height of each section and anchor link down to it


/* ––––––––––––––––––––––––––––––––––––––––  
    QUESTIONS
–––––––––––––––––––––––––––––––––––––––– */
// How do you test each field and display an error message independently for each, js.validate?
// How would I show hours? 
// Is that the best way to reset the form?
// Why does the template names {{test}} need to match the DB?
// Is it better to call the DB results like this or the for loop we've learned?
// How can I pass the DB ID?


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
function getReservations() {
    // on initial load and addition of each reservation update the view
    database.ref('reservations').on('child_added', function(results) {
        // grab element to hook to
        var reservationsList = $('.reservations-list');
        // get data from database
        var context = results.val();
        // get your template from your script tag
        var source = $('#reservation-template').html();
        // compile template
        var template = Handlebars.compile(source);
        // pass data to template to be evaluated within handlebars as the template is created
        var reservationTemplate = template(context);
        // append created templated
        reservationsList.append(reservationTemplate);
    });
}

getReservations();


/* ––––––––––––––––––––––––––––––––––––––––  
    Deleting Reservations
–––––––––––––––––––––––––––––––––––––––– */
// Click event to delete comments
$('.reservations-list').on('click', '.delete', function (event) {
    // Get the ID for the comment we want to update
    var id = $(event.target).parent().data('id')

    // find comment whose objectId is equal to the id we're searching with
    var reservationReference = database.ref('reservations/' + id)

    // Use remove method to remove the comment from the database
    reservationReference.remove()
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


