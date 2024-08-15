import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosBebeComponent } from './datos-bebe.component';

describe('DatosBebeComponent', () => {
  let component: DatosBebeComponent;
  let fixture: ComponentFixture<DatosBebeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosBebeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosBebeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
