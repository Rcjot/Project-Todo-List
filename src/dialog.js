import { TaskModule } from './task.js';
import { RenderModule } from './render.js';

export const dialogModule = {
    init: function(){
        this.taskBtn();
    },
    taskBtn: function(){
        const addTaskBtn  = document.querySelector('#addTaskBtn');
        const dialog = document.querySelector('dialog');
        addTaskBtn.addEventListener('click', ()=>{
            dialog.showModal();
        });
        const closeBtn = document.querySelector('#dlgCloseBtn');
        closeBtn.addEventListener('click', ()=> dialog.close());
        const confirmBtn = document.querySelector('#confirmBtn');
        confirmBtn.addEventListener('click', () => {
            dialog.close();
            this.confirm();
        });
    },
    confirm: function(){
        const taskName = document.querySelector('#taskName');
        const taskDue = document.querySelector('#taskDue');
        const taskDesc = document.querySelector('#taskDesc');
        TaskModule.createTask(taskName.value, taskDue.value, taskDesc.value);
        RenderModule.update();
    },


};