import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoilerPlateMainNavbarButton001Component } from './boiler-plate-main-navbar-button001.component';

describe('BoilerPlateMainNavbarButton001Component', () => {
  let component: BoilerPlateMainNavbarButton001Component;
  let fixture: ComponentFixture<BoilerPlateMainNavbarButton001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoilerPlateMainNavbarButton001Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoilerPlateMainNavbarButton001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
