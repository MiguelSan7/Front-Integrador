import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CunasCreateComponent } from './cunas-create.component';

describe('CunasCreateComponent', () => {
  let component: CunasCreateComponent;
  let fixture: ComponentFixture<CunasCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CunasCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CunasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
