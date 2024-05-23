import { Request, Response } from 'express';
import { sendBirthdayPromos } from '../services/birthdayPromoService';

export const sendPromoController = async (req: Request, res: Response) => {
    try {
        await sendBirthdayPromos();
        res.status(200).send('Birthday promos sent successfully!');
    } catch (error) {
        console.error('Error sending birthday promos:', error);
        res.status(500).send('Internal server error');
    }
};
