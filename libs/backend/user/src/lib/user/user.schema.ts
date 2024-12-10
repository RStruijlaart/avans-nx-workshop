import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
// import { v4 as uuid } from 'uuid';
import isEmail from 'validator/lib/isEmail';
import {
    IConcert,
    IMeal,
    ITicket,
    IUser,
    UserGender,
    UserRole
} from '@avans-nx-workshop/shared/api';
import { IsMongoId } from 'class-validator';
import { TicketSchema } from './ticket.schema';

export type UserDocument = User & Document;

@Schema()
export class User implements IUser {
    @IsMongoId()
    _id!: string;

    @Prop({
        required: true,
        type: String
    })
    name!: string;

    @Prop({
        required: true,
        select: false, // do not return password in select statements
        type: String
    })
    password = '';

    @Prop({
        required: true,
        type: String,
        select: true,
        unique: true
        // validate: {
        //     validator: isEmail,
        //     message: 'should be a valid email address'
        // }
    })
    emailAddress = '';

    @Prop({
        required: false,
        select: true,
    })
    profileImgUrl!: string;

    @Prop({
        required: false,
        type: String,
        default: UserRole.Guest
    })
    role: UserRole = UserRole.Guest;

    @Prop({
        required: false,
        type: String,
        default: UserGender.Unknown
    })
    gender: UserGender = UserGender.Unknown;

    @Prop({
        required: false,
        type: Boolean,
        default: true
    })
    isActive = true;

    @Prop({
        default: [],
        type: [TicketSchema],
    })
    tickets: ITicket[] = [];

    @Prop({
        default: [],
        type: [MongooseSchema.Types.ObjectId],
        ref: 'Meal'
    })
    meals: IMeal[] = [];
}

export const UserSchema = SchemaFactory.createForClass(User);
