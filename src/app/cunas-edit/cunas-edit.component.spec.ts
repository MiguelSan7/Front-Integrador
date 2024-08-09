import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CunasEditComponent } from './cunas-edit.component';

describe('CunasEditComponent', () => {
  let component: CunasEditComponent;
  let fixture: ComponentFixture<CunasEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CunasEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CunasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
