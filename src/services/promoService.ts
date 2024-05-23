import pool from '../config/database';
import { CreatePromoField } from '../models/types';

export const generatePromoCode = async ({ name: _name, startDate, endDate, amount, validUsersID }: CreatePromoField): Promise<void> => {
    const promoCode = `PROMO-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const query = 'INSERT INTO promos (code, start_date, end_date, amount, valid_user_ids) VALUES ($1, $2, $3, $4, $5)';
    await pool.query(query, [promoCode, startDate, endDate, amount, JSON.stringify(validUsersID)]);
};
