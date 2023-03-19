import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ACE, Card } from '../model/Card';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css']
})
export class PlayerComponent {
    @Input() cards?: Card[];

    @Output() onPull: EventEmitter<number> = new EventEmitter();
    @Output() scoreChanged: EventEmitter<number> = new EventEmitter();

    @Input() buttonsDisabled: boolean = false;

    get cardSum(): number {
        if (!this.cards) return 0;
        let sum = 0;

        for (let card of this.cards.sort((a, _) => (a.value == ACE ? 1 : -1))) {
            let value: number = +card.value;

            if (isNaN(value)) {

                if (card.value == ACE) {
                    sum += (sum + 11 > 21) ? 1 : 11;
                } else {
                    sum += 10;
                }
            } else {
                sum += value;
            }
        }
        if (!this.buttonsDisabled) {
            this.buttonsDisabled = sum >= 21;
        }
        this.scoreChanged.emit(sum);
        return sum;
    }

    stay() {
        this.buttonsDisabled = true;
    }
}
