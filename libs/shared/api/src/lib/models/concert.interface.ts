import { IArtist } from './artist.interface';
import { IEntity } from './entity.model';
import { Id } from './id.type';

export interface IConcert extends IEntity {
    name: string;
    dateTime: Date;
    location: string;
    seatCount: number;
    artists: IArtist[];
}

export interface IConcertInfo {
    _id: Id; 
    name: string;
    dateTime: Date;
    location: string;
    seatCount: number;
}

export type IUpdateConcert = Partial<Omit<IConcert, 'id'>>;