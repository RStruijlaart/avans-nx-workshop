import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete,
    UseGuards
} from '@nestjs/common';

import { IConcert } from '@avans-nx-workshop/shared/api';
import { ConcertDto } from '@avans-nx-workshop/backend/dto';
import { ConcertService } from './concert.service';

@Controller('concert')
export class ConcertController {
    constructor(private readonly concertService: ConcertService) {}

    @Get()
    async findAll(): Promise<IConcert[]> {
        return this.concertService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<IConcert | null> {
        return this.concertService.findOne(id);
    }

    @Post('')
    create(@Body() concert: ConcertDto): Promise<IConcert> {
        return this.concertService.create(concert);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() concert: ConcertDto
    ): Promise<IConcert | null> {
        return this.concertService.update(id, concert);
    }

    @Delete(':id')
    delete(
        @Param('id') id: string,
    ): Promise<IConcert | null> {
        return this.concertService.delete(id);
    }
}

