import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeeventsComponent } from './homeevents.component';

describe('HomeeventsComponent', () => {
  let component: HomeeventsComponent;
  let fixture: ComponentFixture<HomeeventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeeventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
