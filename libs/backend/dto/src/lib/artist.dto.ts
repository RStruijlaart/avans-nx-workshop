import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';
import { IArtist, Id, Genre, INeo4jArtist } from '@avans-nx-workshop/shared/api';

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