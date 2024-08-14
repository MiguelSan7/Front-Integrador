import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarIndividualComponent } from './mostrar-individual.component';

describe('MostrarIndividualComponent', () => {
  let component: MostrarIndividualComponent;
  let fixture: ComponentFixture<MostrarIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarIndividualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
