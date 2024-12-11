import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IUserIdentity, IUserInfo } from '@avans-nx-workshop/shared/api';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserRole } from '@avans-nx-workshop/shared/api';

@Component({
    selector: 'avans-nx-workshop-user-details',
    templateUrl: './user-details.component.html',
    styles: []
})
export class UserDetailsComponent implements OnInit, OnDestroy {
    userId: string | null = null;
    user?: IUserInfo;
    sub?: Subscription;
    userMayEdit = false;
    userRole = UserRole;
    editor?: IUserIdentity;

    constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

    ngOnInit(): void {
        this.sub = this.route.paramMap.subscribe((params) => {
        this.userId = params.get('id');
        this.userService.getUserByIdAsObservable(String(this.userId)).subscribe((user) => (this.user = user));
        });

        if(this.userId){
            this.sub!.add(this.authService.userMayEdit(this.userId).subscribe((mayEdit: boolean) => {
                this.userMayEdit = mayEdit;
            }));
        }

        this.sub.add(this.authService.currentUser$.subscribe((editor?: IUserIdentity) => {
            this.editor = editor;
        }))
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    deleteUser(id: string): void{
        this.sub?.add(this.userService.deleteUser(id).subscribe((result) => {
            console.log(result);
            this.sub!.add(this.userService.deleteNeo4jUser(result._id).subscribe(() => {
                this.router.navigate(["../../users-admin"], { relativeTo: this.route });
            }))
        }));
    }
}
