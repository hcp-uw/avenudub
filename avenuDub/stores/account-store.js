import React from "react";
import { makeObservable, action, observable } from 'mobx';

class AccountStore {
    username = "";
    email = "";
    userId = -1;
    favorites = [];
    loggedIn = false;

    constructor() {
        makeObservable(this, {
            username: observable,
            email: observable,
            userId: observable,
            favorites: observable,
            loggedIn: observable
        })
    }
    
}