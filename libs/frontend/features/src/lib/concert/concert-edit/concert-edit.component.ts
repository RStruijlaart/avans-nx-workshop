import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConcertService } from '../concert.service';
import { Subscription, tap, Observable, of, switchMap, map } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {IArtist, IConcert, IConcertInfo } from '@avans-nx-workshop/shared/api';
import { ArtistService } from '../../artists/artist.service';

@Component({
    selector: 'avans-nx-workshop-concert-edit',
    templateUrl: './concert-edit.component.html',
    styles: ``
})
export class ConcertEditComponent implements OnInit, OnDestroy {

    constructor(private concertService: ConcertService, private route: ActivatedRoute, private router: Router, private artistService: ArtistService) {}

    concertId? : string;
    concert? : IConcert;
    sub?: Subscription;
    artistList: IArtist[] = [];

    ngOnInit(): void {

        this.sub = this.route.paramMap
            .pipe(
                tap(console.log),
                switchMap((params: ParamMap) => {
                    if(!params.get('id')) {
                        return of({});
                    }else{
                        this.concertId = String(params.get('id'));
                        return this.concertService.getConcertAsObservable(String(params.get('id')));
                    }
                }),
                tap(console.log)
            ).subscribe((concert) => {
                this.concert = concert;
            })

            this.sub.add(this.artistService.getArtistsAsObservable().subscribe((artists: IArtist[]) => this.artistList = artists));
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    onSubmit(concert: IConcertInfo): void {
        //checken als tie bestaat en dan update anders createn als tie nog niet bestaat
        //nieuwe objecten hebben nog geen ID dus gebruik dat om te checken of je moet updaten of createn
        console.log('onSubmit', concert)
        if (this.concertId) {
            concert._id = this.concertId;
            this.sub?.add(this.concertService.updateConcert(concert).subscribe(() => {
                console.log('update');
                this.router.navigate(['../../' + this.concertId], { relativeTo: this.route });
            }));
            
        } else {
            this.sub?.add(this.concertService.createConcert(concert).subscribe(() => {
                console.log('create');
                this.router.navigate(['..'], { relativeTo: this.route });
            }));
            
        };
        
    }

    get formattedDate(): string {

        if(this.concert?.dateTime){
            // Adjust for the Dutch time zone (UTC+2)
            const offsetDate = new Date(this.concert!.dateTime.getTime() + (2 * 60 * 60 * 1000)); // Add 2 hour (3600000ms)
            // Format to ISO string and slice to keep only the date and time
            return offsetDate.toISOString().slice(0, 16);
        }
        return '';
        
    }
    
    // Update the Date object when the user changes the input
    set formattedDate(value: string) {
        this.concert!.dateTime = new Date(value);
    }
}
