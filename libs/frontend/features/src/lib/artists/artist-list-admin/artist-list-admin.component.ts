import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistService } from '../artist.service';
import { IArtist } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-artist-list-admin',
    templateUrl: './artist-list-admin.component.html',
    styles: ``
})
export class ArtistListAdminComponent implements OnInit, OnDestroy {
    artists?: IArtist[];
    sub?: Subscription;

    constructor(private artistService: ArtistService) {}

    ngOnInit(): void {
        this.sub = this.artistService.getArtistsAsObservable().subscribe((artists) => (this.artists = artists))
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
