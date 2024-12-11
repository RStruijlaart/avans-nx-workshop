import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { CreateNeo4jArtistDto } from '@avans-nx-workshop/backend/dto'

@Injectable()
export class Neo4JArtistService {
    private readonly logger: Logger = new Logger(Neo4JArtistService.name);

    constructor(private readonly neo4jService: Neo4jService) {}

    async createArtist(createArtist: CreateNeo4jArtistDto): Promise<void> {
        this.logger.log('create neo4j artist');
        await this.neo4jService.write(
            `CREATE (u:Artist {_id: '${createArtist._id}'})`
        );
    }

    async deleteArtist(artistId: string): Promise<void> {
        this.logger.log('delete neo4j artist');
        await this.neo4jService.write(
            `MATCH (u:Artist {_id: '${artistId}'}) DELETE u`
        );
    }

    async addRating(userId: string, artistId: string, rating: number): Promise<void> {
        this.logger.log('add neo4j rating to artist artist');
        await this.neo4jService.write(
            `MATCH (u:User {_id: '${userId}'})
            MATCH(a:Artist {_id: '${artistId}'})
            MERGE (u)-[r:RATES]->(a)
            SET r.rating = ${rating}`
        );
    }
}
