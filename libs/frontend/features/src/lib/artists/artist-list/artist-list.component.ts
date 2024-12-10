import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ArtistService } from '../artist.service';
import { IArtist } from '@avans-nx-workshop/shared/api';

@Component({
    selector: 'avans-nx-workshop-artist-list',
    templateUrl: './artist-list.component.html',
    styleUrl: './artist-list.component.css'
})
export class ArtistListComponent implements OnInit, OnDestroy{

    constructor(private artistService: ArtistService){};
    
    subs: Subscription = new Subscription();
    artists!: IArtist[];

    ngOnInit(): void {
        this.subs.add(
            this.artistService.getArtistsAsObservable().subscribe((artists: IArtist[]) => (this.artists = artists))
        )
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe()
    }
}
