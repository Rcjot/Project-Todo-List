import { listModule } from "./list";

const TaskModule = (function(){
    let taskArr = [];

    class Task {
        constructor(name, due, desc, list){
            this.name = name;
            this.due = due;
            this.desc = desc;
            this.listName = list;
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

    const createTask = function(name, due, desc, list) {
        let newTask = new Task(name, due, desc, list);
        taskArr.push(newTask);
        console.log(taskArr);
    }
    
    return { 
        createTask,
        taskArr
    };
})();



export {TaskModule};



//class constructor


/* 
task
listed task

*/