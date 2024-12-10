import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { Subscription, tap, Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ICreateUser, IUpdateUser, IUser, IUserIdentity, IUserInfo, UserGender, UserRole } from '@avans-nx-workshop/shared/api';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'avans-nx-workshop-user-edit',
    templateUrl: './user-edit.component.html',
    styles: ``
})
export class UserEditComponent implements OnInit, OnDestroy {
    userId? : string;
    user? : IUser;
    sub?: Subscription;
    userGenderList: {
        key: string;
        value: string;
      }[] = Object.entries(UserGender)
        .map(([key, value]) => ({ key, value }));;
    userRoleList: {
        key: string;
        value: string;
      }[] = Object.entries(UserRole)
        .map(([key, value]) => ({ key, value }));;

    constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

    ngOnInit(): void {

        this.sub = this.route.paramMap
            .pipe(
                tap(console.log),
                switchMap((params: ParamMap) => {
                    if(!params.get('id')) {
                        return of({
                            name: '',
                            emailAddress: '',
                            password: '',
                            profileImgUrl: 'https://t3.ftcdn.net/jpg/00/57/04/58/360_F_57045887_HHJml6DJVxNBMqMeDqVJ0ZQDnotp5rGD.jpg',
                        });
                    }else{
                        this.userId = String(params.get('id'));
                        return this.userService.getUserByIdAsObservable(String(params.get('id')));
                    }
                }),
                tap(console.log)
            ).subscribe((user) => {
                this.user = user;
            })
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    onSubmit(user: IUserInfo): void {
        //checken als tie bestaat en dan update anders createn als tie nog niet bestaat
        //nieuwe objecten hebben nog geen ID dus gebruik dat om te checken of je moet updaten of createn
        console.log('onSubmit', user)
        if (this.userId) {
            user._id = this.userId;
            this.sub?.add(this.userService.updateUser(user).subscribe(() => {
                console.log('update');

                this.sub!.add(this.authService.currentUser$.subscribe((currentUser?: IUserIdentity) => {
                    let updatedUser: IUserIdentity = {
                        _id: user._id,
                        name: user.name,
                        emailAddress: user.emailAddress,
                        profileImgUrl: user.profileImgUrl,
                        role: user.role,
                        token: currentUser!.token
                    }

                    this.authService.saveUserToLocalStorage(updatedUser)
                    this.router.navigate(['../../' + this.userId], { relativeTo: this.route });
                }))
            }));
            
        } else {
            this.sub?.add(this.userService.createUser(user).subscribe(() => {
                console.log('create');
                this.router.navigate(['..'], { relativeTo: this.route });
            }));
            
        };
        
    }
}
