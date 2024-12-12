import { Controller, Get, Post, Body, Param, Delete} from '@nestjs/common';
import { Neo4JUserService } from './neo4j-user.service';
import { CreateNeo4jUserDto } from '@avans-nx-workshop/backend/dto'

@Controller('neo4j/user')
export class Neo4JUserController {
    constructor(private readonly neo4jService: Neo4JUserService) {}

    @Post('')
    async createUser(@Body() newUser: CreateNeo4jUserDto): Promise<any> {
        const results = await this.neo4jService.createUser(newUser);
        return results;
    }

    @Delete(':id')
    async deleteUser(@Param('id') _id: string): Promise<any> {
        const results = await this.neo4jService.deleteUser(_id);
        return results;
    }

    @Get(':id/recommend')
    async getRecommendedArtistsForUser(@Param('id') _id: string): Promise<any> {
        const results = await this.neo4jService.getRecommendedArtistsForUser(_id);
        return results;
    }
}
