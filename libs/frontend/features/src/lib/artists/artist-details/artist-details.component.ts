import { Component, OnDestroy, OnInit } from '@angular/core';
import { IArtist, IConcert } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { ArtistService } from '../artist.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-artist-details',
    templateUrl: './artist-details.component.html',
    styleUrl: './artist-details.component.css'
})

export class ArtistDetailsComponent implements OnInit, OnDestroy{
    constructor(private artistService: ArtistService, private route: ActivatedRoute){};
    
    artistId?: string | null = null;
    subs: Subscription = new Subscription();
    artist!: IArtist;
    concerts: IConcert[] = [];

    ngOnInit(): void {
        this.subs.add(this.route.paramMap.subscribe((params) => 
        {
            this.artistId = params.get('id');
            this.artistService.getArtistAsObservable(String(this.artistId)).subscribe((artist) => 
                {
                    this.artist = artist
                    this.subs.add(this.artistService.getArtistConcerts(this.artist._id).subscribe((concerts: IConcert[]) => (this.concerts = concerts)));
                });
        }));
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe()
    }
}
