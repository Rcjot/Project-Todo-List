import { RenderModule } from "./render";

const listModule = (function(){
    let listArr = [];

    const ListObj = function(name, color){
        const listName = name;
        const listColor = color;

        return {listName, listColor};
    }

    const getStorage = function() {
        const jsonListArr = JSON.parse(localStorage.getItem("listArr"));
        for (let listObj of jsonListArr){
            addList(listObj.listName, listObj.listColor);
        }
    }

    const populateStorage = function() {
        localStorage.setItem("listArr", JSON.stringify(listArr));
    }

    const addList = function(name, color){
        listArr.push(ListObj(name,color));
        populateStorage();
        RenderModule.updateOptionsDropDown();
    }

    return {
        addList,
        listArr,
        populateStorage,
        getStorage
    }
})();

export { listModule };


/*

to do : 

*/