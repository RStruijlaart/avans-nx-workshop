import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUserIdentity, UserRole } from '@avans-nx-workshop/shared/api';
import { AuthService } from 'libs/frontend/features/src/lib/auth/auth.service';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

    userObservable$!: Observable<IUserIdentity | undefined>;
    subs?: Subscription;
    userRole = UserRole;

    constructor(private authService: AuthService){}

    ngOnInit(): void {
        this.userObservable$ = this.authService.currentUser$;
    }

    ngOnDestroy(): void {
        if (this.subs) {
            this.subs.unsubscribe();
        }
    }

    public logout(): void {
        this.authService.logout();
    }
}
