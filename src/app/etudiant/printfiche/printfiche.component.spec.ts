import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintficheComponent } from './printfiche.component';

describe('PrintficheComponent', () => {
  let component: PrintficheComponent;
  let fixture: ComponentFixture<PrintficheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintficheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintficheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
