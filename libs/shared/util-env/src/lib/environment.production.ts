import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: true,

    ROOT_DOMAIN_URL: 'https://nx-avans-workshop-api-dfghb6dmcqbdamby.westeurope-01.azurewebsites.net',
    dataApiUrl: 'https://nx-avans-workshop-api-dfghb6dmcqbdamby.westeurope-01.azurewebsites.net/api',

    NEO4J_DB_SCHEME: 'neo4j+s',
    NEO4J_DB_HOST: '340ab522.databases.neo4j.io',
    NEO4J_DB_PORT: 7687,
    NEO4J_DB_USER: 'neo4j',
    NEO4J_DB_PASSWORD: 'Y74EneeVLrZ4i-nfCjhvmr5-M1CFOEHsFUjo7Tl77a8',

    MONGO_DB_CONNECTION_STRING: 'mongodb+srv://rubenstruijlaart:HILeHuUSIs3etCs5@musicmate.nkxlq.mongodb.net/musicmate?retryWrites=true&w=majority&appName=MusicMate'
};
