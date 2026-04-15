import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimereventComponent } from './supprimerevent.component';

describe('SupprimereventComponent', () => {
  let component: SupprimereventComponent;
  let fixture: ComponentFixture<SupprimereventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupprimereventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupprimereventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
