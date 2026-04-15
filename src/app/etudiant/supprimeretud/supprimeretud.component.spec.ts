import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimeretudComponent } from './supprimeretud.component';

describe('SupprimeretudComponent', () => {
  let component: SupprimeretudComponent;
  let fixture: ComponentFixture<SupprimeretudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupprimeretudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupprimeretudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
