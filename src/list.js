const listModule = (function(){
    let listArr = [];

    const addList = function(name){
        listArr.push(name);
        addOptiontoDropDown(name);
    }

    const addOptiontoDropDown = function(name){
        const selection = document.querySelector('#listDropdown')
        const option = document.createElement('option');
        option.setAttribute('value', `${name}`);
        option.textContent = `${name}`;
        selection.appendChild(option);
    }

    return {
        addList,
        listArr
    }
})();

export { listModule };