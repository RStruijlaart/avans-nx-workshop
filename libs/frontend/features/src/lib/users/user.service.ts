import { Injectable } from '@angular/core';
import { map, Observable, tap, of, catchError } from 'rxjs';
import { ApiResponse, ICreateTicket, ICreateUser, ITicket, IUpdateUser, IUser, IUserInfo, UserGender, UserRole } from '@avans-nx-workshop/shared/api';
import { HttpClient } from '@angular/common/http';
import { environment } from '@avans-nx-workshop/shared/util-env';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {
    console.log('Service constructor aangeroepen');
  }

  getUsersAsObservable(): Observable<IUserInfo[]>{
    console.log('getUsersAsObservable aangeroepen');
    // 'of' is een rxjs operator die een Observable
    // maakt van de gegeven data.

    return this.http
      .get<ApiResponse<any>>(environment.dataApiUrl + '/user')
      .pipe(
        map((response) => response.results)
      );
  }

  getUserByIdAsObservable(id: string): Observable<IUser> {
    console.log('getUserByIdAsObservable aangeroepen');
    // 'of' is een rxjs operator die een Observable
    // maakt van de gegeven data.
    return this.http
      .get<ApiResponse<any>>(environment.dataApiUrl + '/user/' + id)
        .pipe(
          map((response) => response.results)
        );
  }

  createUser(user: IUserInfo): Observable<IUserInfo>{
    console.log('createUser aangeroepen');

    return this.http
      .post<ApiResponse<any>>(environment.dataApiUrl + '/user', user)
        .pipe(
          map((response) => response.results)
        );
  }

  deleteUser(id: string): Observable<IUserInfo> {
    console.log('deleteUser aangeroepen');

    return this.http
      .delete<ApiResponse<any>>(environment.dataApiUrl + '/user/' + id)
          .pipe(
            map((response) => response.results),
      );
  }

  updateUser(user: IUpdateUser): Observable<IUserInfo> {
    console.log('updateUser aangeroepen');

    return this.http
      .put<ApiResponse<any>>(environment.dataApiUrl + '/user/' + user._id, user)
        .pipe(
          tap(console.log),
          map((response) => response.results)
        );
  }

  addTicket(id: string, newTicket: ICreateTicket): Observable<IUserInfo | undefined> {
    console.log('addTicket aangeroepen');

    return this.http
    .post<{results:any}>(
      `${environment.dataApiUrl}/user/${id}/tickets`, newTicket
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
        return of(undefined);
      })
    );
  }

  deleteTicket(userId: string, concertId: string): Observable<IUserInfo | undefined> {
    console.log('deleteTicket aangeroepen');
    
    return this.http
    .delete<{results:any}>(
      `${environment.dataApiUrl}/user/${userId}/tickets/${concertId}`
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
        return of(undefined);
      })
    );
  }

  hasBoughtTicket(userId: string, concertId: string): Observable<boolean>{
    console.log('hasBoughtTicket aangeroepen');

    return this.http
      .get<ApiResponse<any>>(environment.dataApiUrl + '/user/' + userId + '/hasTicketFor/' + concertId)
      .pipe(
        map((response) => response.results.value)
      );
  }
}