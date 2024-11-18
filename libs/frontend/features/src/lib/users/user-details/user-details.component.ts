import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IUserInfo } from '@avans-nx-workshop/shared/api';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-user-details',
    templateUrl: './user-details.component.html',
    styles: []
})
export class UserDetailsComponent implements OnInit, OnDestroy {
    userId: string | null = null;
    user?: IUserInfo;
    sub?: Subscription;

    constructor(private userService: UserService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.sub = this.route.paramMap.subscribe((params) => {
        this.userId = params.get('id');
        this.user = this.userService.getUserById(Number(this.userId));
        });
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
