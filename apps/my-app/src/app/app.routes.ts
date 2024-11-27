import { NgModule } from "@angular/core";
import { RouterModule, Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserDetailsComponent } from 'libs/frontend/features/src/lib/users/user-details/user-details.component';
import { AboutComponent } from './components/about/about.component';
import { UserListComponent } from 'libs/frontend/features/src/lib/users/user-list/user-list.component';
import { ArtistListAdminComponent } from "libs/frontend/features/src/lib/artists/artist-list-admin/artist-list-admin.component";
import { UserEditComponent } from "libs/frontend/features/src/lib/users/user-edit/user-edit.component";

export const appRoutes: Route[] = [
    { path: "", pathMatch: "full", redirectTo: "dashboard" },
    { path: "dashboard", component: DashboardComponent },
    { path: "about", component: AboutComponent },
    { path: "artists", pathMatch: "full", component: ArtistListAdminComponent },
    { path: "users", pathMatch: "full", component: UserListComponent },
    { path: "users/new", pathMatch: "full", component: UserEditComponent },
    { path: "users/:id", pathMatch: "full", component: UserDetailsComponent },
    { path: "users/edit/:id", pathMatch: "full", component: UserEditComponent },
    // Catch-all route: als er geen URL match is gaan we naar component-a (of dashboard, of naar 404)

];