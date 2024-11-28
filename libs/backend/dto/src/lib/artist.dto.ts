import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';
import { IArtist, Id, Genre } from '@avans-nx-workshop/shared/api';

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
}