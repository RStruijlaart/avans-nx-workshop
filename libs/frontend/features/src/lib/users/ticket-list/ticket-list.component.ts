import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { IUser, IUserIdentity, IUserInfo } from '@avans-nx-workshop/shared/api';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-ticket-list',
    templateUrl: './ticket-list.component.html',
    styleUrl: './ticket-list.component.css'
})
export class TicketListComponent implements OnInit, OnDestroy{
    constructor(private authService: AuthService, private userService: UserService, private router: Router){};

    subs: Subscription = new Subscription();
    user!: IUser;

    ngOnInit(): void {
        this.subs.add(this.authService.currentUser$.subscribe((currentUser?: IUserIdentity) => {
            if(currentUser){
                this.subs.add(this.userService.getUserByIdAsObservable(currentUser._id).subscribe((user?: IUser) =>{
                    if(user){
                        this.user = user;
                    }
                }));
            }
        }))
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    deleteTicket(concertId: string): void{

        this.subs.add(this.userService.deleteTicket(this.user._id, concertId).subscribe((user?: IUserInfo) => {
            if(user){
                const ticketIndex = this.user.tickets.findIndex(ticket => ticket.concert._id === concertId);

                if (ticketIndex > -1) {
                    this.user.tickets.splice(ticketIndex, 1);
                }
            }
        }))
    }
}
