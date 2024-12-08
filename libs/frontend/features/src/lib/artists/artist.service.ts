import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ApiResponse, IArtist, Genre, IArtistInfo, IUpdateArtist } from '@avans-nx-workshop/shared/api';
import { HttpClient } from '@angular/common/http';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { AlertService } from '@avans-nx-workshop/shared/alert';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {

  constructor(private http: HttpClient, private alertService: AlertService,) {
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

  deleteArtist(id: string): Observable<IArtist | undefined> {
    console.log('deleteArtist aangeroepen');
    // return this.http
    //   .delete<ApiResponse<any>>(environment.dataApiUrl + '/artist/' + id)
    //       .pipe(
    //         map((response) => response.results),
    //   );

    return this.http
    .delete<{results:any}>(
      `${environment.dataApiUrl}/artist/${id}`
    )
    .pipe(
      map((response) => {
        const results = response.results;
        if (results?.response?.error) {
            throw new Error(results.response.message || 'An unexpected error occurred.');
        }
        return results;
      }),
      catchError((error: any) => {
        console.log('error:', error);
        console.log('error.message:', error.message);
        this.alertService.error(error.message);
        return of(undefined);
      })
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