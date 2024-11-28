import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUserInfo, UserGender, UserRole } from '@avans-nx-workshop/shared/api';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
    users?: IUserInfo[];
    sub?: Subscription;

    constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.sub = this.userService.getUsersAsObservable().subscribe((users) => (this.users = users))
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    deleteUser(id: string): void{
        console.log("delete");
        this.sub?.add(this.userService.deleteUser(id).subscribe((result) => {
            console.log(result);
            this.router.navigate([this.route], { relativeTo: this.route });
        }));
    }
}
