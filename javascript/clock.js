var clock = [];
var currentTime = $('#clock').val();
// var updateClock = moment().format("HH:mm:ss");
var updateClock = function () {

    date = moment(new Date())
    // clock.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
    clock.html(date.format("dddd, MMMM Do YYYY, HH:mm:ss"));
};
$(document).ready(function () {
    clock = $('#clock')
    updateClock();
    setInterval(updateClock, 1000);
});
// console.log("currenttime :" + currentTime);
///////////
// var datetime = null,
//     date = null;

// var updateCurrentTime = function () {
//     date = moment(new Date())
//     datetime.html(date.format('dddd, MM Do YYYY, HH:mm:ss'));
// };

// $(document).ready(function () {
//     datetime = $('#div-date')
//     updateCurrentTime();
//     setInterval(updateCurrentTime, 1000);
// });

