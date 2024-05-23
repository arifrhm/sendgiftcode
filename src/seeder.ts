import * as casual from 'casual';
import { Pool } from 'pg';
import config from './config/index';

const pool = new Pool({
    user: config.db.user,
    host: config.db.host,
    database: config.db.database,
    password: config.db.password,
    port: config.db.port,
});

const generateDummyData = async () => {
    const client = await pool.connect();
    try {
        for (let i = 0; i < 1000; i++) {
            const name = casual.full_name;
            const email = casual.email;
            const phoneNumber = casual.phone;
            const birthDate = casual.date('YYYY-MM-DD');
            const isVerified = casual.boolean;

            const query = `
                INSERT INTO users (name, email, phone_number, birth_date, is_verified)
                VALUES ($1, $2, $3, $4, $5)
            `;

            await client.query(query, [name, email, phoneNumber, birthDate, isVerified]);
        }
        console.log('Dummy data inserted successfully!');
    } catch (error) {
        console.error('Error inserting dummy data:', error);
    } finally {
        client.release();
        process.exit(); // Exit after seeding
    }
};

generateDummyData();
