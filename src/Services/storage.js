// LOCAL STORAGE    -stores on machine forever
function getItem(key, defaultValue){
    let value = localStorage.getItem(key);
    if (value){
        return JSON.parse(value);
    }
    return defaultValue;
}

function setItem(key, value){
    let stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
}

function removeItem(key){
    localStorage.removeItem(key);
}


//SESSION STORAGE   -stores for as long as tab is active
function getSessionItem(key, defaultValue){
    let value = sessionStorage.getItem(key);
    if (value){
        return JSON.parse(value);
    }
    return defaultValue;
}

function setSessionItem(key, value){
    let stringValue = JSON.stringify(value);
    sessionStorage.setItem(key, stringValue);
}

function removeSessionItem(key){
    sessionStorage.removeItem(key);
}


const Storage = {getItem, setItem, removeItem, getSessionItem, setSessionItem, removeSessionItem};
export default Storage;
