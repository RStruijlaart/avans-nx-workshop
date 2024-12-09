import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
// import { v4 as uuid } from 'uuid';
import {
    IConcert,
    Id,
    ITicket
} from '@avans-nx-workshop/shared/api';
import { IsMongoId } from 'class-validator';

export type TicketDocument = Ticket & Document;

function generateRandomString(length: number, charset: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"): string {
    let result = '';
    const charsetLength = charset.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charsetLength);
        result += charset[randomIndex];
    }

    return result;
}

@Schema()
export class Ticket implements ITicket{
    @IsMongoId()
    _id!: Id

    @Prop({
        required: true,
        type: String,
        default: generateRandomString(16)
    })
    accesCode!: string;

    @Prop({
        required: true,
        type: Number
    })
    seat!: number;

    @Prop({
        required: true,
        type: String,
        default: "Ticket cannot be exchanged"
    })
    info!: string;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'Concert'
    })
    concert!: IConcert;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);