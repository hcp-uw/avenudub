import React from "react";
import { makeObservable, action, observable, makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    async load() {
        try {
            const saved = await AsyncStorage.getItem('currentTheme');
            if (saved !== null) {
                this.currentTheme = saved as Theme;
            }
        } catch (e) {
        console.error('Failed to load theme', e);
        }
    }

    async save() {
        try {
            await AsyncStorage.setItem('currentTheme', this.currentTheme);
        } catch (e) {
            console.error('Failed to save theme', e);
        }
    }
}

export const themeStore = new ThemeStore();