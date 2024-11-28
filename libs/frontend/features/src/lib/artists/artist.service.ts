import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { ApiResponse, IArtist, Genre, IArtistInfo, IUpdateArtist } from '@avans-nx-workshop/shared/api';
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

    return this.http
      .get<ApiResponse<any>>(environment.dataApiUrl + '/artist')
      .pipe(
        map((response) => response.results)
      );
  }

  getArtistAsObservable(id: string): Observable<IArtist>{
    console.log('getArtistAsObservable aangeroepen');

    return this.http
      .get<ApiResponse<any>>(environment.dataApiUrl + '/artist/' + id)
      .pipe(
        map((response) => response.results)
      );
  }

  createArtist(artist: IArtistInfo): Observable<IArtist>{
    console.log('createArtist aangeroepen');

    return this.http
      .post<ApiResponse<any>>(environment.dataApiUrl + '/artist', artist)
        .pipe(
          map((response) => response.results)
        );
  }

  deleteArtist(id: string): Observable<IArtist> {
    console.log('deleteArtist aangeroepen');
    return this.http
      .delete<ApiResponse<any>>(environment.dataApiUrl + '/artist/' + id)
          .pipe(
            map((response) => response.results),
      );
  }

  updateArtist(artist: IUpdateArtist): Observable<IArtist> {
    console.log('updateArtist aangeroepen');

    return this.http
      .put<ApiResponse<any>>(environment.dataApiUrl + '/artist/' + artist._id, artist)
        .pipe(
          tap(console.log),
          map((response) => response.results)
        );
  }
}