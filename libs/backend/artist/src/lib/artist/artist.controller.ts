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

import { IArtist } from '@avans-nx-workshop/shared/api';
import { ArtistDto } from '@avans-nx-workshop/backend/dto';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
    constructor(private readonly artistService: ArtistService) {}

    @Get()
    async findAll(): Promise<IArtist[]> {
        return this.artistService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<IArtist | null> {
        return this.artistService.findOne(id);
    }

    @Post('')
    //@UseGuards()
    create(@Body() artist: ArtistDto): Promise<IArtist> {
        return this.artistService.create(artist);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() artist: ArtistDto
    ): Promise<IArtist | null> {
        return this.artistService.update(id, artist);
    }

    @Delete(':id')
    delete(
        @Param('id') id: string,
    ): Promise<IArtist | null> {
        return this.artistService.delete(id);
    }
}

