import { TaskModule } from "./task";
import { listModule } from "./list";
import { cardModule } from "./card";
import { format } from "date-fns";

const RenderModule = (function(){
    

    const generateCards = function(arr = TaskModule.taskArr) {

        const content = document.querySelector('#right');
        content.innerHTML = '';
        for (let task of arr){
            cardModule.createCard(task); // if statement asking for category..
        }
    }
    
    const navBtns = function() {
        const today = format(new Date(), "yyyy-MM-dd");
        const tasksBtn = document.querySelector('#tasksBtn');
        const headText = document.querySelector('#headText');

        tasksBtn.addEventListener('click', () => {
            let tasks = TaskModule.taskArr.filter((task) => {
                return task.checked === false;
            })

            generateCards(tasks);
            headText.textContent = 'Tasks';
        });

        const todayBtn = document.querySelector('#todayBtn');
        todayBtn.addEventListener('click', () => {
            
            let todayArr = TaskModule.taskArr.filter((task) => {
                return task.due === today && task.checked === false;
            });
            generateCards(todayArr);
            headText.textContent = 'Today';
        });

        const somedayBtn = document.querySelector('#somedayBtn');
        somedayBtn.addEventListener('click', () => {
            let somedayArr = TaskModule.taskArr.filter((task) => {
                return task.due != today && task.due != '' && task.checked === false;
            });
            generateCards(somedayArr);
            headText.textContent = 'Someday';
        });

        const anytimeBtn = document.querySelector('#anytimeBtn');
        anytimeBtn.addEventListener('click', () => {
            let anytimeArr = TaskModule.taskArr.filter((task) => {
                return task.due === '' && task.checked === false;
            });
            generateCards(anytimeArr);
            headText.textContent = 'Anytime';
        });

        const finishedBtn = document.querySelector('#finishedBtn');
        finishedBtn.addEventListener('click', () => {
            let finishedArr = TaskModule.taskArr.filter((task) => {
                return task.checked === true;
            });
            updateHeadText('Finished Tasks')
            generateCards(finishedArr);
        });
        // add here the today and stuff
    };

    const generateList = function() {
        const listsContainer = document.querySelector('.listsContainer');
        for (let list of listModule.listArr) {
            const listDiv = document.createElement('div');
            const listBtn = document.createElement('button');
            listBtn.classList.add('listBtn');
            listDiv.classList.add('listDiv');
            listBtn.textContent = `${list.listName}`;
            listDiv.setAttribute('style', `background-color:${list.listColor}`);

            listDiv.addEventListener('click', () => {
                const headText = document.querySelector('#headText');
                headText.textContent = list.listName;
                update();

            });

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('deleteListBtn');
            deleteBtn.setAttribute('title', 'delete list');
            deleteBtn.addEventListener('click', () => {
                for (let task of TaskModule.taskArr){
                    if (task.listName === list.listName){
                        task.editList('');
                    }
                    TaskModule.populateStorage();
                }

                 const listIndex = listModule.listArr.findIndex(thislist => thislist.listName === list.listName);
                listModule.listArr.splice(listIndex, 1);
                updateOptionsDropDown();
                update();
                listModule.populateStorage();
            });
            listDiv.appendChild(listBtn);
            listDiv.appendChild(deleteBtn);
            listsContainer.appendChild(listDiv);
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
    const updateHeadText = function(text){
        const headText = document.querySelector('#headText');
        headText.textContent = text;
    }

    const updateShownCards = function() {
        const today = format(new Date(), "yyyy-MM-dd");
        const headText = document.querySelector('#headText');
        const myText = headText.textContent.split(' ').join('')
        let Tasks = TaskModule.taskArr.filter((task) => {
            return task.checked === false;
        })
        let Today = TaskModule.taskArr.filter((task) => {
            return task.due === today && task.checked === false;
        });
        let Someday = TaskModule.taskArr.filter((task) => {
            return task.due != today && task.due != '' && task.checked === false;
        });
        let Anytime = TaskModule.taskArr.filter((task) => {
            return task.due === '' && task.checked === false;
        });
        let FinishedTasks = TaskModule.taskArr.filter((task) => {
            return task.checked === true;
        });
        let listed = TaskModule.taskArr.filter((task) => {
            return task.listName === headText.textContent && task.checked === false;
        })

        if (listed.length === 0){
            switch(myText) {
                case 'Tasks':
                    generateCards(Tasks);
                    break;
                case 'Today':
                    generateCards(Today);
                    break;
                case 'Someday': 
                    generateCards(Someday);
                    break;
                case 'Anytime':
                    generateCards(Anytime);
                    break;
                case 'FinishedTasks':
                    generateCards(FinishedTasks);
                    break;
            }
        }else {
            generateCards(listed);
        }
    }
    

    const update = function(){
        const content = document.querySelector('#right');
        const listsContainer = document.querySelector('.listsContainer');
        listsContainer.innerHTML = '';
        content.innerHTML = '';
        let tasks = TaskModule.taskArr.filter((task) => {
            return task.checked === false;
        })
        navBtns();
        updateShownCards();
        generateList();
    }

    const init = function(){
        updateHeadText('Tasks');
        update();
    }

    return { update, updateOptionsDropDown, init }
})();

export { RenderModule}