import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { Neo4JArtistService } from './neo4j-artists.service';
import { CreateNeo4jArtistDto, CreateRatingDto } from '@avans-nx-workshop/backend/dto'

@Controller('neo4j/artist')
export class Neo4JArtistController {
    constructor(private readonly neo4jService: Neo4JArtistService) {}

    @Post('')
    async createArtist(@Body() newArtist: CreateNeo4jArtistDto): Promise<any> {
        const results = await this.neo4jService.createArtist(newArtist);
        return results;
    }

    @Delete(':id')
    async deleteUser(@Param('id') _id: string): Promise<any> {
        const results = await this.neo4jService.deleteArtist(_id);
        return results;
    }

    @Post('rating')
    async addRating(@Body() createRatingDto: CreateRatingDto): Promise<any> {
        const results = await this.neo4jService.addRating(createRatingDto);
        return results;
    }

    @Get(':artistId/rating/:userId')
    async getRating(@Param('artistId') artistId: string, @Param('userId') userId: string): Promise<number> {
        const results = await this.neo4jService.getRatingFromUser(artistId, userId);
        return results;
    }

    @Get(':id/rating')
    async getAverageRating(@Param('id') _id: string): Promise<number> {
        const results = await this.neo4jService.getAverageRating(_id);
        return results;
    }
}
