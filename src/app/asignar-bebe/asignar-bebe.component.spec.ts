import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarBebeComponent } from './asignar-bebe.component';

describe('AsignarBebeComponent', () => {
  let component: AsignarBebeComponent;
  let fixture: ComponentFixture<AsignarBebeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarBebeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarBebeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
