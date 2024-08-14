import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCunaComponent } from './menu-cuna.component';

describe('MenuCunaComponent', () => {
  let component: MenuCunaComponent;
  let fixture: ComponentFixture<MenuCunaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCunaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
