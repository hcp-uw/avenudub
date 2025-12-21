import React from "react";
import { makeObservable, action, observable, makeAutoObservable } from 'mobx';

type Theme = 'light' | 'dark';

export class ThemeStore {
    currentTheme: Theme = 'light'; // defaults to light mode

    constructor() {
        makeAutoObservable(this);
    }

    setTheme(theme: Theme) {
        this.currentTheme = theme;
        this.save();
    }

    save() {
        localStorage.setItem("darkMode", String(this.currentTheme === 'dark'))
    }

    load() {
        const darkMode = localStorage.getItem("darkMode");
        if (darkMode === 'true') {
            this.currentTheme = 'dark';
        } else {
            this.currentTheme = 'light';
        }
    }
}