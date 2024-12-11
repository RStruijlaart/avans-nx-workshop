import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: true,

    ROOT_DOMAIN_URL: 'https://nx-avans-workshop-api-dfghb6dmcqbdamby.westeurope-01.azurewebsites.net',
    dataApiUrl: 'https://nx-avans-workshop-api-dfghb6dmcqbdamby.westeurope-01.azurewebsites.net/api',

    NEO4J_DB_SCHEME: 'neo4j+s',
    NEO4J_DB_HOST: 'dummy',
    NEO4J_DB_PORT: 0,
    NEO4J_DB_USER: 'dummy',
    NEO4J_DB_PASSWORD: 'dummy',

    MONGO_DB_CONNECTION_STRING: 'mongodb+srv://rubenstruijlaart:HILeHuUSIs3etCs5@musicmate.nkxlq.mongodb.net/musicmate?retryWrites=true&w=majority&appName=MusicMate'
};
