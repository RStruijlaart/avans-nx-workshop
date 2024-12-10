import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistService } from '../artist.service';
import { Subscription, tap, Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Genre, IArtist, IArtistInfo } from '@avans-nx-workshop/shared/api';

@Component({
    selector: 'avans-nx-workshop-artist-edit',
    templateUrl: './artist-edit.component.html',
    styles: ``
})
export class ArtistEditComponent implements OnInit, OnDestroy {
    artistId? : string;
    artist? : IArtist;
    sub?: Subscription;
    artistGenreList: {
        key: string;
        value: string;
      }[] = Object.entries(Genre)
        .map(([key, value]) => ({ key, value }));;

    constructor(private artistService: ArtistService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {

        this.sub = this.route.paramMap
            .pipe(
                tap(console.log),
                switchMap((params: ParamMap) => {
                    if(!params.get('id')) {
                        return of({
                            name: '',
                            description: '',
                            genre: '',
                            photoURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/1200px-Icon-round-Question_mark.svg.png"
                        });
                    }else{
                        this.artistId = String(params.get('id'));
                        return this.artistService.getArtistAsObservable(String(params.get('id')));
                    }
                }),
                tap(console.log)
            ).subscribe((artist) => {
                this.artist = artist;
            })
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    onSubmit(artist: IArtistInfo): void {
        //checken als tie bestaat en dan update anders createn als tie nog niet bestaat
        //nieuwe objecten hebben nog geen ID dus gebruik dat om te checken of je moet updaten of createn
        console.log('onSubmit', artist)
        if (this.artistId) {
            artist._id = this.artistId;
            this.sub?.add(this.artistService.updateArtist(artist).subscribe(() => {
                console.log('update');
                this.router.navigate(['../../' + this.artistId], { relativeTo: this.route });
            }));
            
        } else {
            this.sub?.add(this.artistService.createArtist(artist).subscribe(() => {
                console.log('create');
                this.router.navigate(['..'], { relativeTo: this.route });
            }));
            
        };
        
    }
}
