import { TaskModule } from "./task";
import { listModule } from "./list";

const RenderModule = (function(){

    const generateCards = function(arr = TaskModule.taskArr) {
        const content = document.querySelector('#right');
        content.innerHTML = '';
        for (let task of arr){
            createCard(task); // if statement asking for category..
        }
    }

    const createCard = function(task) {
        const content = document.querySelector('#right');
        const card = document.createElement('div');
        const text = `${task.name} ${task.due} ${task.desc} ${task.listName}`;

        if (task.listName === ''){
            card.setAttribute('style', `background-color:#ffffff`);
        }else{
            const carol = listModule.listArr.find(list => list.listName === `${task.listName}`);
            const color = carol.listColor;
            card.setAttribute('style', `background-color:${color}`);
        }

        card.textContent = text;
        content.appendChild(card);
    }
    
    const navBtns = function() {
        const tasksBtn = document.querySelector('#tasksBtn');
        tasksBtn.addEventListener('click', () => generateCards());

    };


    const generateList = function() {
        console.log('passed');
        const listsContainer = document.querySelector('.listsContainer');
        for (let list of listModule.listArr) {
            const listDiv = document.createElement('button');
            listDiv.textContent = `${list.listName}`;
            listDiv.setAttribute('style', `background-color:${list.listColor}`);

            listDiv.addEventListener('click', () => {
                let listed = TaskModule.taskArr.filter((task) => {
                    return task.listName === list.listName;
                })
                generateCards(listed);
            });

            listsContainer.appendChild(listDiv);
        }
    };

    const addOptiontoDropDown = function(name){
        const selection = document.querySelector('#listDropdown')
        const option = document.createElement('option');
        option.setAttribute('value', `${name}`);
        option.textContent = `${name}`;
        selection.appendChild(option);
    }

    const update = function(){
        const content = document.querySelector('#right');
        const listsContainer = document.querySelector('.listsContainer');
        listsContainer.innerHTML = '';
        content.innerHTML = '';

        navBtns();
        generateCards();
        generateList();
    }

    return { update, addOptiontoDropDown }
})();

export { RenderModule}