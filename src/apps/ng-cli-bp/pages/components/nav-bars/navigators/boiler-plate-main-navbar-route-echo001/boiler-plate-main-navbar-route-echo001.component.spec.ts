import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoilerPlateMainNavbarRouteEcho001Component } from './boiler-plate-main-navbar-route-echo001.component';

describe('BoilerPlateMainNavbarRouteEcho001Component', () => {
  let component: BoilerPlateMainNavbarRouteEcho001Component;
  let fixture: ComponentFixture<BoilerPlateMainNavbarRouteEcho001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoilerPlateMainNavbarRouteEcho001Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoilerPlateMainNavbarRouteEcho001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
