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
var datetime = null,
    date = null;

var update = function () {
    date = moment(new Date())
    datetime.html(date.format('dddd, MM Do YYYY, HH:mm:ss'));
};

$(document).ready(function () {
    datetime = $('#div-date')
    update();
    setInterval(update, 1000);
});

// var thyme = moment().format("hh:mm:ss");
// console.log("thyme :" + thyme);
// /////////////////
// var lime = moment().format('MMMM Do YYYY, h:mm:ss a');

// lime = $('#clock2');
// console.log("lime : " + lime + ", lime10 :" + lime10 + ", lime15 :" + lime15 + ", limeConverted15 :" + limeConverted15);

// moment(lime).add(60, 'minutes').format('LLL');
// var limeConverted15 = moment().format('HH:mm');
// var lime15 = moment(limeConverted15).add(15, 'minutes');
// console.log("limeConverted15" + limeConverted15);
// console.log("lime15" + lime15);

// var lime10 = moment(lime).add(10, 'minutes');
