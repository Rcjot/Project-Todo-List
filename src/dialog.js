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
        const closeBtn = document.querySelector('#dlgCloseBtn');
        const confirmBtn = document.querySelector('#confirmBtn');
        closeBtn.addEventListener('click', ()=> dialog.close());
        confirmBtn.addEventListener('click', () => {
            dialog.close();
            this.confirmTask();
        });
    },
    confirmTask: function(){
        const taskName = document.querySelector('#taskName');
        const taskDue = document.querySelector('#taskDue');
        const taskDesc = document.querySelector('#taskDesc');
        TaskModule.createTask(taskName.value, taskDue.value, taskDesc.value);
        RenderModule.update();
    },
    listBtn: function(){
        const addListsBtn = document.querySelector('#addListsBtn');
        const dialog = document.querySelector('#listDialog');
        addListsBtn.addEventListener('click', () => {
            const dialog = document.querySelector('#listDialog');
            dialog.showModal();
        });
        const closeBtn = document.querySelector('#dlgCloseBtnList');
        const confirmBtn = document.querySelector('#confirmBtnList');
        closeBtn.addEventListener('click', ()=> dialog.close());
        confirmBtn.addEventListener('click', () => {
            dialog.close();
            this.confirmList();
        });
    },
    confirmList: function(){
        const listName = document.querySelector('#listName');
        listModule.addList(listName.value);
        RenderModule.update();
    },

};