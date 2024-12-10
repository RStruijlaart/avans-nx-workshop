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

@Schema()
export class Ticket implements ITicket{
    @IsMongoId()
    _id!: Id

    @Prop({
        required: true,
        type: String
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