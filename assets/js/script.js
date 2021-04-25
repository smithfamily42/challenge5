// set the date
var today = moment();
$("#currentDay").text(today.format("dddd, MMMM Do"));

//objet to store tasks in localStorage
var tasks = {
    "0700": [],
    "0800": [],
    "0900": [],
    "1000": [],
    "1100": [],
    "1200": [],
    "1300": [],
    "1400": [],
    "1500": [],
    "1600": [],
    "1700": [],
    "1800": [],
    "1900": [],
};

