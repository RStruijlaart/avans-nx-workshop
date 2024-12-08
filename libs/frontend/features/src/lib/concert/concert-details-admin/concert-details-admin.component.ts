import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConcertService } from '../concert.service';
import { IConcert } from '@avans-nx-workshop/shared/api';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-concert-details-admin',
    templateUrl: './concert-details-admin.component.html',
    styles: []
})
export class ConcertDetailsComponent implements OnInit, OnDestroy {
    concertId: string | null = null;
    concert?: IConcert;
    sub?: Subscription;

    constructor(private concertService: ConcertService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.sub = this.route.paramMap.subscribe((params) => {
            this.concertId = params.get('id');
            this.concertService.getConcertAsObservable(String(this.concertId)).subscribe((concert) => {
                this.concert = concert;
            });
        });
        
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    deleteConcert(id: string): void{
        this.sub?.add(this.concertService.deleteConcert(id).subscribe(() => {
            this.router.navigate(['..'], { relativeTo: this.route });
        }));
    }
}
