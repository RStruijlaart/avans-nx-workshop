import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IArtist, IConcert } from '@avans-nx-workshop/shared/api';
import { IsMongoId } from 'class-validator';

export type ConcertDocument = Concert & Document;

@Schema()
export class Concert implements IConcert {
    @IsMongoId()
    _id!: string;

    @Prop({
        required: true,
        type: String
    })
    name!: string;

    @Prop({
        required: true,
        type: String,
    })
    location!: string;

    @Prop({
        required: true,
        type: Date,
    })
    dateTime!: Date;

    @Prop({
        required: true,
        type: Number,
    })
    seatCount!: number;

    @Prop({
        default: [],
        type: [MongooseSchema.Types.ObjectId],
        ref: 'Artist'
    })
    artists: IArtist[] = [];
}

export const ConcertSchema = SchemaFactory.createForClass(Concert);
