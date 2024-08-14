import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBebeComponent } from './edit-bebe.component';

describe('EditBebeComponent', () => {
  let component: EditBebeComponent;
  let fixture: ComponentFixture<EditBebeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBebeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBebeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
