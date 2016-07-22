function lStorage() {
    if (!window.localStorage) {
        log( "Environment does not support localStorage.");
        return null;
    }
    return localStorage;
}
function set(key, data) {
    lStorage() && lStorage().setItem(key, JSON.stringify(data));
}
function get(key) {
    return lStorage() &&  JSON.parse(lStorage().getItem(key));
}
function remove(key) {
    lStorage() && lStorage().removeItem(key);
}

let store = {set, get, remove};
export default store;