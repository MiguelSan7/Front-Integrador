import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCunasUserComponent } from './edit-cunas-user.component';

describe('EditCunasUserComponent', () => {
  let component: EditCunasUserComponent;
  let fixture: ComponentFixture<EditCunasUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCunasUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCunasUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
