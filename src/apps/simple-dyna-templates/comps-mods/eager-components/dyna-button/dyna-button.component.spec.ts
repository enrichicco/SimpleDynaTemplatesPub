import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynaButtonComponent } from './dyna-button.component';

describe('DynaButtonComponent', () => {
  let component: DynaButtonComponent;
  let fixture: ComponentFixture<DynaButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynaButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
