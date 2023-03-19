import { Component, ViewChild } from '@angular/core';
import { DeckOfCardsService } from '../deck-of-cards.service';
import { Card } from '../model/Card';
import { Deck } from '../model/Deck';
import { PlayerComponent } from '../player/player.component';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent {
    deck?: Deck;
    playerCards?: Card[];
    playerScore = 0;
    hasDealt = false;
    message = "";
    @ViewChild('player') player?: PlayerComponent;

    constructor(private _deckService: DeckOfCardsService) {
        this.getNewDeck();
    }

    getNewDeck() {
        this._deckService.getNewDeck().subscribe(response => {
            if (response.deck_id) {
                this.deck = response;
            } else {
                console.error("Something went wrong retrieving the deck!");
            }
        });
    }

    hasDealtChanged(hasDealt: boolean) {
        if (hasDealt && this.deck) {
            this.playerCards = [];
            this.pullCards(2);
        }
    }

    onScoreChanged(newScore: number) {
        this.playerScore = newScore;
        if (this.playerScore > 21) {
            this.message = "You lost noob! Get shit on!";
            this.hasDealt = false;
        }
    }

    pullCards(numberOfCards: number = 1) {
        if (!this.deck) return;

        this._deckService.getCards(this.deck.deck_id, numberOfCards).subscribe(response => {
            if (response.success) {
                response.cards.forEach(card => {
                    this.playerCards?.push(card);
                });
            } else {
                console.error("Something went wrong retrieving the deck!");
            }
        });

    }

    resetGame() {
        this.getNewDeck();
        this.playerCards = [];
        this.playerScore = 0;
        this.message = "";
        this.hasDealt = false;
        if (!this.player) return;
        this.player.buttonsDisabled = false;
    }
}
