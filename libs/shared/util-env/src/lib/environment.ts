import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: false,

    ROOT_DOMAIN_URL: 'dummy',
    dataApiUrl: 'dummy',

    NEO4J_DB_SCHEME: 'bolt',
    NEO4J_DB_HOST: 'dummy',
    NEO4J_DB_PORT: 7687,
    NEO4J_DB_USER: 'dummy',
    NEO4J_DB_PASSWORD: 'dummy',

    MONGO_DB_CONNECTION_STRING: 'dummy'
};
