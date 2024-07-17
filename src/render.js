import { TaskModule } from "./task";
import { listModule } from "./list";

const RenderModule = (function(){

    const generateCards = function() {
        for (let task of TaskModule.taskArr){
            task.createCard(); // if statement asking for category..
        }
    }

    const generateList = function() {
        console.log('passed');
        const listsContainer = document.querySelector('.listsContainer');
        for (let list of listModule.listArr) {
            const listDiv = document.createElement('div');
            listDiv.textContent = `${list}`;
            listsContainer.appendChild(listDiv);
        }
    };

    const update = function(){
        const content = document.querySelector('#right');
        const listsContainer = document.querySelector('.listsContainer');
        listsContainer.innerHTML = '';
        content.innerHTML = '';

        generateCards();
        generateList();
    }

    return { update }
})();

export { RenderModule }