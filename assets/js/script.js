
// set the date
var today = moment();
$("#currentDay").text(today.format("dddd, MMMM Do"));

var now = moment();

//object to store tasks in localStorage
var workTasks = [
    { time: "0700", task: "" },
    { time: "0800", task: "" },
    { time: "0900", task: "" },
    { time: "1000", task: "" },
    { time: "1100", task: "" },
    { time: "1200", task: "" },
    { time: "1300", task: "" },
    { time: "1400", task: "" },
    { time: "1500", task: "" },
    { time: "1600", task: "" },
    { time: "1700", task: "" },
    { time: "1800", task: "" },
    { time: "1900", task: "" }
];


//load tasks from localStorage
var loadTasks = JSON.parse(localStorage.getItem("tasks"));
if (loadTasks) {
    workTasks = loadTasks;
}

//create the task element
workTasks.map((block, index) => {
    var hourLabel = block.time;
    var blockColor = colorRow(hourLabel);
    var row =
        '<div class ="task-info row" id="' + index + '"><div class="col-1 hour pt-4">'
        + hourLabel + '</div><div class="col task"><textarea class="form-control '
        + blockColor + '">' + block.task + '</textarea></div><button class="col-1 saveBtn d-flex justify-content-center align-items-center"><i class="mt-2 far fa-save fa-lg"></i></button></div>'

    $(".container").append(row);

});
//saves tasks to localStorage
var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(workTasks));
};

/* Color rows based on current time */
function colorRow(time) {
    var planNow = moment(now, "H A");
    var planEntry = moment(time, "H A");
    console.log(planEntry);
    if (planNow.isBefore(planEntry) === true) {
        return "future";
    } else if (planNow.isAfter(planEntry) === true) {
        return "past";
    } else {
        return "present";
    }
}

//save button
$(".saveBtn").on("click", function (event) {
    event.preventDefault();
    var blockId = parseInt(
        $(this)
            .closest(".task-info")
            .attr("id")
    );
    var userInput = $.trim(
        $(this)
            .parent()
            .find("textarea")
            .val()
    );
    workTasks[blockId].task = userInput;
    saveTasks();
});