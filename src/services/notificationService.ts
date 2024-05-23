// notificationService.ts
import pool from '../config/database';
import { NotificationParams } from '../models/types';


export const sendNotification = async ({ notificationType, subject, body, target }: NotificationParams): Promise<void> => {
    if (notificationType === 'email') {
        // Assuming you have implemented email sending logic
        console.log(`Sending email notification to ${target} with subject: ${subject}`);
    } else if (notificationType === 'whatsapp') {
        // Assuming you have implemented WhatsApp sending logic
        console.log(`Sending WhatsApp notification to ${target} with body: ${body}`);
    } else {
        throw new Error(`Unsupported notification type: ${notificationType}`);
    }

    // Assuming you want to log the notification in the database
    const query = 'INSERT INTO notifications (user_id, notification_type, subject, body, sent_at) VALUES ($1, $2, $3, $4, NOW())';
    await pool.query(query, [target, notificationType, subject, body]);
};
