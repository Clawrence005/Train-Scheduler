
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
    var freq = 15;
    pickedFrequency = "minutes";
    var hourMinFormat = "HH:mm:ss";
    var freqMinutesFromNow = moment().add(-trainFreq, 'minutes').format('hh:mm');

    var freqThing = moment(freqMinutesFromNow, hourMinFormat).fromNow();
    console.log("freq " + freq + ", min  :" + pickedFrequency + ", freqMinutes :" + freqMinutesFromNow);
    console.log(" freqThing:" + freqThing);

    var currentTime = moment().format("hh:mm:ss");
    var trainTimeFormat = moment(trainTime, "HH:mm");
    // var isTime = moment(trainTime, 'minutes').format('hh:mm');


    //push html #train-table
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),           //Deutsche Bahn
        $("<td>").text(trainDest),           //Stuttgart
        $("<td>").text(trainFreq + " min"),  //every 15 min
        $("<td>").text(trainTime),           //22:00
        ///////////////////Math

        $("<td>").text(trainTimeFormat),
        $("<td>").text(currentTime),

        $("<td>").text(moment().add(trainFreq, 'm').format('hh:mm')),

        $("<td>").text(moment().add(-trainFreq, 'minutes').format('hh:mm')),

        $("<td>").text(freqMinutesFromNow),

    );

    $("#train-table> tbody").append(newRow);

});





