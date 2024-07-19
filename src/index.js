import { dialogModule } from "./dialog";
import { RenderModule } from "./render";
import { TaskModule } from "./task";
import { listModule } from "./list";
import './style.css';

(function(){
    const mainModule = {
        init: function(){
            this.localSave();
            dialogModule.init();
            RenderModule.init();
        },
        localSave: function(){

            if (!localStorage.getItem("taskArr")){ // do if taskArr doesnt exist
                TaskModule.populateStorage();
            } else{
                TaskModule.getStorage();
            }

            if (!localStorage.getItem("listArr")){ // do if taskArr doesnt exist
                listModule.populateStorage();
            } else{
                listModule.getStorage();
            }

        }

    }
    mainModule.init();
})();





/*
index.js
task.js
domCreation.js

*/