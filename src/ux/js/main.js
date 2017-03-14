/* ––––––––––––––––––––––––––––––––––––––––  
    Future Functionality
–––––––––––––––––––––––––––––––––––––––– */
// Reservations by time
// Disabling days and times that are booked
// Display a view of only X reservations at a time
// Display reservations in inrder by date
// Get height of each section and anchor link down to it
// Independent input error messages


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
        /* 
        Variables can't be global becasuse they'd always be set to "" on 
        page load, need to define them when data is entered/form is submitted 
        */
    var userInputName = $(".form__name").val();

    var userInputDate = $(".form__date").val();

    if (userInputName === "" || userInputDate === "") {
        $('.form__error-message').fadeIn();
    } else {
        reservationData.name = userInputName;

        reservationData.date = userInputDate;

        var reservationsReference = database.ref('reservations');

        reservationsReference.push(reservationData);

        // Reset form
        $(".form")[0].reset();

        // Clear error message
        $('.form__error-message').css("display", "none");

        // Display success message
        $('.form__success-message').fadeIn();

        // Check data being sent to DB
        //console.log("Data Sumbitted: " + userInputName + " " + userInputDate);
    }
});


/* ––––––––––––––––––––––––––––––––––––––––  
    Update The DOM w/ DB Data
–––––––––––––––––––––––––––––––––––––––– */
function getReservations() {
    // on initial load and addition of each reservation update the view
    database.ref('reservations').on('value', function(results) {
        // Get all reservations stored in the db
        var allReservations = results.val();

        // Remove all reservations from DOM
            /*
                why: we're listening for a change in the DB and on change, 
                we're dynamically printing all results on the page.
                If rsults are on the page during load, any change will 
                cause duplicates untill reload.
            */
        $('.reservations-list').empty();

        // Loop through all reservations coming from database call
        // Create the new reservation using Handlebars
        for (var i in allReservations) {
            // Get the HTML template
            var source = $('#reservation-template').html();

            // Complile the template
            var template = Handlebars.compile(source);

            // Pass the releveant data
            var context = {
                name: allReservations[i].name,
                date: allReservations[i].date,
                uID: i
            };

            // Append the new reservation to the list
            var reservationItem = template(context);

            $('.reservations-list').append(reservationItem);
        }
    });
}

getReservations();


/* ––––––––––––––––––––––––––––––––––––––––  
    Deleting Reservations
–––––––––––––––––––––––––––––––––––––––– */
// Click event to delete comments
$('.reservations-list').on('click', '.delete', function (event) {
    // Get the ID for the comment we want to update
    var id = $(event.target).closest('tr').data('id')

    // find comment whose objectId is equal to the id we're searching with
    var reservationReference = database.ref('reservations/' + id)

    // Use remove method to remove the comment from the database
    reservationReference.remove();
});


/* ––––––––––––––––––––––––––––––––––––––––  
    JQuery Datepicker
–––––––––––––––––––––––––––––––––––––––– */
$( function() {
    $( "#datePicker" ).datepicker();
});


/* ––––––––––––––––––––––––––––––––––––––––  
    Scroll To Location
–––––––––––––––––––––––––––––––––––––––– */
// $('.link-one').on('click', function(event) {
//     event.preventDefault();

//     $('html, body').animate({
//         scrollTop: $(".reservations").offset().top
//     }, 1000);
// });

// Above works, but is not scalable,
// need to find a way to tie the #anchor 


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
