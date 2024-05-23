import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config = {
    app: {
        port: process.env.APP_PORT,
    },
    db: {
        user: process.env.DB_USER || 'username',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'sayakaya',
        password: process.env.DB_PASSWORD || 'password',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    }
};

export default config;
