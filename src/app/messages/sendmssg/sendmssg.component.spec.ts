import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendmssgComponent } from './sendmssg.component';

describe('SendmssgComponent', () => {
  let component: SendmssgComponent;
  let fixture: ComponentFixture<SendmssgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendmssgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendmssgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
