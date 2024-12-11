import { Neo4jScheme } from 'nest-neo4j/dist';
export interface IEnvironment {
    production: boolean;

    ROOT_DOMAIN_URL: string;
    dataApiUrl: string;
    NEO4J_DB_SCHEME: Neo4jScheme;
    NEO4J_DB_HOST: string;
    NEO4J_DB_PORT: number;
    NEO4J_DB_USER: string;
    NEO4J_DB_PASSWORD: string;

    MONGO_DB_CONNECTION_STRING: string;

    // Hier kun je meer environment
    // variabelen zetten als dat nodig is
}
