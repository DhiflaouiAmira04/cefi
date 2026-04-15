import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheEtudiantComponent } from './fiche-etudiant.component';

describe('FicheEtudiantComponent', () => {
  let component: FicheEtudiantComponent;
  let fixture: ComponentFixture<FicheEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FicheEtudiantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FicheEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
