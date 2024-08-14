import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarTodosComponent } from './mostrar-todos.component';

describe('MostrarTodosComponent', () => {
  let component: MostrarTodosComponent;
  let fixture: ComponentFixture<MostrarTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarTodosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
