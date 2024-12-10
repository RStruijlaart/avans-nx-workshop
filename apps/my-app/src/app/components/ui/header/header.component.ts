import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUserIdentity, UserRole } from '@avans-nx-workshop/shared/api';
import { AuthService } from 'libs/frontend/features/src/lib/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
    constructor(private authservice: AuthService){}

    user?: IUserIdentity;
    subs?: Subscription;
    userRole = UserRole;

    ngOnInit(): void {
        this.subs = this.authservice.currentUser$.subscribe((currentUser?:IUserIdentity) => {
            if(currentUser){
                this.user = currentUser;
            }
        });
    }

    ngOnDestroy(): void {
        if (this.subs) {
            this.subs.unsubscribe();
        }
    }

    logout(): void {
        this.authservice.logout();
        this.user = undefined;
    }
}
