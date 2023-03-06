const allProductsUrl = '';


// getHTML DOM elements
const getElement = (selection) =>{
    const element  = document.querySelector(selection);

    if (element) {
        return element;
        throw new Error(`Please check ${selection} selector, no such element exists.`);
    }

    
}


// fetch items from the local storage
const getStorage = (item) =>{
    let storageItem = localStorage.getItem(item);

    if (storageItem) {

        // converts a JSON string into a Javascript object.
        storageItem = JSON.parse(localStorage.getItem(item));
    }else{

        // if string not found then return an empty JS Object.
        storageItem = [];
    }

    return storageItem;
}



// place items into local storage
const setStorageItem = (name,item) =>{
    localStorage.setItem(name, JSON.stringify(item));
}



export {
    allProductsUrl,
    getElement,
    getStorage,
    setStorageItem,    
}
