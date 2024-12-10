import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {
    IArtist,
    Genre
} from '@avans-nx-workshop/shared/api';
import { IsMongoId } from 'class-validator';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist implements IArtist {
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
    description!: string;

    @Prop({
        required: true,
        type: String,
    })
    genre!: Genre;

    @Prop({
        required: true,
        type: String,
    })
    photoURL!: string;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
