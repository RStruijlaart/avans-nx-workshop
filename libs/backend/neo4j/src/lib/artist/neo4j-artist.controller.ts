import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { Neo4JArtistService } from './neo4j-artists.service';
import { CreateNeo4jArtistDto } from '@avans-nx-workshop/backend/dto'

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

    @Post(':id/rating')
    async addRating(@Param('id') _id: string, userId: string, rating: number): Promise<any> {
        const results = await this.neo4jService.addRating(userId, _id, rating);
        return results;
    }
}
