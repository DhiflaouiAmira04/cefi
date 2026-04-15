import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintListeComponent } from './print-liste.component';

describe('PrintListeComponent', () => {
  let component: PrintListeComponent;
  let fixture: ComponentFixture<PrintListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintListeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
