import { CreateNeo4jUserDto } from '@avans-nx-workshop/backend/dto'
import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class Neo4JUserService {
    private readonly logger: Logger = new Logger(Neo4JUserService.name);

    constructor(private readonly neo4jService: Neo4jService) {}

    async createUser(createUser: CreateNeo4jUserDto): Promise<void> {
        this.logger.log('create neo4j user');
        await this.neo4jService.write(
            `CREATE (u:User {_id: '${createUser._id}'})`
        );
    }

    async deleteUser(_id: string): Promise<void> {
        this.logger.log('delete neo4j user');
        await this.neo4jService.write(
            `MATCH (u:User {_id: '${_id}'}) DELETE u`
        );
    }

    async getRecommendedArtistsForUser(_id: string): Promise<Array<string>> {
        this.logger.log('get recommended artists for neo4j user');
        const results = await this.neo4jService.read(
            `MATCH (u:User {_id: "${_id}"})-[r1:RATES]->(commonArtist:Artist)<-[r2:RATES]-(otherUser:User)
            WHERE r1.rating >= 3 AND r2.rating >= 3

            MATCH (otherUser)-[r3:RATES]->(recommendedArtist:Artist)
            WHERE r3.rating >= 3
            AND NOT EXISTS {
                MATCH (u)-[:RATES]->(recommendedArtist)
            }

            RETURN DISTINCT recommendedArtist._id AS artistId
            LIMIT 3`
        );

        const recommendedArtists = results.records.map(
            (record: any) => record._fields[0]
        );
        return recommendedArtists;
    }
}
