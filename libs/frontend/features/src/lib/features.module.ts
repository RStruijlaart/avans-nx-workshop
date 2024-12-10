import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { RouterModule} from '@angular/router';
import { UserService } from './users/user.service';
import { provideHttpClient } from '@angular/common/http';
import { ArtistListAdminComponent } from './artists/artist-list-admin/artist-list-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { ArtistEditComponent } from './artists/artist-edit/artist-edit.component';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AlertModule } from '@avans-nx-workshop/shared/alert';
import { LoggedInAsAdminAuthGuard, LoggedInAuthGuard, UserEditOwnDataAuthGuard } from './auth/auth.guards';
import { ConcertListAdminComponent } from './concert/concert-list-admin/concert-list-admin.component';
import { ConcertEditComponent } from './concert/concert-edit/concert-edit.component';
import { ConcertDetailsAdminComponent } from './concert/concert-details-admin/concert-details-admin.component';
import { ArtistListComponent } from './artists/artist-list/artist-list.component';
import { ArtistDetailsAdminComponent } from './artists/artist-details-admin/artist-details-admin.component';
import { ArtistDetailsComponent } from './artists/artist-details/artist-details.component';
import { ConcertDetailsComponent } from './concert/concert-details/concert-details.component';
import { TicketListComponent } from './users/ticket-list/ticket-list.component';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, AlertModule],
    declarations: [
        UserDetailsComponent, 
        UserListComponent,
        ArtistListAdminComponent,
        UserEditComponent, 
        ArtistEditComponent, 
        LoginComponent, 
        RegisterComponent, 
        ConcertListAdminComponent, 
        ConcertEditComponent,
        ConcertDetailsAdminComponent,
        ArtistListComponent,
        ArtistDetailsAdminComponent,
        ArtistDetailsComponent,
        ConcertDetailsComponent,
        TicketListComponent
    ],
    providers: [UserService, provideHttpClient(), AuthService, LoggedInAuthGuard, LoggedInAsAdminAuthGuard, UserEditOwnDataAuthGuard],
})
export class FeaturesModule {}
