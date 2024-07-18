import { RenderModule } from "./render";

const TaskModule = (function(){
    // let taskArr = (!localStorage.getItem("taskArr")) ? [] : JSON.parse(localStorage.getItem("taskArr"));
    let taskArr = [];


    class Task {
        constructor(name, due, desc, list, checked = false){
            this.name = name;
            this.due = due;
            this.desc = desc;
            this.listName = list;
            this.checked = checked;
        }

        editChecked() {
            this.checked = !this.checked;
        }

        editName(newName) {
            this.name = newName;
        }

        editDue(newDue){
            this.due = newDue;
        }

        editDesc(newDesc){
            this.desc = newDesc;
        }

        editList(newList){
            this.listName = newList;
        }

    }


    const getStorage = function() {
        const jsonTaskArr = JSON.parse(localStorage.getItem("taskArr"));
        for (let taskObj of jsonTaskArr){
            createTask(taskObj.name, taskObj.due, taskObj.desc, taskObj.listName, taskObj.checked);
        }
    }

    const populateStorage = function() {
        console.log(taskArr);
        localStorage.setItem("taskArr", JSON.stringify(taskArr));
    }

    const createTask = function(name, due, desc, list, checked = false) {
        let newTask = new Task(name, due, desc, list, checked);
        taskArr.push(newTask);
        populateStorage();
        console.log(taskArr);
    }

    const printTask = function(){
        console.log(this.taskArr);
    }
    
    return { 
        getStorage,
        populateStorage,
        createTask,
        taskArr,
        printTask
    };
})();



export {TaskModule};



//class constructor


/* 
task
listed task

*/