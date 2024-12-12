import { Component, OnDestroy, OnInit } from '@angular/core';
import { IArtist, IConcert, IUserIdentity, IUserInfo } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { ArtistService } from '../artist.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CreateRatingDto } from '@avans-nx-workshop/backend/dto';

@Component({
    selector: 'avans-nx-workshop-artist-details',
    templateUrl: './artist-details.component.html',
    styleUrl: './artist-details.component.css'
})

export class ArtistDetailsComponent implements OnInit, OnDestroy{
    constructor(private artistService: ArtistService, private route: ActivatedRoute, private authService: AuthService){};
    
    artistId?: string | null = null;
    subs: Subscription = new Subscription();
    artist!: IArtist;
    concerts: IConcert[] = [];
    stars: Array<number> = [1, 2, 3, 4, 5];
    hoveredStar: number = 0;
    rating: number = 0;
    currentUser!: IUserIdentity;
    averageRating?: number; 

    ngOnInit(): void {
        this.subs.add(this.route.paramMap.subscribe((params) => 
        {
            this.artistId = params.get('id');
            this.artistService.getArtistAsObservable(String(this.artistId)).subscribe((artist) => 
                {
                    this.artist = artist
                    this.subs.add(this.artistService.getAverageRatingForNeo4jArtist(this.artist._id).subscribe((averageRating: number) => {
                        if(averageRating){
                            this.averageRating = averageRating;
                        }
                        this.subs.add(this.artistService.getArtistConcerts(this.artist._id).subscribe((concerts: IConcert[]) => {
                            this.concerts = concerts
                            this.subs.add(this.authService.currentUser$.subscribe((user?: IUserIdentity) => {
                                if(user){
                                    this.currentUser = user;
                                    this.subs.add(this.artistService.getRatingForNeo4jArtist(this.artist._id, this.currentUser._id).subscribe((rating: number) => {
                                        if(rating){
                                            this.rating = rating;
                                        }
                                    }));
                                }
                            }))
                        }));
                    }));
                });
        }));
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe()
    }

    rateArtist(value: number): void {
        this.rating = value;
        console.log(`Rated ${value} star(s) for artist ${this.artist.name}`);
        const createRating: CreateRatingDto = {
            rating: value,
            userId: this.currentUser._id,
            artistId: this.artist._id
        }
        this.subs.add(this.artistService.addRatingToNeo4jArtist(createRating).subscribe())
        if(!this.averageRating){
            this.averageRating = value;
        }
    }

    hoverStars(value: number): void {
        this.hoveredStar = value;
    }

    resetStars(): void {
        this.hoveredStar = 0;
    }

    isStarSelected(index: number): boolean {
        return this.hoveredStar >= index || this.rating >= index;
    }
}
