import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ArtistService } from '../artist.service';
import { IArtist, IUserIdentity } from '@avans-nx-workshop/shared/api';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'avans-nx-workshop-artist-list',
    templateUrl: './artist-list.component.html',
    styleUrl: './artist-list.component.css'
})
export class ArtistListComponent implements OnInit, OnDestroy{

    constructor(private artistService: ArtistService, private authService: AuthService){};
    
    subs: Subscription = new Subscription();
    artists?: IArtist[];
    recommendedArtists?: IArtist[];

    ngOnInit(): void {
        this.subs.add(
            this.artistService.getArtistsAsObservable().subscribe((artists: IArtist[]) => {
                this.artists = artists
                this.subs.add(this.authService.currentUser$.subscribe((currentUser?: IUserIdentity) => {
                    if(currentUser){
                        this.subs.add(this.artistService.getRecommendedArtistIdsForUser(currentUser._id).subscribe((artistIds: Array<string>) => {
                            if(artistIds.length > 0){
                                this.subs.add(this.artistService.getArtistsFromIdArray(artistIds).subscribe((recommendedArtists: IArtist[]) => (this.recommendedArtists = recommendedArtists)))
                            }
                        }))
                    }
                }))
            })
        )
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe()
    }
}
