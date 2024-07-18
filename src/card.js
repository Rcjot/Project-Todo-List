import { format } from "date-fns";
import { listModule } from "./list";
import { TaskModule } from "./task";
import { RenderModule } from "./render";

const cardModule =(function() {

    const createCard = function(task) {
        const content = document.querySelector('#right');
        const card = document.createElement('div');
        const showmore = document.createElement('button');
        const editContainer = document.createElement('div');
        const textDiv = document.createElement('div');
        let editOpen = false

        showmore.addEventListener('click', () =>{
            if (editOpen){
                editContainer.innerHTML = '';
            }else{
                editCard(card, task, editContainer, textDiv);
            }
            editOpen = !editOpen;
        });

        showmore.textContent = '...';
        changeColor(card, task);
        changeText(textDiv, task);
        card.appendChild(textDiv);
        card.appendChild(showmore);
        content.appendChild(card);

    }

    const changeText = function(textDiv, task){
        const myDate = (task.due === '') ? "Anytime" : format(new Date(task.due), "eee', 'LLLL d");
        const text = `${task.name} ${myDate} ${task.desc} ${task.listName}`;
        textDiv.textContent = text;
    }

    const changeColor = function(card, task){
        if (task.listName === ''){
            card.setAttribute('style', `background-color:#ffffff`);
        }else{
            const carol = listModule.listArr.find(list => list.listName === `${task.listName}`);
            const color = carol.listColor;
            card.setAttribute('style', `background-color:${color}`);
        }
    }

    const editCard = function(card, task, editContainer, textDiv){
        editContainer.innerHTML = '';
        const nameInput = document.createElement('input');
        nameInput.setAttribute('type', 'text');
        const dueInput = document.createElement('input');
        dueInput.setAttribute('type', 'date');
        const descInput = document.createElement('input');
        descInput.setAttribute('type', 'text');
        const selection = document.createElement('select');
        const unlistedOption = document.createElement('option');
        unlistedOption.value = '';
        unlistedOption.textContent = 'unlisted';
        selection.appendChild(unlistedOption);

        for (let list of listModule.listArr) {
            const option = document.createElement('option');
            option.value = list.listName;
            option.textContent = list.listName;
            selection.appendChild(option);
        }
        nameInput.value = task.name;
        dueInput.value = task.due;
        descInput.value = task.desc;
        selection.value = task.listName;

        nameInput.addEventListener('change', () => {
            task.editName(nameInput.value);
            changeText(textDiv, task);
        }); 
        dueInput.addEventListener('change', () =>{
            task.editDue(dueInput.value);
            changeText(textDiv, task);
        });
        descInput.addEventListener('change', () =>{
            task.editDesc(descInput.value);
            changeText(textDiv, task);
        });
        selection.addEventListener('change', () => {
            task.editList(selection.value);
            changeColor(card, task);
            changeText(textDiv, task);
        });
        const deleteBtn = document.createElement('button');
        deleteBtn.addEventListener('click', () => {
            const taskIndex = TaskModule.taskArr.findIndex(thisTask => thisTask.name === task.name);
            TaskModule.taskArr.splice(taskIndex, 1);
            RenderModule.update();
        });
        deleteBtn.textContent = 'delete';
        editContainer.appendChild(nameInput);
        editContainer.appendChild(dueInput);
        editContainer.appendChild(descInput);
        editContainer.appendChild(selection);
        editContainer.appendChild(deleteBtn);
        card.appendChild(editContainer);


        
    }


    return {createCard};

})();


export { cardModule };