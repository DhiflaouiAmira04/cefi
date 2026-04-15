import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmodifComponent } from './listmodif.component';

describe('ListmodifComponent', () => {
  let component: ListmodifComponent;
  let fixture: ComponentFixture<ListmodifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListmodifComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListmodifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
