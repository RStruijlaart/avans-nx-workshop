import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';
import {
    INeo4jUser,
    // ICreateUser,
    IUpdateUser,
    IUpsertUser,
    IUserRegistration,
    Id,
    UserGender,
    UserRole
} from '@avans-nx-workshop/shared/api';
import { Meal } from '@avans-nx-workshop/backend/features';
import { Ticket } from 'libs/backend/user/src/lib/user/ticket.schema';

export class CreateUserDto implements IUserRegistration {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    emailAddress!: string;
}

export class UpsertUserDto implements IUpsertUser {
    _id!: Id;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    emailAddress!: string;

    @IsBoolean()
    @IsNotEmpty()
    isActive!: boolean;

    @IsString()
    @IsNotEmpty()
    profileImgUrl = '';

    @IsString()
    @IsNotEmpty()
    meals: Meal[] = [];

    @IsString()
    @IsNotEmpty()
    tickets: Ticket[] = [];

    @IsString()
    @IsNotEmpty()
    role: UserRole = UserRole.Guest;

    @IsString()
    @IsNotEmpty()
    gender: UserGender = UserGender.Unknown;
}

export class UpdateUserDto implements IUpdateUser {
    _id?: string | undefined;

    @IsString()
    @IsOptional()
    name!: string;
}

export class CreateNeo4jUserDto implements INeo4jUser{
    @IsString()
    @IsNotEmpty()
    _id!: string;
}