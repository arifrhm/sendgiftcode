// notification.ts
export interface Notification {
    id: number;
    user_id: number;
    notification_type: 'email' | 'whatsapp';
    subject: string;
    body: string;
    sent_at: Date;
}