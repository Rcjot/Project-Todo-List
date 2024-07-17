const listModule = (function(){
    let listArr = [];

    const addList = function(name){
        listArr.push(name);
    }

    return {
        addList,
        listArr
    }
})();

export { listModule };