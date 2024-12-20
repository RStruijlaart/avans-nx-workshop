import { Module } from '@nestjs/common';
import { BackendFeaturesMealModule } from '@avans-nx-workshop/backend/features';
import { UsersModule } from '@avans-nx-workshop/backend/user';
import { ArtistModule } from '@avans-nx-workshop/backend/artist';
import { AuthModule } from '@avans-nx-workshop/backend/auth';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { Logger } from '@nestjs/common';
import { ConcertModule } from '@avans-nx-workshop/backend/concert'
import { Neo4jModule, Neo4jScheme } from 'nest-neo4j/dist';
import { Neo4jBackendModule } from '@avans-nx-workshop/backend/neo4j'
import { ConditionalModule } from '@nestjs/config'

@Module({
    imports: [
        MongooseModule.forRoot(environment.MONGO_DB_CONNECTION_STRING, {
            connectionFactory: (connection) => {
                connection.on('connected', () => {
                    // console.log('is connected');
                    Logger.verbose(
                        `Mongoose db connected to ${environment.MONGO_DB_CONNECTION_STRING}`
                    );
                });
                connection._events.connected();
                return connection;
            }
        }),
        Neo4jModule.forRoot({
            scheme: environment.NEO4J_DB_SCHEME,
            host: environment.NEO4J_DB_HOST,
            port: environment.NEO4J_DB_PORT,
            username: environment.NEO4J_DB_USER,
            password: environment.NEO4J_DB_PASSWORD,
        }),
        BackendFeaturesMealModule,
        AuthModule,
        UsersModule,
        ArtistModule,
        ConcertModule,
        Neo4jBackendModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
