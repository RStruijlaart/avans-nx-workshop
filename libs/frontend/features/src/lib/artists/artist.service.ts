import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ApiResponse, IArtist, Genre, IArtistInfo, IUpdateArtist, IConcert, INeo4jArtist, ICreateRatingDto, IFindArtistIdArray } from '@avans-nx-workshop/shared/api';
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

  getArtistConcerts(id: string): Observable<IConcert[]>{
    console.log('getArtistConcert aangeroepen');

    return this.http
      .get<ApiResponse<any>>(environment.dataApiUrl + '/artist/' + id + '/concerts')
      .pipe(
        map((response) => 
          response.results.map((concert: IConcert) => {
          concert.dateTime = new Date(concert.dateTime);
          return concert;
      }))
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

  createNeo4jArtist(artist: INeo4jArtist): Observable<any>{
    console.log('createNeo4jArtist aangeroepen');
    return this.http
    .post<ApiResponse<any>>(environment.dataApiUrl + '/neo4j/artist', artist);
  }

  deleteNeo4jArtist(id: string): Observable<any> {
    console.log('deleteNeo4jArtist aangeroepen');

    return this.http
    .delete<ApiResponse<any>>(environment.dataApiUrl + '/neo4j/artist/' + id);
  }

  addRatingToNeo4jArtist(createRatingDto: ICreateRatingDto): Observable<any>{
    console.log('addRatingToNeo4jArtist aangeroepen');
    return this.http
    .post<ApiResponse<any>>(environment.dataApiUrl + '/neo4j/artist/rating', createRatingDto);
  }  

  getRatingForNeo4jArtist(artistId: string, userId: string): Observable<number>{
    console.log('addRatingToNeo4jArtist aangeroepen');
    return this.http
    .get<ApiResponse<any>>(environment.dataApiUrl + `/neo4j/artist/${artistId}/rating/${userId}`)
    .pipe(
      map((response) => response.results)
    )
  }  

  getAverageRatingForNeo4jArtist(artistId: string): Observable<number>{
    console.log('getAverageRatingForNeo4jArtist aangeroepen');
    return this.http
    .get<ApiResponse<any>>(environment.dataApiUrl + `/neo4j/artist/${artistId}/rating`)
    .pipe(
      map((response) => response.results)
    )
  }  

  getRecommendedArtistIdsForUser(userId: string): Observable<Array<string>>{
    console.log('getRecommendedArtistsForUser aangeroepen');
    
    return this.http.get<ApiResponse<any>>(environment.dataApiUrl + `/neo4j/user/${userId}/recommend`)
    .pipe(
      map((response) => response.results)
    )
  }

  getArtistsFromIdArray(artistIds: Array<string>): Observable<IArtist[]>{
    console.log('getArtistsFromIdArray aangeroepen');

    const body: IFindArtistIdArray = {
      artistIds: artistIds
    }
    
    return this.http
    .post<ApiResponse<any>>(environment.dataApiUrl + `/artist/idArray`, body)
    .pipe(
      map((response) => response.results)
    )
  } 
}