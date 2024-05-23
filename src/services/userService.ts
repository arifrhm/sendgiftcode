// userService.ts
import pool from '../config/database';
import { UserFilterField, User } from '../models/types';

export const fetchUsers = async ({ email, verifiedStatus, isBirthday }: UserFilterField): Promise<User[]> => {
    let query = 'SELECT * FROM users';
    const params: any[] = [];
    let paramCount = 1;
    let conditionsAdded = false; // Flag to track if conditions have been added

    if (email) {
        query += conditionsAdded ? ' AND' : ' WHERE';
        query += ` email = $${paramCount++}`;
        params.push(email);
        conditionsAdded = true;
    }

    if (verifiedStatus !== undefined) {
        query += conditionsAdded ? ' AND' : ' WHERE';
        query += ` is_verified = $${paramCount++}`;
        params.push(verifiedStatus);
        conditionsAdded = true;
    }

    if (isBirthday) {
        query += conditionsAdded ? ' AND' : ' WHERE';
        query += ` EXTRACT(DAY FROM birth_date) = EXTRACT(DAY FROM CURRENT_DATE) AND EXTRACT(MONTH FROM birth_date) = EXTRACT(MONTH FROM CURRENT_DATE)`;
        conditionsAdded = true;
    }

    const { rows } = await pool.query(query, params);
    return rows;
};
