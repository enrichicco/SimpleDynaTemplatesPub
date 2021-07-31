import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoilerPlateMainNavbarComponent } from './boiler-plate-main-navbar.component';

describe('BoilerPlateMainNavbarComponent', () => {
  let component: BoilerPlateMainNavbarComponent;
  let fixture: ComponentFixture<BoilerPlateMainNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoilerPlateMainNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoilerPlateMainNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
