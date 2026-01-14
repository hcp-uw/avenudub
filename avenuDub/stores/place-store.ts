import React from "react";
import { makeObservable, action, observable, makeAutoObservable, runInAction } from 'mobx';
import { Place } from "@/types/place";

type CachedPlace = {
    place: Place;
    cachedAt: number; // timestamp
}

// see types/place.ts
export class PlaceStore {
    // from place id to CachedPlace
    places = new Map<string, CachedPlace>;
    selectedPlace?: Place; // i don't think this is necessary, but just in case?
    loading = false;

    // TODO: Set TTL to appropriate number, i just have it set to 5 minutes for now
    // which is prob too short?
    TTL = 60000 * 5;

    constructor() {
        makeAutoObservable(this);
    }

    get placeCount() {
        return this.places.size
    }

    get hasSelectedPlace() {
        return this.selectedPlace !== undefined
    }

    // for adding one place
    setPlace(place: Place) {
        const now = Date.now();
        this.places.set(place.id, { place, cachedAt: now });
    }

    // for adding multiple places
    upsertPlaces(newPlaces: Place[]) {
        const now = Date.now();
        runInAction(() => {
            for (const place of newPlaces) {
                this.places.set(place.id, { place, cachedAt: now });
            }
        });
    }

    selectPlace(place: Place) {
        this.selectedPlace = place
    }

    clearSelection() {
        this.selectedPlace = undefined
    }

    // - - - - - - - - - - -
    // Cache Helper Methods
    // - - - - - - - - - - -
    private isExpired(cached: CachedPlace) {
        return Date.now() - cached.cachedAt > this.TTL;
    }

    getPlaceFromCache(placeId: string): Place | undefined {
        const cached = this.places.get(placeId);
        if (cached && !this.isExpired(cached)) {
            return cached.place;
        }
        return undefined;
    }

    pruneExpired() {
        const now = Date.now();
        for (const [id, cached] of this.places) {
            if (now - cached.cachedAt > this.TTL) {
                this.places.delete(id);
            }
        }
    }

    // - - - - - - - - - - -
    // Fetching from cache
    // - - - - - - - - - - -
    
    // still need to actually implement it lmao, but should fetch from cache first
    // and if any requested data is not in the cache, then we make an api call for it
}