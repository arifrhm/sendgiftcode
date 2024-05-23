// promo.ts
export interface Promo {
    id: number;
    code: string;
    start_date: Date;
    end_date: Date;
    amount: number;
    valid_user_ids: number[];
}
