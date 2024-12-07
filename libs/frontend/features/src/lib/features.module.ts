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
import { ArtistDetailsComponent } from './artists/artist-details-admin/artist-details-admin.component';
import { ArtistEditComponent } from './artists/artist-edit/artist-edit.component';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
    declarations: [UserDetailsComponent, UserListComponent, ArtistListAdminComponent, UserEditComponent, ArtistDetailsComponent, ArtistEditComponent],
    providers: [UserService, provideHttpClient()]
})
export class FeaturesModule {}
