
const TaskModule = (function(){
    let taskArr = [];

    class Task {
        constructor(name, due, desc){
            this.name = name;
            this.due = due;
            this.desc = desc;
        }

        createCard() {
            const content = document.querySelector('#right');
            const card = document.createElement('div');
            const text = `${this.name} ${this.due} ${this.desc}`;
            card.textContent = text;
            content.appendChild(card);
        }

    }

    const createTask = function(name, due, desc) {
        let newTask = new Task(name, due, desc);
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