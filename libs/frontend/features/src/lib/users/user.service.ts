import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUserInfo, UserGender, UserRole } from '@avans-nx-workshop/shared/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {

    readonly users: IUserInfo[] = [
        {
            _id: 1,
            name: 'Ruben Struijlaart',
            emailAddress: 'ruben.struijlaart@gmail.com',
            profileImgUrl: 'url',
            role: UserRole.Guest,
            gender: UserGender.Male,
            isActive: true,
            password: 'password'
        },
        {
            _id: 2,
            name: 'Thom hendricks',
            emailAddress: 'T.hendricks@gmail.com',
            profileImgUrl: 'url',
            role: UserRole.Admin,
            gender: UserGender.Male,
            isActive: true,
            password: 'password'
        },
        {
            _id: 3,
            name: 'Drik Stabel',
            emailAddress: 'D.Stabel@gmail.com',
            profileImgUrl: 'url',
            role: UserRole.Admin,
            gender: UserGender.Male,
            isActive: true,
            password: 'password'
        }
    ];

  constructor() {
    console.log('Service constructor aangeroepen');
  }

  getUsers(): IUserInfo[] {
    console.log('getUsers aangeroepen');
    return this.users;
  }

  getUsersAsObservable(): Observable<IUserInfo[]> {
    console.log('getUsersAsObservable aangeroepen');
    // 'of' is een rxjs operator die een Observable
    // maakt van de gegeven data.
    return of(this.users);
  }

  getUserById(id: number): IUserInfo {
    console.log('getUserById aangeroepen');
    return this.users.filter((user) => user._id === id)[0];
  }

  getUserByIdAsObservable(id: number): Observable<IUserInfo> {
    console.log('getUserByIdAsObservable aangeroepen');
    // 'of' is een rxjs operator die een Observable
    // maakt van de gegeven data.
    return of(this.users.filter((user) => user._id === id)[0]);
  }
}