import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistListAdminComponent } from './artist-list-admin.component';

describe('ArtistListAdminComponent', () => {
    let component: ArtistListAdminComponent;
    let fixture: ComponentFixture<ArtistListAdminComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ArtistListAdminComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ArtistListAdminComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
