import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEtudiantComponent } from './home-etudiant.component';

describe('HomeEtudiantComponent', () => {
  let component: HomeEtudiantComponent;
  let fixture: ComponentFixture<HomeEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeEtudiantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
