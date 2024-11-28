import { Injectable } from '@angular/core';
import { map, Observable, tap, of } from 'rxjs';
import { ApiResponse, ICreateUser, IUpdateUser, IUser, IUserInfo, UserGender, UserRole } from '@avans-nx-workshop/shared/api';
import { HttpClient } from '@angular/common/http';
import { environment } from '@avans-nx-workshop/shared/util-env';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  readonly users: IUserInfo[] = [];

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

  getUserById(id: string): IUserInfo {
    console.log('getUserById aangeroepen');
    return this.users.filter((user) => user._id === id)[0];
  }

  getUserByIdAsObservable(id: string): Observable<IUserInfo> {
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

    return this.http
      .post<ApiResponse<any>>(environment.dataApiUrl + '/user', user)
        .pipe(
          map((response) => response.results)
        );
  }

  deleteUser(id: string): Observable<IUserInfo> {
    console.log(id)
    return this.http
      .delete<ApiResponse<any>>(environment.dataApiUrl + '/user/' + id)
          .pipe(
            tap(console.log),
            map((response) => response.results),
            tap(console.log)
      );
  }

  updateUser(user: IUpdateUser): Observable<IUserInfo> {

    return this.http
      .put<ApiResponse<any>>(environment.dataApiUrl + '/user/' + user._id, user)
        .pipe(
          tap(console.log),
          map((response) => response.results)
        );
  }
}