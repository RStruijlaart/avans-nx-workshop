import { Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserDetailsComponent } from 'libs/frontend/features/src/lib/users/user-details/user-details.component';
import { AboutComponent } from './components/about/about.component';
import { UserListComponent } from 'libs/frontend/features/src/lib/users/user-list/user-list.component';

export const appRoutes: Route[] = [
    { path: "", pathMatch: "full", redirectTo: "dashboard" },
    { path: "dashboard", component: DashboardComponent },
    { path: "about", component: AboutComponent },
    { path: "user-list", pathMatch: "full", component: UserListComponent },
    { path: "user-details", pathMatch: "full", component: UserDetailsComponent },
    // Catch-all route: als er geen URL match is gaan we naar component-a (of dashboard, of naar 404)
    { path: "**", redirectTo: "dashboard" },
];
