import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConcertService } from '../concert.service';
import { IConcert } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-concert-list-admin',
    templateUrl: './concert-list-admin.component.html',
    styles: ``
})
export class ConcertListAdminComponent implements OnInit, OnDestroy {
    concerts?: IConcert[];
    sub?: Subscription;

    constructor(private concertService: ConcertService) {}

    ngOnInit(): void {
        this.sub = this.concertService.getConcertsAsObservable().subscribe((concerts) => (this.concerts = concerts))
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
