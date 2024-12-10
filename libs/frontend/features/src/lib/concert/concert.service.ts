import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { ApiResponse, IConcert, IConcertInfo, IUpdateConcert } from '@avans-nx-workshop/shared/api';
import { HttpClient } from '@angular/common/http';
import { environment } from '@avans-nx-workshop/shared/util-env';

@Injectable({
  providedIn: 'root',
})
export class ConcertService {

  constructor(private http: HttpClient) {
    console.log('Service constructor aangeroepen');
  }

  getConcertsAsObservable(): Observable<IConcert[]>{
    console.log('getConcertsAsObservable aangeroepen');

    return this.http
      .get<ApiResponse<any>>(environment.dataApiUrl + '/concert')
      .pipe(
        map((response) =>
          response.results.map((concert: IConcert) => {
              concert.dateTime = new Date(concert.dateTime);
            return concert;
          })
        )
      );
  }

  getConcertAsObservable(id: string): Observable<IConcert>{
    console.log('getConcertAsObservable aangeroepen');

    return this.http
      .get<ApiResponse<any>>(environment.dataApiUrl + '/concert/' + id)
      .pipe(
        map((response) => {
          const result = response.results;
          if(result){
            result.dateTime = new Date(result.dateTime);
          }
          return result;
        })
      );
  }

  createConcert(concert: IConcertInfo): Observable<IConcert>{
    console.log('createConcert aangeroepen');

    return this.http
      .post<ApiResponse<any>>(environment.dataApiUrl + '/concert', concert)
        .pipe(
          map((response) => response.results)
        );
  }

  deleteConcert(id: string): Observable<IConcert> {
    console.log('deleteConcert aangeroepen');
    return this.http
      .delete<ApiResponse<any>>(environment.dataApiUrl + '/concert/' + id)
          .pipe(
            map((response) => response.results),
      );
  }

  updateConcert(concert: IUpdateConcert): Observable<IConcert> {
    console.log('updateConcert aangeroepen');

    return this.http
      .put<ApiResponse<any>>(environment.dataApiUrl + '/concert/' + concert._id, concert)
        .pipe(
          tap(console.log),
          map((response) => response.results)
        );
  }
}