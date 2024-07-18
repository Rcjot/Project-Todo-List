import { TaskModule } from "./task";
import { listModule } from "./list";
import { cardModule } from "./card";

const RenderModule = (function(){

    const generateCards = function(arr = TaskModule.taskArr) {
        const content = document.querySelector('#right');
        content.innerHTML = '';
        for (let task of arr){
            cardModule.createCard(task); // if statement asking for category..
        }
    }
    
    const navBtns = function() {
        const tasksBtn = document.querySelector('#tasksBtn');
        tasksBtn.addEventListener('click', () => generateCards());
        // add here the today and stuff
    };

    const generateList = function() {
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

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'delete';
            deleteBtn.addEventListener('click', () => {
                for (let task of TaskModule.taskArr){
                    if (task.listName === list.listName){
                        task.editList('');
                    }
                }

                 const listIndex = listModule.listArr.findIndex(thislist => thislist.listName === list.listName);
                listModule.listArr.splice(listIndex, 1);
                updateOptionsDropDown();
                update();
            });

            listsContainer.appendChild(listDiv);
            listsContainer.appendChild(deleteBtn);
        }
    };

    const updateOptionsDropDown = function(){ 
        const selection = document.querySelector('#listDropdown')
        selection.innerHTML = '';
        const unlistedOption = document.createElement('option');
        unlistedOption.value = '';
        unlistedOption.textContent = 'unlisted';
        selection.appendChild(unlistedOption);
        for (let list of listModule.listArr){
            const option = document.createElement('option');
            option.setAttribute('value', `${list.listName}`);
            option.textContent = `${list.listName}`;
            selection.appendChild(option);
        }

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

    return { update, updateOptionsDropDown }
})();

export { RenderModule}