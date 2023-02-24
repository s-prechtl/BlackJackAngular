import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deck } from './model/Deck';
import { DrawCardResponse } from './model/DrawCardResponse';

@Injectable({
    providedIn: 'root'
})
export class DeckOfCardsService {
    private static readonly BASE_URL = "https://www.deckofcardsapi.com/api/deck";

    constructor(private _httpClient: HttpClient) { }

    getNewDeck(): Observable<Deck> {
        return this._httpClient.get<Deck>(DeckOfCardsService.BASE_URL + '/new/shuffle');
    }

    getCards(deckId: string, count: number): Observable<DrawCardResponse> {
        let url = DeckOfCardsService.BASE_URL + '/'  + deckId + '/draw/?count=' + count;
            return this._httpClient.get<DrawCardResponse>(url);
    }

}
