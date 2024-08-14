import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CunasUserComponent } from './cunas-user.component';

describe('CunasUserComponent', () => {
  let component: CunasUserComponent;
  let fixture: ComponentFixture<CunasUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CunasUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CunasUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
