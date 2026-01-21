import React from "react";
import { observer } from "mobx-react-lite";
import { Switch } from "react-native";
import { ThemeStore } from "@/stores/theme-store";

interface ThemeToggleProps {
  themeStore: ThemeStore;
}


export const ThemeToggle = observer(({ themeStore }: ThemeToggleProps) => {
    const isDarkMode = themeStore.currentTheme === 'dark';

    const toggleSwitch = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        themeStore.setTheme(newTheme);
    };

    return (
        <Switch
            trackColor={{ false: "#767577", true: "#00be43ff" }}
            thumbColor={isDarkMode ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isDarkMode}
        />
    );
});