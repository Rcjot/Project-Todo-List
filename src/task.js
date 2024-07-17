
const TaskModule = (function(){
    let taskArr = [];

    class Task {
        constructor(name, due, desc, list){
            this.name = name;
            this.due = due;
            this.desc = desc;
            this.list = list;
        }

        createCard() {
            const content = document.querySelector('#right');
            const card = document.createElement('div');
            const text = `${this.name} ${this.due} ${this.desc} ${this.list}`;
            card.textContent = text;
            content.appendChild(card);
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