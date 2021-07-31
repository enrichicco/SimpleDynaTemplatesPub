import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JitComponentSelectorComponent } from './jit-component-selector.component';

describe('JitComponentSelectorComponent', () => {
  let component: JitComponentSelectorComponent;
  let fixture: ComponentFixture<JitComponentSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JitComponentSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JitComponentSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
