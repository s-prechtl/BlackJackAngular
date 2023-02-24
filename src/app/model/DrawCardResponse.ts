import { Card } from "./Card";

export interface DrawCardResponse {
    success: boolean;
    cards: Card[];
    remaining: number;
}
