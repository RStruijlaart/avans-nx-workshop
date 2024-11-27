import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { Subscription, tap, Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ICreateUser, IUpdateUser, IUser, IUserInfo, UserGender } from '@avans-nx-workshop/shared/api';

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

    constructor(private userService: UserService, private route: ActivatedRoute) {}

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
        if (this.userId) {
            //this.userService.updateUser(user).subscribe();
            console.log('update');
        } else {
            //this.userService.createUser(user).subscribe();
            console.log('create');
        }
        console.log('onSubmit', user);
    }
}
