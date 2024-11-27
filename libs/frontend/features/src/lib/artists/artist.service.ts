import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ApiResponse, IArtist, Genre } from '@avans-nx-workshop/shared/api';
import { HttpClient } from '@angular/common/http';
import { environment } from '@avans-nx-workshop/shared/util-env';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {

  constructor(private http: HttpClient) {
    console.log('Service constructor aangeroepen');
  }

  getArtistsAsObservable(): Observable<IArtist[]>{
    console.log('getArtistsAsObservable aangeroepen');
    // 'of' is een rxjs operator die een Observable
    // maakt van de gegeven data.

    return this.http
      .get<ApiResponse<any>>(environment.dataApiUrl + '/artist')
      .pipe(
        map((response) => response.results)
      );
  }
}