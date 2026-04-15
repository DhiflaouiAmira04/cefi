import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploisEtudComponent } from './emplois-etud.component';

describe('EmploisEtudComponent', () => {
  let component: EmploisEtudComponent;
  let fixture: ComponentFixture<EmploisEtudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmploisEtudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploisEtudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
