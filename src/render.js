import { TaskModule } from "./task";

const RenderModule = (function(){

    const update = function(){
        const content = document.querySelector('#right');
        content.innerHTML = '';
        
        for (let task of TaskModule.taskArr){
            task.createCard();
        }
    }

    return { update }
})();

export { RenderModule }