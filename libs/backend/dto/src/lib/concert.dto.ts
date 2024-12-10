import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsArray, IsNumber, IsDate, IsDateString, ArrayNotEmpty} from 'class-validator';
import { IArtist, Id, Genre, IConcert } from '@avans-nx-workshop/shared/api';
import { Artist } from '@avans-nx-workshop/backend/artist';

export class ConcertDto implements IConcert {
    _id!: Id;
    
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    location!: string;

    @IsDateString()
    @IsNotEmpty()
    dateTime!: Date;

    @IsNumber()
    @IsNotEmpty()
    seatCount!: number;

    @IsArray()
    @ArrayNotEmpty()
    artists: Artist[] = [];
}