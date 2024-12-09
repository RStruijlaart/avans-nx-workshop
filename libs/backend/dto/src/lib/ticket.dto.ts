import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsNumber, ValidateNested } from 'class-validator';
import {
    IConcert,
    ICreateTicket,
    ITicket,
} from '@avans-nx-workshop/shared/api';

export class CreateTicketDto implements ICreateTicket {
    @IsString()
    @IsNotEmpty()
    accesCode!: string;

    @IsNumber()
    @IsNotEmpty()
    seat!: number;

    @IsString()
    @IsNotEmpty()
    info!: string;

    @IsNotEmpty()
    @IsString()
    concert!: string;
}