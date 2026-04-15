import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEnsComponent } from './manage-ens.component';

describe('ManageEnsComponent', () => {
  let component: ManageEnsComponent;
  let fixture: ComponentFixture<ManageEnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageEnsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
