import { TaskModule } from "./task";
import { listModule } from "./list";

const RenderModule = (function(){

    const generateCards = function() {
        for (let task of TaskModule.taskArr){
            createCard(task); // if statement asking for category..
        }
    }

    const createCard = function(task) {
        const content = document.querySelector('#right');
        const card = document.createElement('div');
        const text = `${task.name} ${task.due} ${task.desc} ${task.list}`;
        const carol = listModule.listArr.find(list => list.listName === `${task.list}`);
        const color = carol.listColor;
        card.setAttribute('style', `background-color:${color}`);
        card.textContent = text;
        content.appendChild(card);
    }
    
    const generateList = function() {
        console.log('passed');
        const listsContainer = document.querySelector('.listsContainer');
        for (let list of listModule.listArr) {
            const listDiv = document.createElement('div');
            listDiv.textContent = `${list.listName}`;
            listDiv.setAttribute('style', `background-color:${list.listColor}`);
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

        generateCards();
        generateList();
    }

    return { update, addOptiontoDropDown }
})();

export { RenderModule}