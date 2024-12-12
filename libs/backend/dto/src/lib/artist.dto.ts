import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsNumber } from 'class-validator';
import { IArtist, Id, Genre, INeo4jArtist, ICreateRatingDto } from '@avans-nx-workshop/shared/api';

export class ArtistDto implements IArtist {
    _id!: Id;
    
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    genre!: Genre;

    @IsString()
    @IsNotEmpty()
    photoURL!: string;
}

export class CreateNeo4jArtistDto implements INeo4jArtist{
    @IsString()
    @IsNotEmpty()
    _id!: string;
}

export class CreateRatingDto implements ICreateRatingDto{
    @IsString()
    @IsNotEmpty()
    artistId!: string;

    @IsString()
    @IsNotEmpty()
    userId!: string;

    @IsNumber()
    @IsNotEmpty()
    rating!: number;
}