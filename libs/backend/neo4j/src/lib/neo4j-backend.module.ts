import { Module } from '@nestjs/common';
import { Neo4jModule } from 'nest-neo4j';
import { Neo4JUserController } from './user/neo4j-user.controller';
import { Neo4JUserService } from './user/neo4j-user.service';
import { Neo4JArtistService } from './artist/neo4j-artists.service';
import { Neo4JArtistController } from './artist/neo4j-artist.controller';

@Module({
    imports: [Neo4jModule],
    controllers: [Neo4JUserController, Neo4JArtistController],
    providers: [Neo4JUserService, Neo4JArtistService],
    exports: []
})
export class Neo4jBackendModule {}
