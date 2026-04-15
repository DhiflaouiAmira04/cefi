import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifpassComponent } from './modifpass.component';

describe('ModifpassComponent', () => {
  let component: ModifpassComponent;
  let fixture: ComponentFixture<ModifpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifpassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
