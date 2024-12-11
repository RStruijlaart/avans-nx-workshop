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

    async getRecommendedArtistsForUser(_id: string): Promise<void> {
        this.logger.log('delete neo4j user');
        const results = await this.neo4jService.read(
            `MATCH (a:Artist)<-[r:RATES]-(other:User)
            WHERE r.rating >= 4
            WITH a, collect(other.id) AS raters
            MATCH (u:User {id: '${_id}'})
            WHERE NOT EXISTS {
                MATCH (u)-[:RATES]->(a)
            }
            RETURN a`
        );

        console.log(results);
    }
}
