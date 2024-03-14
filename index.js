"use strict";

// TODO: This function should not be called every time. 
// It is only used when the user clicks on the button to create a new task.
AddNewTask();


function AddNewTask() {
    try {
        const idNewTaskSubmit = "new-task-submit";
        const idNewTaskInput = "new-task-input";

        const newTaskSubmit = document.getElementById(idNewTaskSubmit);
        if (!newTaskSubmit) {
            throw new Error(`Element with ID ${idNewTaskSubmit} not found`);
        }

        const newTaskInput = document.getElementById(idNewTaskInput);
        if (!newTaskInput) {
            throw new Error(`Element with ID ${idNewTaskInput} not found`);
        }
        else {
            console.log(`Input: ${newTaskInput.value}`);
        }

        newTaskSubmit.addEventListener('click', () => {
            if (!newTaskInput.value) {
                alert("Please enter a task name!");
                return;
            }
            const newKey = localStorage.length;
            const newTaskname = newTaskInput.value;
            // TODO: We do not check for duplicates
            localStorage.setItem(newKey, newTaskname);
            alert(`Key ${newKey}, taskname ${newTaskname} added to tasks in local storage, ${localStorage.length} entries in total.`);
        })
    }
    catch (error) {        
        alert(error.message);
        // TODO: Only alert for now. Throw again when we have some global policy for exceptions.
    }

}