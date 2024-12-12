import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { CreateNeo4jArtistDto, CreateRatingDto } from '@avans-nx-workshop/backend/dto'

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

    async addRating(createRatingDto: CreateRatingDto): Promise<void> {
        this.logger.log('add neo4j rating to artist artist');
        await this.neo4jService.write(
            `MATCH (u:User {_id: '${createRatingDto.userId}'})
            MATCH(a:Artist {_id: '${createRatingDto.artistId}'})
            MERGE (u)-[r:RATES]->(a)
            SET r.rating = ${createRatingDto.rating}`
        );
    }

    async getRatingFromUser(artistId: string, userId: string): Promise<number> {
        this.logger.log('get Rating For Artist From User');
        const results = await this.neo4jService.read(
            `OPTIONAL MATCH (u:User {_id: "${userId}"})-[r:RATES]->(a:Artist {_id: "${artistId}"})
            RETURN r.rating AS rating`
        );
        const rating = results.records.map(
            (record: any) => {
                if(record._fields[0] == null){
                    return record._fields[0]
                }else{
                    return record._fields[0].low
                }
            }
        );
        return rating[0];
    }

    async getAverageRating(_id: string): Promise<number> {
        this.logger.log('get Rating For Artist From User');
        const results = await this.neo4jService.read(
            `MATCH (:User)-[r:RATES]->(a:Artist {_id: '${_id}'})
            RETURN avg(r.rating) AS averageRating`
        );
        const rating = results.records.map(
            (record: any) => (record._fields[0])
        );
        return rating[0];
    }
}
