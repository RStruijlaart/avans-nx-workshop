import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { IUserInfo } from '@avans-nx-workshop/shared/api';

@Component({
    selector: 'avans-nx-workshop-user-login',
    templateUrl: './user-login.component.html',
    styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit, OnDestroy{
    user?: IUserInfo;
    sub?: Subscription;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
