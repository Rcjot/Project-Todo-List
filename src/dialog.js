import { TaskModule } from './task.js';
import { RenderModule } from './render.js';
import { listModule } from './list.js';

export const dialogModule = {
    init: function(){
        this.taskBtn();
        this.listBtn();
    },
    taskBtn: function(){
        const addTaskBtn  = document.querySelector('#addTaskBtn');
        const dialog = document.querySelector('#taskDialog');
        addTaskBtn.addEventListener('click', ()=>{
            dialog.showModal();
        });
        dialog.addEventListener('click', (event) => {
            if (event.target === dialog){
                dialog.close();
            }
        });

        const confirmBtn = document.querySelector('#confirmBtn');
        confirmBtn.addEventListener('click', () => {
            dialog.close();
            this.confirmTask();
        });
    },
    confirmTask: function(){
        const taskName = document.querySelector('#taskName');
        const taskDue = document.querySelector('#taskDue');
        const taskDesc = document.querySelector('#taskDesc');
        const taskList = document.querySelector('#listDropdown');
        TaskModule.createTask(taskName.value, taskDue.value, taskDesc.value, taskList.value);
        RenderModule.update();
    },
    listBtn: function(){
        const addListsBtn = document.querySelector('#addListsBtn');
        const dialog = document.querySelector('#listDialog');
        addListsBtn.addEventListener('click', () => {
            const dialog = document.querySelector('#listDialog');
            dialog.showModal();
        });

        dialog.addEventListener('click', (event) => {
            if (event.target === dialog){
                dialog.close();
            }
        });
        const confirmBtn = document.querySelector('#confirmBtnList');
        confirmBtn.addEventListener('click', () => {
            dialog.close();
            this.confirmList();
        });
    },
    confirmList: function(){
        const listName = document.querySelector('#listName');
        const listColor = document.querySelector('#listColor');
        listModule.addList(listName.value, listColor.value);
        RenderModule.update();
    },

};