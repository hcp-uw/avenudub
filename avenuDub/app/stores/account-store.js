import React from "react";
import { makeObservable, action, observable } from 'mobx';

class AccountStore {
    username = "";
    email = "";
    userId = -1;
    favorites = [];
    loggedIn = false;
}