import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEtudiantsComponent } from './admin-etudiants.component';

describe('AdminEtudiantsComponent', () => {
  let component: AdminEtudiantsComponent;
  let fixture: ComponentFixture<AdminEtudiantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEtudiantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEtudiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
