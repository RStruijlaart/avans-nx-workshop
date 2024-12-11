import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: false,

    ROOT_DOMAIN_URL: 'http://localhost:3000',
    dataApiUrl: 'http://localhost:3000/api',

    NEO4J_DB_SCHEME: 'bolt',
    NEO4J_DB_HOST: 'localhost',
    NEO4J_DB_PORT: 7687,
    NEO4J_DB_USER: 'neo4j',
    NEO4J_DB_PASSWORD: 'HILeHuUSIs3etCs5',

    MONGO_DB_CONNECTION_STRING: 'mongodb://localhost:27017/shareameal'
};
