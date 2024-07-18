import { dialogModule } from "./dialog";
import { RenderModule } from "./render";
import './style.css';

(function(){
    const mainModule = {
        init: function(){
            dialogModule.init();
            RenderModule.update();
        },

    }
    mainModule.init();
})();






/*
index.js
task.js
domCreation.js

*/