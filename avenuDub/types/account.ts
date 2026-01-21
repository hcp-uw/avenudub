import { Place } from './place';

export interface Account {
    username: string;
    email: string;
    userId: number;
    favorites: Place[];
}