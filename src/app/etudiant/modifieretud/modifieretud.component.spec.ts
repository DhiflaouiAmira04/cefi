import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifieretudComponent } from './modifieretud.component';

describe('ModifieretudComponent', () => {
  let component: ModifieretudComponent;
  let fixture: ComponentFixture<ModifieretudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifieretudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifieretudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
