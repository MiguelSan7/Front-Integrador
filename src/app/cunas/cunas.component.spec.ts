import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CunasComponent } from './cunas.component';

describe('CunasComponent', () => {
  let component: CunasComponent;
  let fixture: ComponentFixture<CunasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CunasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CunasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
