//clock time
var datetime = null,
    date = null;

var updateCurrentTime = function () {
    date = moment(new Date())
    datetime.html(date.format('dddd, MM Do YYYY, HH:mm:ss'));
};

$(document).ready(function () {
    datetime = $('#div-date')
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
});
// Initialize Firebase
var config = {
    apiKey: "AIzaSyC0HJ2T98Gx_sl0f0gHZRFjNaAl19L9lFw",
    authDomain: "trainschedule-7424c.firebaseapp.com",
    databaseURL: "https://trainschedule-7424c.firebaseio.com",
    projectId: "trainschedule-7424c",
    storageBucket: "",
    messagingSenderId: "873205370385"
};
firebase.initializeApp(config);
var database = firebase.database();
//create click button, then create vars grabbing user input from form
$("#submit").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#name-input").val().trim();
    var trainDest = $("#dest-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFreq = $("#freq-input").val().trim();

    //create new user objects

    var newTrain = {
        name: trainName,
        dest: trainDest,
        time: trainTime,
        freq: trainFreq,
        // minFreq = moment().add(this.freq, 'minutes').format('hh:mm'),
    }

    //push new users data to database
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.time);
    console.log(newTrain.freq);

    // console.log(minFreq);

    alert("New Train Successfully Added");

    //clear text boxes
    $("#name-input").val("");
    $("#dest-input").val("");
    $("#time-input").val("");
    $("#freq-input").val("");

});
///////////////////////create on child added event///////////////////////////
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().freq;

    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);

    //Math/////////////////
    // var currentTime = moment().format("HH:mm:ss");
    var trainTimeFormat = moment(trainTime, "HH:mm ");

    // var now = moment(); //now 
    // var start = moment("03:05 AM", "hh:mm A"); // today at 3AM
    // var frequency = 10;

    // var minutesElapsed = now.diff(start, "minutes");

    // var stopsElapsed = Math.floor(minutesElapsed / frequency);

    // var tFrequency = 3;
    // Time is 3:30 AM
    var firstTime = trainTimeFormat;
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = (trainFreq - tRemainder).format("hh:mm");
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    //push html #train-table
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),           //Deutsche Bahn
        $("<td>").text(trainDest),           //Stuttgart
        $("<td>").text(trainFreq + " min"),  //every 15 min
        // $("<td>").text(trainTime),           //22:00
        ///////////////////Math
        $("<td>").text(trainTimeFormat),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain),
    );

    $("#train-table> tbody").append(newRow);

});
