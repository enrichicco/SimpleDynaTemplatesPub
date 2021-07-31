import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTemplateViaFactoryComponent } from './dynamic-template-via-factory.component';

describe('DynamicTemplateViaFactoryComponent', () => {
  let component: DynamicTemplateViaFactoryComponent;
  let fixture: ComponentFixture<DynamicTemplateViaFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicTemplateViaFactoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTemplateViaFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
