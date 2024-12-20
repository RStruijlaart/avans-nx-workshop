import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArtistService } from '../artist.service';
import { IArtist } from '@avans-nx-workshop/shared/api';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-artist-details-admin',
    templateUrl: './artist-details-admin.component.html',
    styles: []
})
export class ArtistDetailsAdminComponent implements OnInit, OnDestroy {
    artistId: string | null = null;
    artist?: IArtist;
    sub?: Subscription;

    constructor(private artistService: ArtistService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.sub = this.route.paramMap.subscribe((params) => {
        this.artistId = params.get('id');
        this.artistService.getArtistAsObservable(String(this.artistId)).subscribe((artist) => (this.artist = artist));
        });
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    deleteArtist(id: string): void{
        this.sub?.add(this.artistService.deleteArtist(id).subscribe({
            next: (artist: IArtist | undefined) => {
                if (artist) {
                    console.log('Deleted artist:', artist);
                    this.sub!.add(this.artistService.deleteNeo4jArtist(artist._id).subscribe(() => {
                        this.router.navigate(["../../artists-admin"], { relativeTo: this.route });
                    }))
                }
            },
            error: (err) => {
                console.error('Error during deletion:', err);
            }
        }));
    }
}
