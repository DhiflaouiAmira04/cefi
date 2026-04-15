import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintEtudiantComponent } from './print-etudiant.component';

describe('PrintEtudiantComponent', () => {
  let component: PrintEtudiantComponent;
  let fixture: ComponentFixture<PrintEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintEtudiantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
