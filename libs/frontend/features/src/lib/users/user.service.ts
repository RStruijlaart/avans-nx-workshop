import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
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

  createUser(user: IUpdateUser): Observable<IUserInfo>{
    var body = 
    {
      emailAddress: user.emailAddress,
      name: user.name,
      password: user.password
    }
    return this.http
      .post<ApiResponse<any>>(environment.dataApiUrl + '/user', body)
        .pipe(
          map((response) => response.results)
        );
  }

  deleteUser(id: string): void {
    this.http.delete(environment.dataApiUrl + '/user/' + id);
  }

  updateUser(user: IUserInfo): Observable<IUserInfo> {
    var body = 
    {
      emailAddress: user.emailAddress,
      gender: user.gender,
      role: user.role,
      title: user.isActive,
      name: user.name,
      profileImgUrl: user.profileImgUrl
    }
    
    return this.http
      .put<ApiResponse<any>>(environment.dataApiUrl + '/user/' + user._id, body)
        .pipe(
          map((response) => response.results)
        );
      }
}