import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css']
})
export class DealerComponent {
    @Input() hasDealt: boolean;
    @Output() hasDealtChanged: EventEmitter<boolean> = new EventEmitter();

    constructor () {
        this.hasDealt = false;
    }

    deal() {
        this.hasDealt = true;
        this.hasDealtChanged.emit(this.hasDealt);
    }
}
