import React from "react";
import { makeObservable, action, observable, makeAutoObservable } from 'mobx';
import { Place } from "@/types/place";

// see types/place.ts
export class PlaceStore {
    places: Place[] = [];
    selectedPlace?: Place;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get placeCount() {
        return this.places.length
    }

    get hasSelectedPlace() {
        return this.selectedPlace !== undefined
    }

    setPlaces(places: Place[]) {
        this.places = places
    }

    selectPlace(place: Place) {
        this.selectedPlace = place
    }

    clearSelection() {
        this.selectedPlace = undefined
    }
}