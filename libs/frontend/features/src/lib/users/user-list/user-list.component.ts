import { Component } from '@angular/core';
import { IUserInfo, UserGender, UserRole } from '@avans-nx-workshop/shared/api';

@Component({
    selector: 'avans-nx-workshop-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
    users: IUserInfo[] = [
        {
            _id: '1',
            name: 'Coen de Kruijf',
            emailAddress: 'kruijf.coen@gmail.com',
            profileImgUrl: 'url',
            role: UserRole.Guest,
            gender: UserGender.Male,
            isActive: true,
            password: 'password'
        },
        {
            _id: '2',
            name: 'Thom hendricks',
            emailAddress: 'T.hendricks@gmail.com',
            profileImgUrl: 'url',
            role: UserRole.Admin,
            gender: UserGender.Male,
            isActive: true,
            password: 'password'
        },
        {
            _id: '3',
            name: 'Drik Stabel',
            emailAddress: 'D.Stabel@gmail.com',
            profileImgUrl: 'url',
            role: UserRole.Admin,
            gender: UserGender.Male,
            isActive: true,
            password: 'password'
        }
    ];
}
