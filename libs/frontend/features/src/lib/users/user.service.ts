import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, tap, of, catchError, Subscription } from 'rxjs';
import { ApiResponse, ICreateTicket, ICreateUser, INeo4jUser, ITicket, IUpdateUser, IUser, IUserInfo, UserGender, UserRole } from '@avans-nx-workshop/shared/api';
import { HttpClient } from '@angular/common/http';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { AlertService } from '@avans-nx-workshop/shared/alert';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy{

  constructor(private http: HttpClient, private alertService: AlertService) {
    console.log('Service constructor aangeroepen');
  }

  subs: Subscription = new Subscription();

  ngOnDestroy(): void {
      this.subs.unsubscribe();
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

  createUser(user: IUserInfo): Observable<IUserInfo | undefined>{
    console.log('createUser aangeroepen');

    return this.http
      .post<ApiResponse<any>>(environment.dataApiUrl + '/user', user)
        .pipe(
          tap(console.log),
          map((response) => (response.results)),
          catchError((error: any) => {
            this.alertService.error(error.error.message);
            return of(undefined);
          })
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

  updateUser(user: IUpdateUser): Observable<IUserInfo | undefined> {
    console.log('updateUser aangeroepen');

    return this.http
      .put<ApiResponse<any>>(environment.dataApiUrl + '/user/' + user._id, user)
        .pipe(
          tap(console.log),
          map((response) => (response.results)),
          catchError((error: any) => {
            this.alertService.error(error.error.message);
            return of(undefined);
          })
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

  createNeo4jUser(user: INeo4jUser): Observable<any>{
    console.log('createNeo4jUser aangeroepen');
    return this.http
    .post<ApiResponse<any>>(environment.dataApiUrl + '/neo4j/user', user);
  }

  deleteNeo4jUser(id: string): Observable<any> {
    console.log('deleteNeo4jUser aangeroepen');

    return this.http
    .delete<ApiResponse<any>>(environment.dataApiUrl + '/neo4j/user/' + id);
  }
}