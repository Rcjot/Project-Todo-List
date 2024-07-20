import { format } from "date-fns";
import { listModule } from "./list";
import { TaskModule } from "./task";
import { RenderModule } from "./render";

const cardModule =(function() {

    const createCard = function(task) {
        const content = document.querySelector('#right');
        const card = document.createElement('div');
        card.classList.add('taskCard')
        const showmore = document.createElement('button');
        showmore.classList.add('showmore');
        const editContainer = document.createElement('div');
        editContainer.classList.add('editContainer');
        const textDiv = document.createElement('div');
        textDiv.classList.add('cardTextDiv');
        let editOpen = false
        const checkBox = document.createElement('input');
        checkBox.classList.add('cardCheckbox');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.checked = task.checked;

        const topCard = document.createElement('div');
        topCard.classList.add('topCard');


        // checkbox
        checkBox.addEventListener('change', () => {
            task.editChecked();
            RenderModule.update();
            TaskModule.populateStorage();
        });


        showmore.addEventListener('click', () =>{
            if (editOpen){
                editContainer.innerHTML = '';
            }else{
                editCard(card, task, editContainer, textDiv);
            }
            editOpen = !editOpen;
        });

        // showmore.textContent = '';
        changeColor(card, task);
        changeText(textDiv, task);
        topCard.appendChild(textDiv);
        topCard.appendChild(checkBox);
        card.appendChild(topCard);
        card.appendChild(showmore);
        content.appendChild(card);

    }

    const changeText = function(textDiv, task){
        let myDate;
        if (task.due === ''){
            myDate = 'Anytime';
        }else if (task.due === format(new Date(), "yyyy-MM-dd")){
            myDate = 'Today';
        }else{
            myDate = format(new Date(task.due), "eee', 'LLLL d")
        }
        // const text = `${task.name} ${myDate} ${task.desc} ${task.listName}`;
        const textNameDiv = document.createElement('div');
        textNameDiv.classList.add('textNameDiv');
        textNameDiv.textContent = task.name;
        const textDateDiv = document.createElement('div');
        textDateDiv.classList.add('textDateDiv');
        textDateDiv.textContent = myDate;
        const text = `${task.name} ${myDate}`; 
        textDiv.appendChild(textNameDiv);
        textDiv.appendChild(textDateDiv);
        
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
        const nameLabel = document.createElement('label');
        nameLabel.setAttribute('for', 'nameInput');
        nameLabel.textContent = 'Task name';
        nameInput.setAttribute('type', 'text');
        nameInput.setAttribute('id', 'nameInput')

        const dueInput = document.createElement('input');
        const dueLabel = document.createElement('label');
        dueLabel.setAttribute('for', 'dueInput');
        dueLabel.textContent = 'Due date';
        dueInput.setAttribute('type', 'date');
        dueInput.setAttribute('id', 'dueInput');

        const descInput = document.createElement('textarea');
        descInput.setAttribute('type', 'text');
        descInput.setAttribute('id', 'descInput');
        const descLabel = document.createElement('label');
        descLabel.textContent = 'description';
        descLabel.setAttribute('for', 'descLabel');

        const selectionLabel = document.createElement('label');
        selectionLabel.textContent = 'List';
        selectionLabel.setAttribute('for', 'selectionInput')
        const selection = document.createElement('select');
        selection.setAttribute('id', 'selectionInput')
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
        // input changes
        nameInput.addEventListener('change', () => {
            task.editName(nameInput.value);
            changeText(textDiv, task);
            TaskModule.populateStorage();

        }); 
        dueInput.addEventListener('change', () =>{
            task.editDue(dueInput.value);
            changeText(textDiv, task);
            TaskModule.populateStorage();
        });
        descInput.addEventListener('change', () =>{
            task.editDesc(descInput.value);
            changeText(textDiv, task);
            TaskModule.populateStorage();
        });
        selection.addEventListener('change', () => {
            task.editList(selection.value);
            changeColor(card, task);
            changeText(textDiv, task);
            RenderModule.update();
            TaskModule.populateStorage();
        });
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteTaskBtn');
        deleteBtn.addEventListener('click', () => {
            const taskIndex = TaskModule.taskArr.findIndex(thisTask => thisTask.name === task.name);
            TaskModule.taskArr.splice(taskIndex, 1);
            RenderModule.update();
            TaskModule.populateStorage();
        });
        // deleteBtn.textContent = 'delete';
        editContainer.appendChild(descLabel);
        editContainer.appendChild(descInput);
        editContainer.appendChild(nameLabel)
        editContainer.appendChild(nameInput);
        editContainer.appendChild(dueLabel);
        editContainer.appendChild(dueInput);
        editContainer.appendChild(selectionLabel);
        editContainer.appendChild(selection);
        editContainer.appendChild(deleteBtn);
        card.appendChild(editContainer);
        
        
        
    }


    return {createCard};

})();


export { cardModule };