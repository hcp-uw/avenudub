import React from "react";
import { makeObservable, action, observable, makeAutoObservable } from 'mobx';
import { Account } from "../types/account";

class AccountStore {
    accountInfo: Account;
    loggedIn = false;

    constructor() {
        makeAutoObservable(this);
        this.accountInfo = {
            username: '',
            email: '',
            userId: -1,
            favorites: []
        };
    }

    setAccountInfo(account: Account) {
        this.accountInfo = account;
        this.loggedIn = true;
    }

    clearAccountInfo() {
        this.accountInfo = {
            username: '',
            email: '',
            userId: -1,
            favorites: []
        };
        this.loggedIn = false;
    }
}