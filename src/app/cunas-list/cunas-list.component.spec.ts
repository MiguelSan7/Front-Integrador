import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CunasListComponent } from './cunas-list.component';

describe('CunasListComponent', () => {
  let component: CunasListComponent;
  let fixture: ComponentFixture<CunasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CunasListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CunasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
