export interface User {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    birth_date: Date;
    is_verified: boolean;
}

export interface UserFilterField {
    email?: string;
    verifiedStatus?: boolean;
    isBirthday?: boolean;
}

export interface CreatePromoField {
    name: string;
    startDate: Date;
    endDate: Date;
    amount: number;
    validUsersID: number[];
}

export interface NotificationParams {
    notificationType: 'email' | 'whatsapp';
    subject: string;
    body: string;
    target: string;
}
