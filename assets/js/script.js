// set the date
var today = moment();
$("#currentDay").text(today.format("dddd, MMMM Do"));

//object to store tasks in localStorage
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
//saves tasks to localStorage
var setTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
//load tasks from localStorage
var getTasks = function() {
    var loadTasks = JSON.parse(localStorage.getItem("tasks"));
    if (loadTasks) {
        tasks=loadTasks
        $.each(tasks, function(hour, task) {
            var hourDiv = $("#", + hour);
            createTask(task, hourDiv);
        })
    }
    checkTasks();
}
//create the task element
var createTask = function (taskText, hourDiv) {
    var taskDiv = hourDiv.find(".task");
    var taskPar = $("<p>")
                .addClass("description")
                .text(taskText)
                taskDiv.html(taskPar);
}

var checkTasks = function() {
    var currentHour = moment().hour();
    $(".task-info").each(function() {
        var elementHour = parseInt($(this).attr("id"));

        if (elementHour < currentHour) {
            $(this).removeClass(["present", "future"]).addClass("past");
        } else if (elementHour === currentHour) {
            $(this).removeClass(["past, future"]).addClass("present");
        } else {
            $(this).removeClass(["past", "present"]).addClass("future");
        }
        })

    };

    var replaceText = function(textAreaEl) {
        var taskInfo = textAreaEl.closest(".task-info");
        var textArea = taskInfo.find("textarea");

        var time = taskInfo.attr("id");
        var text = textAera.val().trim();

        tasks[time] = [text];
        setTasks();

        //replace the textarea element with p element
        createTask(text, taskInfo);
    }

    //event handlers
    $(".task").click(function() {
        $("textarea").each(function() {
            replaceText($(this));
        })

        //convert to text area
        var time = $(this).closest(".task-info").attr("id");
        if (parseInt(time) >= moment().hour()) {
            var text = $(this).text();
            var textInput = $("<textarea>")
                .addClass("form-control")
                .val(text);

            $(this).html(textInput);
            textInput.trigger("focus");
        }
    })

    //save button
    $(".saveBtn").click(function() {
        replaceText($(this));
    })

    //update time on page
    timeHour = 3600000 - today.milliseconds();
    setTimeout(function() {
        setInterval(checkTasks, 3600000)
            
        }, timeHour);
    
    getTasks();