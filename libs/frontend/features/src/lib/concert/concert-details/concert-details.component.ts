import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { IConcert, ICreateTicket, ITicket, IUserIdentity, IUserInfo } from '@avans-nx-workshop/shared/api';
import { ConcertService } from '../concert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../users/user.service';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'avans-nx-workshop-concert-details',
    templateUrl: './concert-details.component.html',
    styleUrl: './concert-details.component.css'
})
export class ConcertDetailsComponent implements OnInit, OnDestroy {
    concertId: string | null = null;
    concert?: IConcert;
    subs: Subscription = new Subscription();
    currentUser?: IUserIdentity;
    hasTicket: boolean = false;
    

    constructor(private concertService: ConcertService, private route: ActivatedRoute, private router: Router, private userSevice: UserService, private authService: AuthService) {}

    ngOnInit(): void {
        this.subs.add(this.route.paramMap.subscribe((params) => {
            this.concertId = params.get('id');
            this.subs.add(this.concertService.getConcertAsObservable(String(this.concertId)).subscribe((concert) => 
                {
                this.concert = concert;
                this.subs.add(this.authService.currentUser$.subscribe((user?: IUserIdentity) => 
                    {
                        this.currentUser = user
                        if(this.currentUser){
                            this.subs.add(this.userSevice.hasBoughtTicket(this.currentUser._id, this.concert!._id).subscribe((hasTicket: boolean) => (this.hasTicket = hasTicket)))
                        }
                    }));
                }));
        }));
        
        
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    buyTicket(): void {

        const newTicket: ICreateTicket = {
            seat: Math.floor(Math.random() * this.concert!.seatCount),
            accesCode: this.generateRandomString(16),
            info: `ticket is not exchangeable, Ticket only grants acces to "${this.concert!.name}" on ${this.concert!.dateTime.toLocaleString('en-GB', { timeZone: 'Europe/Amsterdam' })}`,
            concert: this.concert!._id
        }

        this.subs.add(this.userSevice.addTicket(this.currentUser!._id, newTicket).subscribe(() => (this.hasTicket = true)))
    }

    generateRandomString(length: number, charset: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"): string {
        let result = '';
        const charsetLength = charset.length;
    
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charsetLength);
            result += charset[randomIndex];
        }
    
        return result;
    }
}
