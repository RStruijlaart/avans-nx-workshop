import { IEntity } from './entity.model';
import { Id } from './id.type';

export enum Genre {
    Rock = "Rock",
    Pop = "Pop",
    Jazz = "Jazz",
    Classical = "Classical",
    HipHop = "HipHop",
    Electronic = "Electronic",
    Reggae = "Reggae",
    Country = "Country",
    Blues = "Blues",
    Metal = "Metal",
    Funk = "Funk",
    Soul = "Soul",
    Disco = "Disco",
    RnB = "RnB",
    Folk = "Folk",
    Latin = "Latin",
    Punk = "Punk",
    Indie = "Indie",
    KPop = "KPop",
    EDM = "EDM",
    World = "World",
    Gospel = "Gospel",
    Ska = "Ska",
}

export interface IArtist extends IEntity {
    name: string;
    description: string;
    genre: Genre;
}

export interface IArtistInfo {
    _id: Id; 
    name: string;
    description: string;
    genre: Genre;
}

export type IUpdateArtist = Partial<Omit<IArtistInfo, 'id'>>;