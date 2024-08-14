import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCunasUserComponent } from './create-cunas-user.component';

describe('CreateCunasUserComponent', () => {
  let component: CreateCunasUserComponent;
  let fixture: ComponentFixture<CreateCunasUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCunasUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCunasUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
