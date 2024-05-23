// Main code
import { fetchUsers } from '../services/userService';
import { generatePromoCode } from '../services/promoService';
import { sendNotification } from '../services/notificationService';
import { User } from '../models/types';

export const sendBirthdayPromos = async () => {
    const users = await fetchUsers({ verifiedStatus: true, isBirthday: true });

    if (users.length > 0) {
        const userIds = users.map((user: User) => user.id);
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 1);

        await generatePromoCode({
            name: 'Birthday Promo',
            startDate: startDate,
            endDate: endDate,
            amount: 100, // Example amount
            validUsersID: userIds,
        });

        for (const user of users) {
            await sendNotification({
                notificationType: 'email',
                subject: 'Happy Birthday!',
                body: `Happy Birthday ${user.name}! Enjoy your special promo code!`,
                target: user.email,
            });
        }
    }
};

sendBirthdayPromos().catch(console.error);
