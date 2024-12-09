import { IConcert } from './concert.interface';
import { IEntity } from './entity.model';

export interface ITicket extends IEntity{
    accesCode: string;
    seat: number;
    info: string;
    concert: IConcert;
}

export interface ICreateTicket{
    accesCode: string;
    seat: number;
    info: string;
    concert: string;
}