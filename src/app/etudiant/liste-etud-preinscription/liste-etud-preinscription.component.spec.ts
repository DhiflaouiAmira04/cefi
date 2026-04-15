import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEtudPreinscriptionComponent } from './liste-etud-preinscription.component';

describe('ListeEtudPreinscriptionComponent', () => {
  let component: ListeEtudPreinscriptionComponent;
  let fixture: ComponentFixture<ListeEtudPreinscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeEtudPreinscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeEtudPreinscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
