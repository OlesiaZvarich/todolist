"use strict";

var tasks = [];

var defaultTask = {
    id: 0,
    content: 'No_content',
    isDone: false
};


$(document).ready(function () {


    if (localStorage.getItem('task') != undefined) {

        var returnObj = JSON.parse(localStorage.getItem('task'));

        tasks = returnObj;

        createLsItem()
    }

    function createLsItem() {
        for (var i = 0; i < tasks.length; i++) {
            var myElem = document.createElement('div');
            myElem.innerHTML = tasks[i].content;
            $('#taskContainer').append(myElem);
            myElem.setAttribute('data-id', tasks[i].id);
            myElem.onclick = delTask;


        }
    }


    $('#addTask').on('click', function () {

        $('#addTask').val();
        var taskValue = $('#task').val();

        if (!checkEmptyStr(taskValue)) return;

        $('#task').val('');

        var myTask = Object.create(defaultTask);
        myTask.content = taskValue;
        if(!tasks.length) {
            myTask.id = 1;
        } else {
            myTask.id = tasks[tasks.length - 1].id + 1;
        }

        tasks.push(myTask); // add new task to array


        localStorage.setItem('task', JSON.stringify(tasks));

        createElement(taskValue, myTask.id);

    });
});



function checkEmptyStr(value) {

    if (value === '') {
        var error = document.createElement('div');
        error.innerHTML = 'Enter task';
        $('#error').html(error).fadeOut(2000);
        return;
    }
    return true;
}



function createElement(value, id) {
    var myElem = document.createElement('div');
    myElem.innerHTML = value;
    myElem.setAttribute('data-id', id);
    myElem.onclick = delTask;
    $('#taskContainer').append(myElem);

}

function delTask(event) {

    var item = $(event.target);
    var taskId = item.data('id');

    for (var i = 0; i < tasks.length; i++) {
        if (taskId === tasks[i].id) {
            item.remove();
            tasks.splice(i, 1);
            localStorage.setItem('task', JSON.stringify(tasks));
            return;
        }
    }

}
