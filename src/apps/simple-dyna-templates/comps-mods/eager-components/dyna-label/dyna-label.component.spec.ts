import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynaLabelComponent } from './dyna-label.component';

describe('DynaLabelComponent', () => {
  let component: DynaLabelComponent;
  let fixture: ComponentFixture<DynaLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynaLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynaLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
