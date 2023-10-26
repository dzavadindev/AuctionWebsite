import {writable} from "svelte/store";

const persist = (key, value) => {
    const storedValue = sessionStorage.getItem(key);
    const data = storedValue !== "undefined" && storedValue ? JSON.parse(storedValue) : value;
    const store = writable(data);

    store.subscribe(($data) => {
        sessionStorage.setItem(key, JSON.stringify($data));
    });

    return store;
}

export const token = persist('token', "");
export const user = persist('user', "");

