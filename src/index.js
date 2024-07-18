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
            RenderModule.update();
        },
        localSave: function(){

            if (!localStorage.getItem("taskArr")){ // do if taskArr doesnt exist
                console.log('here?');
                TaskModule.populateStorage();
            } else{
                console.log('heree!')
                TaskModule.getStorage();
            }

            if (!localStorage.getItem("listArr")){ // do if taskArr doesnt exist
                console.log('here?');
                listModule.populateStorage();
            } else{
                console.log('heree!')
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