import { IEntity } from './entity.model';
import { IMeal } from './meal.interface';
import { IToken, IUserRegistration } from './auth.interface';
import { Id } from './id.type';
import { IConcert } from './concert.interface';
import { ITicket } from './ticket.interface';

export enum UserRole {
    Guest = 'Guest',
    Admin = 'Admin'
}

export enum UserGender {
    Male = 'Male',
    Female = 'Female',
    Unknown = 'Unknown'
}

/**
 * Minimal user information
 */

export interface IUserIdentity extends IEntity, IToken {
    name: string;
    emailAddress: string;
    profileImgUrl: string;
    role: UserRole;
}

/**
 * All user information, excl. domain entities
 */
export interface IUserInfo extends IUserRegistration {
    _id: Id;
    profileImgUrl: string;
    role: UserRole;
    gender: UserGender;
    isActive: boolean;
}

/**
 * All user information, incl. domain entities
 */
export interface IUser extends IUserInfo {
    tickets: ITicket[];
    meals: IMeal[];
}

export type ICreateUser = Pick<IUser, 'name' | 'password' | 'emailAddress'>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;