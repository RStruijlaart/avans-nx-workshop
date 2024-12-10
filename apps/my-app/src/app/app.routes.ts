import { NgModule } from "@angular/core";
import { RouterModule, Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserDetailsComponent } from 'libs/frontend/features/src/lib/users/user-details/user-details.component';
import { AboutComponent } from './components/about/about.component';
import { UserListComponent } from 'libs/frontend/features/src/lib/users/user-list/user-list.component';
import { ArtistListAdminComponent } from "libs/frontend/features/src/lib/artists/artist-list-admin/artist-list-admin.component";
import { UserEditComponent } from "libs/frontend/features/src/lib/users/user-edit/user-edit.component";
import { ArtistDetailsAdminComponent } from "libs/frontend/features/src/lib/artists/artist-details-admin/artist-details-admin.component";
import { ArtistEditComponent } from "libs/frontend/features/src/lib/artists/artist-edit/artist-edit.component";
import { LoginComponent } from "libs/frontend/features/src/lib/auth/login/login.component";
import { RegisterComponent } from "libs/frontend/features/src/lib/auth/register/register.component";
import { LoggedInAsAdminAuthGuard, LoggedInAuthGuard, UserEditOwnDataAuthGuard } from "libs/frontend/features/src/lib/auth/auth.guards";
import { AdminPageComponent } from "./components/admin/admin-page/admin-page.component";
import { ConcertListAdminComponent } from "libs/frontend/features/src/lib/concert/concert-list-admin/concert-list-admin.component";
import { ConcertEditComponent } from "libs/frontend/features/src/lib/concert/concert-edit/concert-edit.component";
import { ConcertDetailsAdminComponent } from "libs/frontend/features/src/lib/concert/concert-details-admin/concert-details-admin.component";
import { ArtistListComponent } from "libs/frontend/features/src/lib/artists/artist-list/artist-list.component";
import { ArtistDetailsComponent } from "libs/frontend/features/src/lib/artists/artist-details/artist-details.component";
import { ConcertDetailsComponent } from "libs/frontend/features/src/lib/concert/concert-details/concert-details.component";
import { TicketListComponent } from "libs/frontend/features/src/lib/users/ticket-list/ticket-list.component";


export const appRoutes: Route[] = [
    { path: "", pathMatch: "full", redirectTo: "dashboard" },
    { path: "dashboard", component: DashboardComponent },
    { path: "about", component: AboutComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "admin", component: AdminPageComponent, canActivate: [LoggedInAsAdminAuthGuard]},
    
    { path: "artists", component: ArtistListComponent, canActivate: [LoggedInAuthGuard]},
    { path: "artists/:id", component: ArtistDetailsComponent, canActivate: [LoggedInAuthGuard]},
    { path: "artists-admin", pathMatch: "full", component: ArtistListAdminComponent , canActivate: [LoggedInAsAdminAuthGuard]},
    { path: "artists-admin/new", pathMatch: "full", component: ArtistEditComponent , canActivate: [LoggedInAsAdminAuthGuard]},
    { path: "artists-admin/:id", pathMatch: "full", component: ArtistDetailsAdminComponent , canActivate: [LoggedInAsAdminAuthGuard]},
    { path: "artists-admin/edit/:id", pathMatch: "full", component: ArtistEditComponent , canActivate: [LoggedInAsAdminAuthGuard]},

    { path: "concerts/:id", component: ConcertDetailsComponent, canActivate: [LoggedInAuthGuard]},
    { path: "concerts-admin", pathMatch: "full", component: ConcertListAdminComponent , canActivate: [LoggedInAsAdminAuthGuard]},
    { path: "concerts-admin/new", pathMatch: "full", component: ConcertEditComponent , canActivate: [LoggedInAsAdminAuthGuard]},
    { path: "concerts-admin/:id", pathMatch: "full", component: ConcertDetailsAdminComponent , canActivate: [LoggedInAsAdminAuthGuard]},
    { path: "concerts-admin/edit/:id", pathMatch: "full", component: ConcertEditComponent , canActivate: [LoggedInAsAdminAuthGuard]},
    
    { path: "tickets", component: TicketListComponent, canActivate: [LoggedInAuthGuard]},
    { path: "users-admin", pathMatch: "full", component: UserListComponent, canActivate: [LoggedInAsAdminAuthGuard]},
    { path: "users-admin/new", pathMatch: "full", component: UserEditComponent, canActivate: [LoggedInAsAdminAuthGuard] },
    { path: "users/:id", pathMatch: "full", component: UserDetailsComponent, canActivate: [LoggedInAuthGuard] },
    { path: "users/edit/:id", pathMatch: "full", component: UserEditComponent, canActivate: [LoggedInAuthGuard, UserEditOwnDataAuthGuard] },
    // Catch-all route: als er geen URL match is gaan we naar component-a (of dashboard, of naar 404)

];