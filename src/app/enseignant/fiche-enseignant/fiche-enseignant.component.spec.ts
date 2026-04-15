import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheEnseignantComponent } from './fiche-enseignant.component';

describe('FicheEnseignantComponent', () => {
  let component: FicheEnseignantComponent;
  let fixture: ComponentFixture<FicheEnseignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FicheEnseignantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FicheEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
