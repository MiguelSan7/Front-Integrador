import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBebeComponent } from './create-bebe.component';

describe('CreateBebeComponent', () => {
  let component: CreateBebeComponent;
  let fixture: ComponentFixture<CreateBebeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBebeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBebeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
