import { RenderModule } from "./render";

const listModule = (function(){
    let listArr = [];

    const ListObj = function(name, color){
        const listName = name;
        const listColor = color;

        return {listName, listColor};
    }

    const addList = function(name, color){
        listArr.push(ListObj(name,color));
        RenderModule.updateOptionsDropDown();
    }



    return {
        addList,
        listArr
    }
})();

export { listModule };